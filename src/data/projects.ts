import { copy } from "./content";

// Each entry carries its own localized content. Add verified projects here;
// the shared detail template generates an English and Spanish page.
export const projects = [
  {
    slug: "sweet-match-bakery",
    name: "Sweet Match Bakery",
    url: "https://sweetmatchbakery.com/",
    image: "/images/sweet-match-bakery.webp",
    technologies: ["Astro", "TypeScript", "React", "Supabase"],
    gallery: [],
    content: {
      en: {
        summary: "An online storefront for an artisan bakery in Cajicá and Chía, with a product catalog, custom cake requests, and order tracking.",
        category: "E-commerce · Artisan bakery",
        caption: "The Sweet Match Bakery online storefront",
        context: "Sweet Match makes cakes, brownies, muffins, and other desserts to order in Cajicá and Chía, Colombia. Its website brings the bakery’s products and ordering options together.",
        challenge: "Present product sizes and options clearly while giving custom cakes their own request flow, where the date, servings, and design need to be agreed with the bakery.",
        solution: "A responsive storefront with a browsable catalog, product options, a cart, and a dedicated custom cake request flow. Customers can order as guests or use an account to consult their order history.",
        outcome: "Customers can explore the bakery’s products, prepare a custom cake request, and follow their orders through one website.",
      },
      es: {
        summary: "Una tienda en línea para una repostería artesanal de Cajicá y Chía, con catálogo de productos, solicitudes de tortas personalizadas y seguimiento de pedidos.",
        category: "Comercio electrónico · Repostería artesanal",
        caption: "La tienda en línea de Sweet Match Bakery",
        context: "Sweet Match prepara tortas, brownies, muffins y otros postres por encargo en Cajicá y Chía, Colombia. Su sitio reúne los productos de la repostería y las opciones para hacer un pedido.",
        challenge: "Presentar con claridad las opciones y presentaciones de cada producto, y dar a las tortas personalizadas un flujo propio para acordar fecha, porciones y diseño con la repostería.",
        solution: "Una tienda adaptable a móviles con catálogo, opciones de producto, carrito y un flujo para solicitar tortas personalizadas. Los clientes pueden comprar como invitados o usar una cuenta para consultar su historial de pedidos.",
        outcome: "Los clientes pueden explorar los productos, preparar una solicitud de torta personalizada y consultar sus pedidos desde un mismo sitio.",
      },
    },
  },
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
