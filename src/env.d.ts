/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_GA_MEASUREMENT_ID?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_CF_BEACON_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
