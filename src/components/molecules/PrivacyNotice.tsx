import { sitePrivacyHref } from "../../lib/site-nav";
import { cn } from "../../lib/utils";

/** Copy exacto aprobado por PO (13-oct-2026). No editar sin su OK. */
export const PRIVACY_NOTICE_BEFORE =
  "Usamos tus datos solo para responder a tu solicitud. No los compartimos con terceros ni los usamos para publicidad. Puedes pedir acceso, rectificación o eliminación en cualquier momento escribiendo a contacto@vientonorte.io. Más detalles en nuestra ";
export const PRIVACY_NOTICE_LINK = "Política de privacidad";
export const PRIVACY_NOTICE_AFTER = " (Ley 21.719).";

/** Mensaje de éxito exacto (PO 13-oct-2026) para todos los formularios. */
export const CONTACT_SUCCESS_MESSAGE = "Recibimos tu mensaje. Te respondemos en 2 días hábiles.";

/** Aviso de privacidad bajo el botón Enviar de cada formulario. Enlaza a /privacidad/. */
export function PrivacyNotice({ id, className }: { id?: string; className?: string }) {
  return (
    <p id={id} className={cn("text-xs leading-relaxed text-muted-foreground", className)} data-privacy-notice>
      {PRIVACY_NOTICE_BEFORE}
      <a
        href={sitePrivacyHref()}
        className="text-primary underline underline-offset-2 hover:opacity-90"
        data-privacy-link
      >
        {PRIVACY_NOTICE_LINK}
      </a>
      {PRIVACY_NOTICE_AFTER}
    </p>
  );
}
