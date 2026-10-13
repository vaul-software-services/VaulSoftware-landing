/** Enhance native selects while retaining their values, validation and form submission. */
export function enhanceDropdowns() {
  let closeCurrent: (() => void) | undefined;
  document
    .querySelectorAll<HTMLSelectElement>("select:not([multiple])")
    .forEach((select) => {
      if (select.dataset.enhanced) return;
      select.dataset.enhanced = "true";
      const wrapper = document.createElement("div");
      wrapper.className = "dropdown";
      select.before(wrapper);
      wrapper.append(select);
      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "dropdown-trigger";
      trigger.id = `${select.id}-trigger`;
      trigger.setAttribute("role", "combobox");
      trigger.setAttribute("aria-haspopup", "listbox");
      trigger.setAttribute("aria-expanded", "false");
      trigger.setAttribute("aria-controls", `${select.id}-options`);
      const label = document.querySelector<HTMLLabelElement>(
        `label[for="${select.id}"]`,
      );
      if (label) {
        label.id ||= `${select.id}-label`;
        trigger.setAttribute(
          "aria-labelledby",
          `${label.id} ${select.id}-value`,
        );
        label.htmlFor = trigger.id;
      }
      if (select.hasAttribute("required"))
        trigger.setAttribute("aria-required", "true");
      const description = select.getAttribute("aria-describedby");
      if (description) trigger.setAttribute("aria-describedby", description);
      const value = document.createElement("span");
      value.id = `${select.id}-value`;
      trigger.append(value);
      const arrow = document.createElement("span");
      arrow.className = "dropdown-chevron";
      arrow.setAttribute("aria-hidden", "true");
      trigger.append(arrow);
      const list = document.createElement("div");
      list.id = `${select.id}-options`;
      list.className = "dropdown-options";
      list.setAttribute("role", "listbox");
      if (label) list.setAttribute("aria-labelledby", label.id);
      list.hidden = true;
      wrapper.append(trigger, list);
      select.classList.add("dropdown-native");
      select.tabIndex = -1;
      select.setAttribute("aria-hidden", "true");
      const options = Array.from(select.options).map((option, index) => {
        const item = document.createElement("div");
        item.id = `${select.id}-option-${index}`;
        item.className = "dropdown-option";
        item.setAttribute("role", "option");
        item.textContent = option.textContent?.trim() ?? "";
        item.setAttribute("aria-disabled", String(option.disabled));
        list.append(item);
        item.addEventListener("click", () => {
          if (!option.disabled) choose(index);
        });
        return item;
      });
      let active = select.selectedIndex;
      const sync = () => {
        value.textContent =
          select.selectedOptions[0]?.textContent?.trim() ?? "";
        trigger.disabled = select.disabled;
        trigger.setAttribute(
          "aria-invalid",
          select.getAttribute("aria-invalid") ?? "false",
        );
        options.forEach((item, index) =>
          item.setAttribute(
            "aria-selected",
            String(index === select.selectedIndex),
          ),
        );
      };
      const close = () => {
        list.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
        trigger.removeAttribute("aria-activedescendant");
        wrapper.classList.remove("is-open");
      };
      const highlight = (index: number) => {
        active = index;
        options.forEach((item, i) =>
          item.classList.toggle("is-active", i === index),
        );
        if (options[index]) {
          trigger.setAttribute("aria-activedescendant", options[index].id);
          options[index].scrollIntoView({ block: "nearest" });
        }
      };
      const open = () => {
        closeCurrent?.();
        sync();
        list.hidden = false;
        wrapper.classList.add("is-open");
        const rect = trigger.getBoundingClientRect();
        wrapper.classList.toggle(
          "opens-up",
          innerHeight - rect.bottom < Math.min(list.scrollHeight, 280) + 12 &&
            rect.top > innerHeight - rect.bottom,
        );
        trigger.setAttribute("aria-expanded", "true");
        highlight(Math.max(0, select.selectedIndex));
        closeCurrent = close;
      };
      function choose(index: number) {
        if (!select.options[index] || select.options[index].disabled) return;
        select.selectedIndex = index;
        sync();
        select.dispatchEvent(new Event("input", { bubbles: true }));
        select.dispatchEvent(new Event("change", { bubbles: true }));
        close();
        trigger.focus();
      }
      trigger.addEventListener("click", () => (list.hidden ? open() : close()));
      let typed = "";
      let lastTyped = 0;
      trigger.addEventListener("keydown", (event) => {
        if (
          [
            "ArrowDown",
            "ArrowUp",
            "Home",
            "End",
            "Enter",
            " ",
            "Escape",
          ].includes(event.key)
        )
          event.preventDefault();
        if (event.key === "Escape" || event.key === "Tab") {
          close();
          return;
        }
        if (event.key === "Enter" || event.key === " ") {
          list.hidden ? open() : choose(active);
          return;
        }
        if (["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) {
          if (list.hidden) open();
          const direction =
            event.key === "ArrowUp" || event.key === "End" ? -1 : 1;
          let next =
            event.key === "Home"
              ? 0
              : event.key === "End"
                ? options.length - 1
                : Math.max(0, Math.min(options.length - 1, active + direction));
          while (select.options[next]?.disabled) next += direction;
          if (options[next]) highlight(next);
        } else if (
          event.key.length === 1 &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey
        ) {
          typed = Date.now() - lastTyped > 700 ? event.key : typed + event.key;
          lastTyped = Date.now();
          const match = Array.from(select.options).findIndex(
            (option) =>
              !option.disabled &&
              option.textContent
                ?.trim()
                .toLocaleLowerCase()
                .startsWith(typed.toLocaleLowerCase()),
          );
          if (match >= 0) {
            if (list.hidden) open();
            highlight(match);
          }
        }
      });
      select.addEventListener("change", sync);
      select.addEventListener("select:sync", sync);
      select.addEventListener("focus", () => trigger.focus());
      trigger.addEventListener("blur", close);
      // Preserve focus until a pointer selection has been applied.
      list.addEventListener("mousedown", (event) => event.preventDefault());
      document.addEventListener("pointerdown", (event) => {
        if (!wrapper.contains(event.target as Node)) close();
      });
      window.addEventListener("resize", close);
      new MutationObserver(sync).observe(select, {
        attributes: true,
        attributeFilter: ["aria-invalid", "disabled"],
      });
      sync();
      requestAnimationFrame(sync);
    });
}
