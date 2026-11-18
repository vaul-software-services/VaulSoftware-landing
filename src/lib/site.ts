// Existing configured address. Confirm mailbox ownership/delivery before release.
export const contactEmail =
  import.meta.env.PUBLIC_CONTACT_EMAIL || "contact@vaulsoftware.com";

export const socialLinks = {
  linkedin: "https://www.linkedin.com/company/vaul-software/",
  instagram: "https://www.instagram.com/vaulsoftware",
};

// Business number already published through the WhatsApp button. E.164 format.
export const whatsappNumber = "+573134874660";

// Where the business is based, inferred from the published +57 number and the
// default COP pricing. This is the location of the business, not a limit on who
// it serves: work is delivered remotely and billed in COP or USD, so no schema
// node narrows `areaServed` to a single country.
export const addressCountry = "CO";

export const founder = {
  name: "Sebastián Sánchez",
  url: "https://www.sebas3261.com",
};
