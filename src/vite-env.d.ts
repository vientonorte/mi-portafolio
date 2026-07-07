/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_API_URL?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly VITE_GTM_ID?: string;
  readonly VITE_FORM_SUBMIT_INBOX?: string;
  readonly VITE_GOOGLE_FORM_ACTION_URL?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_NAME?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_EMAIL?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_MESSAGE?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_INTENT?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_SOURCE?: string;
  readonly VITE_GOOGLE_FORM_ENTRY_LANGUAGE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
