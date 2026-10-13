import type { Locale } from "../lib/i18n";
export type LocalizedText = Record<Locale, string>;
export interface PricingPlan {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  startingAt: boolean;
  initialCOP: number | null;
  initialUSD: number | null;
  monthlyUSD: number | null;
  monthlyCOP: number | null;
  features: string[];
  exclusions: LocalizedText[];
  cta: LocalizedText;
  recommended: boolean;
  service: "web-development" | "business-automation" | "custom-software";
  note: LocalizedText;
}
export const pricingFeatures: Record<string, LocalizedText> = {
  "sections-five": {
    es: "Una página con hasta 5 secciones",
    en: "One page with up to 5 sections",
  },
  "contact-form": {
    es: "Formulario sencillo si se configura un servicio de envío",
    en: "Simple contact form when a delivery service is configured",
  },
  revisions: {
    es: "Hasta 2 rondas de revisiones",
    en: "Up to 2 revision rounds",
  },
  "professional-scope": {
    es: "Diseño y contenido de mayor alcance, definidos en la propuesta",
    en: "Broader design and content scope, defined in the proposal",
  },
  landing: {
    en: "Custom-designed landing page",
    es: "Página de aterrizaje con diseño a medida",
  },
  responsive: {
    en: "Responsive design",
    es: "Diseño adaptable",
  },
  business: {
    en: "Services and business information",
    es: "Servicios e información del negocio",
  },
  contact: {
    en: "Contact buttons",
    es: "Botones de contacto",
  },
  whatsapp: {
    en: "WhatsApp click-to-chat link",
    es: "Enlace de WhatsApp para iniciar una conversación",
  },
  seo: {
    en: "Basic SEO configuration",
    es: "Configuración básica de SEO",
  },
  performance: {
    en: "Performance optimization",
    es: "Optimización del rendimiento",
  },
  deployment: {
    en: "Deployment",
    es: "Publicación del sitio",
  },
  hosting: {
    en: "Hosting and basic technical support",
    es: "Alojamiento y soporte técnico básico",
  },
  booking: {
    en: "Online booking interface",
    es: "Interfaz de reservas en línea",
  },
  selection: {
    en: "Service selection",
    es: "Selección de servicios",
  },
  slots: {
    en: "Available time slots",
    es: "Horarios disponibles",
  },
  confirmation: {
    en: "Appointment requests or confirmations",
    es: "Solicitudes o confirmaciones de citas",
  },
  management: {
    en: "Basic appointment management",
    es: "Gestión básica de citas",
  },
  admin: {
    en: "Business administration access",
    es: "Acceso de administración del negocio",
  },
  notifications: {
    en: "Booking notifications where supported",
    es: "Notificaciones de reservas cuando sean compatibles",
  },
  workflows: {
    en: "Automated appointment workflows",
    es: "Flujos automatizados de citas",
  },
  status: {
    en: "Booking status notifications",
    es: "Notificaciones del estado de reservas",
  },
  automation: {
    en: "Configurable operational automations",
    es: "Automatizaciones operativas configurables",
  },
  integration: {
    en: "Basic integration with supported business tools",
    es: "Integración básica con herramientas compatibles",
  },
  setup: {
    en: "Automation setup and configuration",
    es: "Instalación y configuración de automatizaciones",
  },
  monitoring: {
    en: "Basic monitoring of configured workflows",
    es: "Supervisión básica de los flujos configurados",
  },
  internal: {
    en: "Internal management platforms",
    es: "Plataformas de gestión interna",
  },
  apps: {
    en: "Custom web applications",
    es: "Aplicaciones web a medida",
  },
  complex: {
    en: "Complex booking systems",
    es: "Sistemas de reservas complejos",
  },
  dashboards: {
    en: "Business dashboards",
    es: "Paneles de control del negocio",
  },
  api: {
    en: "API development",
    es: "Desarrollo de API",
  },
  "third-party": {
    en: "Third-party integrations",
    es: "Integraciones con terceros",
  },
  specialized: {
    en: "Specialized workflows",
    es: "Procesos especializados",
  },
};
export const pricingPlans: PricingPlan[] = [
  {
    id: "landing-essential",
    name: {
      es: "Landing Esencial",
      en: "Essential Landing",
    },
    description: {
      es: "Una página para presentar tu negocio y facilitar el contacto, con un alcance concreto.",
      en: "One page to present your business and make contact easy, with a clearly defined scope.",
    },
    startingAt: true,
    initialCOP: 600000,
    monthlyCOP: 29000,
    initialUSD: 169,
    monthlyUSD: 9,
    features: [
      "sections-five",
      "responsive",
      "business",
      "whatsapp",
      "contact-form",
      "seo",
      "deployment",
      "hosting",
      "revisions",
    ],
    exclusions: [
      {
        es: "Sistema de reservas, backend personalizado o automatizaciones",
        en: "Booking system, custom backend or automations",
      },
      {
        es: "Dominio, rediseños, nuevas funcionalidades o modificaciones ilimitadas",
        en: "Domain, redesigns, new features or unlimited changes",
      },
    ],
    cta: {
      es: "Consultar este plan",
      en: "Discuss This Plan",
    },
    recommended: false,
    service: "web-development",
    note: {
      es: "El precio de entrada cubre hasta 5 secciones y 2 rondas de revisiones. En COP: $300.000 de anticipo y $300.000 antes de publicar. El formulario requiere configurar un servicio de envío.",
      en: "The entry price covers up to 5 sections and 2 revision rounds. In COP: $300,000 upfront and $300,000 before publication. A contact form requires a configured delivery service.",
    },
  },
  {
    id: "landing-professional",
    name: {
      es: "Landing Profesional",
      en: "Professional Landing",
    },
    description: {
      es: "Una landing con mayor profundidad de diseño y contenido para presentar mejor tu propuesta de valor.",
      en: "A landing page with a broader design and content scope to communicate your value.",
    },
    startingAt: false,
    initialCOP: 1190000,
    monthlyCOP: 39000,
    initialUSD: 329,
    monthlyUSD: 11,
    features: [
      "professional-scope",
      "responsive",
      "business",
      "whatsapp",
      "contact-form",
      "seo",
      "deployment",
      "hosting",
      "revisions",
      "performance",
    ],
    exclusions: [
      {
        es: "Sistema de reservas, backend personalizado o automatizaciones",
        en: "Booking system, custom backend or automations",
      },
      {
        es: "Dominio, rediseños, nuevas funcionalidades o modificaciones ilimitadas",
        en: "Domain, redesigns, new features or unlimited changes",
      },
    ],
    cta: {
      es: "Consultar este plan",
      en: "Discuss This Plan",
    },
    recommended: true,
    service: "web-development",
    note: {
      es: "La estructura, el contenido y el nivel de diseño se definen en la propuesta. La mensualidad cubre alojamiento y soporte básico; no incluye rediseños ni nuevas funcionalidades.",
      en: "The structure, content and design scope are defined in the proposal. The monthly fee covers hosting and basic support, excluding redesigns and new features.",
    },
  },
  {
    id: "web-bookings",
    name: {
      es: "Web + Reservas",
      en: "Web + Bookings",
    },
    description: {
      es: "Un sitio web con una experiencia de reservas de citas adaptada a tu negocio.",
      en: "A website with an appointment booking experience tailored to your business.",
    },
    startingAt: true,
    initialCOP: 1990000,
    monthlyCOP: 89000,
    initialUSD: 549,
    monthlyUSD: 25,
    features: [
      "landing",
      "responsive",
      "business",
      "whatsapp",
      "contact-form",
      "seo",
      "deployment",
      "hosting",
      "revisions",
      "booking",
      "selection",
      "slots",
      "confirmation",
      "management",
      "admin",
      "notifications",
    ],
    exclusions: [
      {
        es: "Automatizaciones de WhatsApp, dominio y cargos de servicios externos",
        en: "WhatsApp automations, domain and external service charges",
      },
      {
        es: "Backend fuera del alcance acordado y modificaciones ilimitadas",
        en: "Backend beyond the agreed scope and unlimited changes",
      },
    ],
    cta: {
      es: "Consultar este plan",
      en: "Discuss This Plan",
    },
    recommended: false,
    service: "custom-software",
    note: {
      es: "El desarrollo parte del valor indicado. El alcance de reservas, la capacidad y las herramientas se acuerdan antes de comenzar.",
      en: "Development starts at the displayed price. Booking scope, capacity and tools are agreed before work begins.",
    },
  },
  {
    id: "business-automation",
    name: {
      es: "Automatización",
      en: "Automation",
    },
    description: {
      es: "Flujos e integraciones para reducir tareas manuales en tu operación.",
      en: "Workflows and integrations to reduce manual operational work.",
    },
    startingAt: false,
    initialCOP: null,
    monthlyCOP: null,
    initialUSD: null,
    monthlyUSD: null,
    features: ["automation", "integration", "setup", "monitoring"],
    exclusions: [],
    cta: {
      es: "Solicitar cotización",
      en: "Request a Quote",
    },
    recommended: false,
    service: "business-automation",
    note: {
      es: "El desarrollo y la mensualidad se cotizan según los flujos, las integraciones y el uso. Los costos externos se acuerdan por separado.",
      en: "Development and monthly fees are quoted for the workflows, integrations and usage. External costs are agreed separately.",
    },
  },
  {
    id: "custom-software",
    name: {
      es: "Software a medida",
      en: "Custom Software",
    },
    description: {
      es: "Aplicaciones y plataformas diseñadas según los requisitos de tu negocio.",
      en: "Applications and platforms designed around your business requirements.",
    },
    startingAt: false,
    initialCOP: null,
    monthlyCOP: null,
    initialUSD: null,
    monthlyUSD: null,
    features: [
      "internal",
      "apps",
      "complex",
      "dashboards",
      "api",
      "third-party",
      "specialized",
    ],
    exclusions: [],
    cta: {
      es: "Solicitar cotización",
      en: "Request a Quote",
    },
    recommended: false,
    service: "custom-software",
    note: {
      es: "Desarrollo, alojamiento, mantenimiento y soporte se cotizan según el alcance.",
      en: "Development, hosting, maintenance and support are quoted according to scope.",
    },
  },
];
export const standardPlans = pricingPlans.filter(
  (plan) => plan.initialCOP !== null,
);
export const quotePlans = pricingPlans.filter(
  (plan) => plan.initialCOP === null,
);
export const customPlan = pricingPlans.find(
  (plan) => plan.id === "custom-software",
)!;
export const pricingCopy = {
  en: {
    nav: "Pricing",
    title: "Website & Software Development Pricing | Vaul Software",
    description:
      "Compare website, booking, and automation launch plans in COP and USD. See initial development costs, monthly fees, and what is included.",
    heading: "Simple pricing. Clear solutions.",
    intro:
      "Choose a starting point for your business. Every solution can be adapted to your needs.",
    eyebrow: "Pricing",
    startingAt: "From",
    initial: "One-time development",
    monthly: "Hosting and basic support / plan service",
    perMonth: "/month",
    included: "Included in the agreed scope",
    excluded: "Not included",
    recommended: "Recommended",
    details: "See full pricing details",
    launchNote:
      "Entry prices in COP and USD apply to the stated scope. Additional requirements are quoted separately.",
    scopeNote:
      "Booking and automation solutions are developed or configured for each business. These plans do not imply a ready-to-use system is already operating. Capacity, usage, support, and notification methods are agreed in the proposal.",
    baseIncludes: "Everything in Essential Landing, plus:",
    bookingIncludes: "Everything in Web + Bookings, plus:",
    customQuote: "Custom quote",
    requirements: "Based on requirements",
    customExamples: "Examples of custom solutions",
    customHeading: "When your business needs something different.",
    compare: "Compare the plans.",
    compareIntro:
      "The following is proposed project scope, not a claim that booking or automation services are already live.",
    feature: "Project scope",
    inScope: "Included",
    notIncluded: "Not included",
    paymentTitle: "Clear terms from the start.",
    paymentIntro:
      "The proposal defines the scope, services, and responsibilities before the work begins.",
    paymentConditions: [
      [
        "Initial development",
        "50% upfront to begin. The remaining 50% is due before final publication or delivery.",
      ],
      [
        "Monthly services",
        "Paid in advance from service activation. Hosting and basic technical support do not include redesigns, new features or unlimited changes.",
      ],
      [
        "Additional features and domain",
        "Additional features are quoted separately. Domain registration is not included by default.",
      ],
      [
        "External services",
        "Third-party subscriptions, API charges, messaging, and other external expenses are quoted separately when applicable.",
      ],
    ],
    separationTitle: "Your website and bookings are separate services.",
    separationBody:
      "Website hosting and basic maintenance are separate from booking system access and operation. If you discontinue the booking service, the website can remain online while the applicable website hosting fee continues to be paid. The final service agreement defines the specific conditions and fees.",
    whatsappTitle: "A note on WhatsApp automations.",
    whatsappBody:
      "Click-to-chat is included in Essential Landing. Official WhatsApp automations are not included by default. If needed, they may require Meta Business verification, approved WhatsApp Business Platform access, message templates, customer opt-in, and additional provider or message charges. External costs are included only when explicitly agreed.",
    faqTitle: "Before you choose a plan.",
    faq: [
      [
        "Is the initial payment a one-time fee?",
        "Yes. Development is paid 50% upfront and 50% before publication. For the base Essential Landing in COP: $300,000 + $300,000. Monthly hosting and support starts at activation and is separate.",
      ],
      [
        "What does the monthly payment include?",
        "For landing plans, it covers hosting and basic technical support from activation. It excludes redesigns, new features and unlimited changes. Booking services apply only to the booking plan; automation and custom software monthly fees are quoted according to scope.",
      ],
      [
        "Is the domain included?",
        "No. Domain registration and renewal are separate unless expressly included in your proposal.",
      ],
      [
        "Can I upgrade my plan later?",
        "Yes. We review your new requirements and quote the additional work and any changes to recurring fees before proceeding.",
      ],
      [
        "What happens if I stop paying the monthly fee?",
        "The service agreement will define the impact on the corresponding service, notice, and next steps. We do not assume an undefined cancellation penalty or contract duration. Website hosting and booking access are handled separately.",
      ],
      [
        "Can I keep my website without the booking system?",
        "Yes, provided the applicable website hosting fee continues to be paid. The agreement defines the website-only fee and the conditions for discontinuing booking services.",
      ],
      [
        "Are WhatsApp automations included?",
        "A click-to-chat link is included, but automatic WhatsApp messages and official Business Platform integration are not included by default. Provider, message, and API charges are quoted separately when applicable.",
      ],
      [
        "How long does development take?",
        "The timeline depends on scope, content, integrations, and approvals. We agree on a schedule after reviewing the requirements; no fixed delivery time is promised here.",
      ],
      [
        "Can I request additional features?",
        "Yes. Additional features are reviewed and quoted separately before development begins.",
      ],
      [
        "Do you offer custom software development?",
        "Yes. Custom applications, management platforms, dashboards, APIs, and specialized workflows are scoped and quoted for your requirements.",
      ],
    ],
    planLabel: "Preferred plan",
    noPlan: "No plan selected",
    contactLink: "Discuss the scope",
    allPrices:
      "Prices are shown in the selected currency. Initial development and monthly service are charged separately.",
  },
  es: {
    nav: "Precios",
    title: "Precios de Desarrollo Web y Software | Vaul Software",
    description:
      "Compara planes de lanzamiento de sitios web, reservas y automatización en COP y USD. Consulta el desarrollo inicial, las mensualidades y lo incluido.",
    heading: "Precios claros. Soluciones a tu medida.",
    intro:
      "Elige el punto de partida para tu negocio. Cada solución puede adaptarse a tus necesidades.",
    eyebrow: "Precios",
    startingAt: "Desde",
    initial: "Desarrollo inicial",
    monthly: "Alojamiento y soporte básico / servicio del plan",
    perMonth: "/mes",
    included: "Incluido en el alcance acordado",
    excluded: "No incluido",
    recommended: "Recomendado",
    details: "Ver todos los detalles de precios",
    launchNote:
      "Los precios de entrada en COP y USD aplican al alcance indicado. Los requisitos adicionales se cotizan por separado.",
    scopeNote:
      "Las soluciones de reservas y automatización se desarrollan o configuran para cada negocio. Estos planes no implican que ya exista un sistema listo para usar y en operación. La capacidad, el uso, el soporte y las notificaciones se acuerdan en la propuesta.",
    baseIncludes: "Todo lo de Landing Esencial, más:",
    bookingIncludes: "Todo lo de Web + Reservas, más:",
    customQuote: "Cotización personalizada",
    requirements: "Según los requisitos",
    customExamples: "Ejemplos de soluciones a medida",
    customHeading: "Cuando tu negocio necesita algo diferente.",
    compare: "Compara los planes.",
    compareIntro:
      "Este es el alcance propuesto para cada proyecto; no afirma que los servicios de reservas o automatización ya estén en operación.",
    feature: "Alcance del proyecto",
    inScope: "Incluido",
    notIncluded: "No incluido",
    paymentTitle: "Condiciones claras desde el inicio.",
    paymentIntro:
      "La propuesta define el alcance, los servicios y las responsabilidades antes de comenzar el trabajo.",
    paymentConditions: [
      [
        "Desarrollo inicial",
        "50% de anticipo para comenzar. El 50% restante se paga antes de la publicación final o la entrega.",
      ],
      [
        "Servicios mensuales",
        "Se pagan por adelantado desde la activación del servicio. El alojamiento y soporte técnico básico no incluyen rediseños, nuevas funcionalidades ni modificaciones ilimitadas.",
      ],
      [
        "Funciones adicionales y dominio",
        "Las funciones adicionales se cotizan por separado. El registro del dominio no está incluido por defecto.",
      ],
      [
        "Servicios externos",
        "Las suscripciones de terceros, los costos de API, la mensajería y otros gastos externos se cotizan por separado cuando corresponda.",
      ],
    ],
    separationTitle: "Tu sitio web y las reservas son servicios separados.",
    separationBody:
      "El alojamiento y el mantenimiento básico del sitio son independientes del acceso y la operación del sistema de reservas. Si dejas el servicio de reservas, el sitio puede seguir en línea mientras se pague la tarifa de alojamiento correspondiente. El acuerdo final define las condiciones y tarifas específicas.",
    whatsappTitle: "Sobre las automatizaciones de WhatsApp.",
    whatsappBody:
      "Landing Esencial incluye un enlace para iniciar conversaciones. Las automatizaciones oficiales de WhatsApp no se incluyen por defecto. Si se requieren, pueden necesitar verificación de Meta Business, acceso aprobado a WhatsApp Business Platform, plantillas de mensajes, consentimiento del cliente y cargos adicionales del proveedor o por mensaje. Los costos externos solo se incluyen si se acuerda explícitamente.",
    faqTitle: "Antes de elegir un plan.",
    faq: [
      [
        "¿El pago inicial se realiza una sola vez?",
        "Sí. El desarrollo se paga 50% de anticipo y 50% antes de publicar. Para Landing Esencial en su alcance base en COP: $300.000 + $300.000. El alojamiento y soporte mensual se cobra desde la activación y es independiente.",
      ],
      [
        "¿Qué incluye el pago mensual?",
        "Incluye el alojamiento, el mantenimiento y el alcance de servicio acordado para tu plan. La operación de reservas y la supervisión de automatizaciones se aplican donde estén incluidas. El soporte y los cambios de contenido tienen límites definidos; no son ilimitados.",
      ],
      [
        "¿El dominio está incluido?",
        "No. El registro y la renovación del dominio son independientes, salvo que se incluyan expresamente en tu propuesta.",
      ],
      [
        "¿Puedo mejorar mi plan más adelante?",
        "Sí. Revisamos tus nuevos requisitos y cotizamos el trabajo adicional y los cambios en las tarifas mensuales antes de avanzar.",
      ],
      [
        "¿Qué pasa si dejo de pagar la mensualidad?",
        "El acuerdo de servicio definirá el impacto sobre el servicio correspondiente, los avisos y los siguientes pasos. No asumimos penalidades de cancelación ni duraciones de contrato que no se hayan definido. El alojamiento y el acceso a reservas se manejan por separado.",
      ],
      [
        "¿Puedo conservar el sitio sin el sistema de reservas?",
        "Sí, siempre que continúes pagando la tarifa de alojamiento del sitio correspondiente. El acuerdo define la tarifa del sitio sin reservas y las condiciones para descontinuar ese servicio.",
      ],
      [
        "¿Las automatizaciones de WhatsApp están incluidas?",
        "Se incluye un enlace para iniciar conversaciones, pero los mensajes automáticos y la integración oficial con Business Platform no se incluyen por defecto. Los cargos de proveedores, mensajes y API se cotizan por separado cuando corresponda.",
      ],
      [
        "¿Cuánto tarda el desarrollo?",
        "Depende del alcance, el contenido, las integraciones y las aprobaciones. Acordamos un cronograma después de revisar los requisitos; aquí no se promete un plazo fijo.",
      ],
      [
        "¿Puedo solicitar funciones adicionales?",
        "Sí. Las funciones adicionales se revisan y cotizan por separado antes de iniciar el desarrollo.",
      ],
      [
        "¿Ofrecen desarrollo de software a medida?",
        "Sí. Las aplicaciones, las plataformas de gestión, los paneles, las API y los procesos especializados se definen y cotizan según tus requisitos.",
      ],
    ],
    planLabel: "Plan de interés",
    noPlan: "Sin plan seleccionado",
    contactLink: "Consultar el alcance",
    allPrices:
      "Los precios se muestran en la moneda seleccionada. El desarrollo inicial y el servicio mensual se cobran por separado.",
  },
} as const;
export type PricingCurrency = "COP" | "USD";
export function formatPrice(
  value: number,
  currency: PricingCurrency,
  lang: Locale,
): string {
  return new Intl.NumberFormat(lang === "es" ? "es-CO" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    currencyDisplay: "narrowSymbol",
  }).format(value);
}
export function planContactPath(lang: Locale, plan: PricingPlan): string {
  return `/${lang}/contact/?plan=${encodeURIComponent(plan.id)}`;
}
export function additionalFeatures(plan: PricingPlan): string[] {
  return plan.features;
}
