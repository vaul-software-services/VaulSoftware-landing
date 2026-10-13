import { copy } from "./content";

// Each entry carries its own localized content. Add verified projects here;
// the shared detail template generates an English and Spanish page.
export const projects = [
  {
    slug: "playzone-vip",
    name: "PlayZone VIP",
    url: "https://www.playzonevip.com/",
    image: "/images/playzone-vip.webp",
    technologies: ["Astro", "TypeScript"],
    gallery: [
      {
        src: "/images/playzone-activities.webp",
        url: "playzonevip.com/actividades",
        alt: {
          en: "PlayZone VIP: sports activity pages",
          es: "PlayZone VIP: páginas de actividades deportivas",
        },
      },
    ],
    content: {
      en: {
        summary: copy.en.workSummary,
        category: copy.en.workCategory,
        caption: copy.en.workCaption,
        context: copy.en.projectContext,
        challenge: copy.en.projectChallenge,
        solution: copy.en.projectSolution,
        outcome: copy.en.projectOutcome,
      },
      es: {
        summary: copy.es.workSummary,
        category: copy.es.workCategory,
        caption: copy.es.workCaption,
        context: copy.es.projectContext,
        challenge: copy.es.projectChallenge,
        solution: copy.es.projectSolution,
        outcome: copy.es.projectOutcome,
      },
    },
  },
];

export const products = [
  {
    slug: "courtrank",
    name: "CourtRank",
    url: "https://getcourtrank.com/",
    image: "/images/courtrank-site.webp",
    content: {
      en: {
        description: copy.en.productDesc,
        problem: copy.en.productProblem,
        body: copy.en.productBody,
        features: copy.en.productFeatures,
        caption: copy.en.productCaption,
      },
      es: {
        description: copy.es.productDesc,
        problem: copy.es.productProblem,
        body: copy.es.productBody,
        features: copy.es.productFeatures,
        caption: copy.es.productCaption,
      },
    },
  },
];
