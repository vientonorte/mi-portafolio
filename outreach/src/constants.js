export const FROM = "Viento Norte <contacto@vientonorte.io>";
export const REPLY_TO = "contacto@vientonorte.io";
export const TEMPLATE_ID = "prospeccion-v1";
export const DAILY_CAP = 10;
export const SANTIAGO_TZ = "America/Santiago";
export const RESEND_EMAILS_URL = "https://api.resend.com/emails";
export const WEBHOOK_TOLERANCE_SEC = 300;
// The dedupe mark has to outlive the signature window. A replay that is
// still inside the tolerance must not be accepted because the mark expired.
export const WEBHOOK_DEDUPE_TTL_SEC = Math.max(600, WEBHOOK_TOLERANCE_SEC * 2);

export const ANCHORS = {
  "revision-gratis": {
    kicker: "Revisión de un flujo",
    oferta: "Te ofrezco una revisión gratuita de un flujo.",
    cta: "Pedir revisión gratis",
  },
  "consultoria-ux": {
    kicker: "Consultoría UX",
    oferta: "Te ofrezco una conversación de 30 min con propuesta de alcance y precio.",
    cta: "Conversar mi caso",
  },
  "web-pymes": {
    kicker: "Web para pymes",
    oferta: "Te ofrezco la web en 72 h hábiles, con propuesta de alcance y precio.",
    cta: "Quiero mi web",
  },
};
