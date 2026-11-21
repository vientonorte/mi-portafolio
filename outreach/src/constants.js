export const TEMPLATE_ID = "prospeccion-v1";
export const DAILY_CAP = 10;
// Live mode reads env.DAILY_CAP. Anything above this needs a PR that changes
// this constant. The durable object refuses a larger cap.
export const DAILY_CAP_MAX = 10;
export const SANTIAGO_TZ = "America/Santiago";
export const GMAIL_TOKEN_URL = "https://oauth2.googleapis.com/token";
export const GMAIL_SEND_URL = "https://gmail.googleapis.com/gmail/v1/users/me/messages/send";
export const GMAIL_SEND_SCOPE = "https://www.googleapis.com/auth/gmail.send";

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
