// Central JSON-LD builders. Every page emits one `@graph` so the shared
// Organization and WebSite nodes are declared once and referenced by `@id`
// instead of being repeated in each block.
//
// Only values that exist in this repository are published here: no invented
// address, rating, review, price, founding date, or employee count.
import type { Locale } from "./i18n";
import { copy } from "../data/content";
import {
  addressCountry,
  contactEmail,
  founder,
  socialLinks,
  whatsappNumber,
} from "./site";

export const SITE_ORIGIN = "https://vaulsoftware.com";

export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;
export const FOUNDER_ID = `${SITE_ORIGIN}/#founder`;
export const LOGO_ID = `${SITE_ORIGIN}/#logo`;

export type JsonLdNode = Record<string, unknown>;

const abs = (path: string) => new URL(path, `${SITE_ORIGIN}/`).toString();

const organizationName = "Vaul Software";

const organizationCopy = {
  en: {
    description: copy.en.heroDesc,
    slogan: copy.en.purposeHeading,
    contact: "Sales and project enquiries",
  },
  es: {
    description: copy.es.heroDesc,
    slogan: copy.es.purposeHeading,
    contact: "Consultas comerciales y de proyectos",
  },
} as const;

export function organizationNode(lang: Locale): JsonLdNode {
  const local = organizationCopy[lang];
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: organizationName,
    alternateName: "Vaul",
    url: abs("/"),
    description: local.description,
    slogan: local.slogan,
    email: contactEmail,
    telephone: whatsappNumber,
    address: {
      "@type": "PostalAddress",
      addressCountry,
    },
    logo: { "@id": LOGO_ID },
    image: { "@id": LOGO_ID },
    founder: { "@id": FOUNDER_ID },
    knowsLanguage: ["en", "es"],
    sameAs: [socialLinks.linkedin, socialLinks.instagram],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        name: local.contact,
        email: contactEmail,
        telephone: whatsappNumber,
        availableLanguage: ["en", "es"],
      },
    ],
  };
}

export function logoNode(): JsonLdNode {
  const url = abs("/images/brand/vaul-software-logo.png");
  return {
    "@type": "ImageObject",
    "@id": LOGO_ID,
    url,
    contentUrl: url,
    width: 512,
    height: 512,
    caption: organizationName,
  };
}

export function founderNode(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: founder.name,
    url: founder.url,
    worksFor: { "@id": ORGANIZATION_ID },
  };
}

export function websiteNode(lang: Locale): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: organizationName,
    url: abs("/"),
    description: organizationCopy[lang].description,
    inLanguage: [lang, lang === "en" ? "es" : "en"],
    publisher: { "@id": ORGANIZATION_ID },
  };
}

interface WebPageOptions {
  lang: Locale;
  canonical: string;
  title: string;
  description: string;
  type?: "WebPage" | "CollectionPage" | "ContactPage" | "AboutPage";
  image?: string;
  hasBreadcrumb?: boolean;
  about?: string;
}

export function webPageNode({
  lang,
  canonical,
  title,
  description,
  type = "WebPage",
  image,
  hasBreadcrumb = false,
  about,
}: WebPageOptions): JsonLdNode {
  const node: JsonLdNode = {
    "@type": type,
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: title,
    description,
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": about ?? ORGANIZATION_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: image ?? abs("/og.png") },
  };
  if (hasBreadcrumb) node.breadcrumb = { "@id": `${canonical}#breadcrumb` };
  return node;
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function breadcrumbNode(
  canonical: string,
  items: BreadcrumbItem[],
): JsonLdNode {
  return {
    "@type": "BreadcrumbList",
    "@id": `${canonical}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

export type FaqPair = readonly [string, string];

export function faqNode(
  canonical: string,
  faqs: readonly FaqPair[],
): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${canonical}#faq`,
    inLanguage: canonical.includes("/es/") ? "es" : "en",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export interface ServiceLike {
  slug: string;
  name: string;
  description: string;
  heading: string;
  examples: readonly string[];
}

export function serviceNode(
  canonical: string,
  lang: Locale,
  service: ServiceLike,
): JsonLdNode {
  return {
    "@type": "Service",
    "@id": `${canonical}#service`,
    name: service.name,
    alternateName: service.heading,
    description: service.description,
    serviceType: service.name,
    inLanguage: lang,
    provider: { "@id": ORGANIZATION_ID },
    url: canonical,
    mainEntityOfPage: { "@id": `${canonical}#webpage` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.name,
      itemListElement: service.examples.map((example) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: example },
      })),
    },
  };
}

export interface ListEntry {
  name: string;
  description?: string;
  path: string;
}

export function itemListNode(
  canonical: string,
  name: string,
  entries: readonly ListEntry[],
): JsonLdNode {
  return {
    "@type": "ItemList",
    "@id": `${canonical}#list`,
    name,
    numberOfItems: entries.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: entries.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      ...(entry.description ? { description: entry.description } : {}),
      url: abs(entry.path),
    })),
  };
}

export interface CaseStudyInput {
  name: string;
  url: string;
  image: string;
  technologies: readonly string[];
  summary: string;
  category: string;
}

export function caseStudyNode(
  canonical: string,
  lang: Locale,
  project: CaseStudyInput,
): JsonLdNode {
  return {
    "@type": "CreativeWork",
    "@id": `${canonical}#project`,
    name: project.name,
    headline: project.name,
    description: project.summary,
    genre: project.category,
    url: canonical,
    inLanguage: lang,
    image: abs(project.image),
    keywords: project.technologies.join(", "),
    creator: { "@id": ORGANIZATION_ID },
    provider: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@id": `${canonical}#webpage` },
    workExample: {
      "@type": "WebSite",
      name: project.name,
      url: project.url,
    },
  };
}

export interface ProductInput {
  name: string;
  url: string;
  image: string;
  description: string;
}

export function softwareApplicationNode(
  canonical: string,
  lang: Locale,
  product: ProductInput,
): JsonLdNode {
  return {
    "@type": "SoftwareApplication",
    "@id": `${canonical}#application`,
    name: product.name,
    description: product.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "iOS, Web",
    url: product.url,
    image: abs(product.image),
    inLanguage: lang,
    publisher: { "@id": ORGANIZATION_ID },
    author: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: { "@id": `${canonical}#webpage` },
  };
}
