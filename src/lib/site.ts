// Existing configured address. Confirm mailbox ownership/delivery before release.
export const contactEmail =
  import.meta.env.PUBLIC_CONTACT_EMAIL || "contact@vaulsoftware.com";

export const socialLinks = {
  linkedin: "https://www.linkedin.com/company/vaul-software/",
  instagram: "https://www.instagram.com/vaulsoftware",
};

// Business number already published through the WhatsApp button. E.164 format.
export const whatsappNumber = "+573134874660";

// Country inferred from the published +57 number and the default COP pricing.
export const addressCountry = "CO";

export const founder = {
  name: "Sebastián Sánchez",
  url: "https://www.sebas3261.com",
};
