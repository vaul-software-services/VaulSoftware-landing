/** A pre-paint CSS state prevents visible content from flashing before reveal. */
export function initializeMotion() {
  if (!("IntersectionObserver" in window)) return;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const root = document.documentElement;
  const running = new Set<Animation>();
  const targets = document.querySelectorAll<HTMLElement>(
    [
      "main h1",
      "main h2",
      "main h3",
      "main .intro",
      "main .eyebrow",
      "main .hero-actions",
      "main .text-link",
      "main .btn",
      ".hero-foot",
      ".hero-showcase",
      ".section-head",
      ".service-grid",
      ".pricing-grid",
      ".steps",
      ".stock-photo",
      ".media",
      ".product-screens",
      ".founder-intro",
      ".payment-grid",
      ".work-layout > div",
      ".product-layout > div:first-child",
      ".purpose-grid > div:first-child",
      ".two-col > div",
      ".cta .wrap",
    ].join(","),
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target as HTMLElement;
        observer.unobserve(element);
        element.dataset.motionRevealed = "true";
        if (reduced.matches) return;
        const media = element.matches(
          ".stock-photo, .media, .hero-showcase, .product-screens",
        );
        const animation = element.animate(
          media
            ? [{ opacity: 0 }, { opacity: 1 }]
            : [
                { opacity: 0, filter: "blur(3px)" },
                { opacity: 1, filter: "blur(0px)" },
              ],
          {
            duration: media ? 1100 : 1000,
            easing: "cubic-bezier(.25,.1,.25,1)",
            fill: "backwards",
          },
        );
        running.add(animation);
        animation.finished
          .then(() => running.delete(animation))
          .catch(() => running.delete(animation));
      });
    },
    { threshold: 0.08, rootMargin: "0px" },
  );
  const targetSet = new Set<Element>(targets);
  targets.forEach((element) => {
    // Reveal the outer group once; nested text must not receive stacked effects.
    let parent = element.parentElement;
    while (parent) {
      if (targetSet.has(parent)) return;
      parent = parent.parentElement;
    }
    element.dataset.motion = element.matches(
      ".stock-photo, .media, .hero-showcase, .product-screens",
    )
      ? "media"
      : "content";
    observer.observe(element);
  });
  root.classList.add("motion-initialized");
  clearTimeout(Number(root.dataset.motionTimeout));
  delete root.dataset.motionTimeout;
  // Keyboard navigation must never focus invisible content.
  document.addEventListener("focusin", (event) => {
    const element = (event.target as Element).closest<HTMLElement>(
      "[data-motion]",
    );
    if (element) element.dataset.motionRevealed = "true";
  });
  const showcase = document.querySelector(".hero-showcase");
  if (showcase) {
    new IntersectionObserver((entries) =>
      entries.forEach((entry) =>
        showcase.classList.toggle("motion-visible", entry.isIntersecting),
      ),
    ).observe(showcase);
  }
  reduced.addEventListener("change", () => {
    if (reduced.matches) {
      root.classList.remove("motion-enabled");
      running.forEach((animation) => animation.cancel());
    }
  });
}
