import { useState } from "react";
import { Share2 } from "lucide-react";
import type { NewsEdition } from "../../data/news-editions";
import type { Language } from "../../lib/i18n/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { copyShareText, newsSharePack } from "./news-share";

const ACTION =
  "inline-flex min-h-11 items-center justify-between rounded-full border border-border px-4 py-2 text-left text-sm font-semibold text-foreground";

export function NewsShare({ edition, language }: { edition: NewsEdition; language: Language }) {
  const es = language === "es";
  const pack = newsSharePack(edition, language);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [draft, setDraft] = useState("");
  const canSystemShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  function show(text: string, copied: boolean, fallback: string) {
    setDraft(text);
    setStatus(copied ? fallback : es ? "No se pudo copiar. El texto está en el cuadro." : "Could not copy. The text is in the box.");
  }

  async function onLinkedIn() {
    window.open(pack.linkedinHref, "_blank", "noopener,noreferrer");
    show(pack.linkedinText, await copyShareText(pack.linkedinText), es ? "Post copiado. Pégalo en LinkedIn." : "Post copied. Paste it on LinkedIn.");
  }

  async function onInstagram() {
    const copied = await copyShareText(pack.instagramText);
    if (canSystemShare) {
      try {
        await navigator.share({ title: edition.title[language], text: pack.instagramText });
        setDraft(pack.instagramText);
        setStatus(es ? "Pie de foto listo para Instagram." : "Caption ready for Instagram.");
        return;
      } catch {
        /* El usuario cerró la hoja o el navegador no la abrió. El texto sigue copiado. */
      }
    }
    show(pack.instagramText, copied, es ? "Pie de foto copiado." : "Caption copied.");
  }

  function openNetwork(href: string, text: string, ok: string) {
    const popup = window.open(href, "_blank", "noopener,noreferrer");
    setDraft(text);
    setStatus(popup ? ok : es ? "El navegador bloqueó la ventana. El texto está abajo." : "The browser blocked the window. The text is below.");
  }

  async function onCopyLink() {
    const copied = await copyShareText(pack.articleUrl);
    show(pack.articleUrl, copied, es ? "Enlace de la nota copiado." : "Article link copied.");
  }

  async function onSystemShare() {
    try {
      await navigator.share({ title: edition.title[language], text: edition.dek[language], url: pack.articleUrl });
      setStatus(es ? "Listo para enviar." : "Ready to send.");
      setDraft("");
    } catch {
      setStatus(es ? "Compartir quedó cancelado." : "Share was cancelled.");
    }
  }

  return (
    <>
      <button
        type="button"
        className="inline-flex min-h-11 items-center gap-2 font-medium text-foreground"
        aria-haspopup="dialog"
        onClick={() => {
          setStatus("");
          setDraft("");
          setOpen(true);
        }}
      >
        <Share2 className="size-4" aria-hidden="true" />
        {es ? "Compartir" : "Share"}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{es ? "Compartir" : "Share"}</DialogTitle>
            <DialogDescription>
              {es
                ? "LinkedIn recibe el post y la ficha de servicios. Instagram recibe el pie de foto. WhatsApp y X llevan el enlace de esta nota."
                : "LinkedIn gets the post and the services page. Instagram gets the caption. WhatsApp and X carry this article link."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <button type="button" className={ACTION} onClick={() => void onLinkedIn()}>
              LinkedIn
            </button>
            <button type="button" className={ACTION} onClick={() => void onInstagram()}>
              Instagram
            </button>
            <button
              type="button"
              className={ACTION}
              onClick={() =>
                openNetwork(
                  pack.whatsappHref,
                  `${edition.title[language]}\n${pack.articleUrl}`,
                  es ? "WhatsApp abierto." : "WhatsApp opened.",
                )
              }
            >
              WhatsApp
            </button>
            <button
              type="button"
              className={ACTION}
              onClick={() => openNetwork(pack.xHref, pack.articleUrl, es ? "X abierto." : "X opened.")}
            >
              X
            </button>
            <button type="button" className={ACTION} onClick={() => void onCopyLink()}>
              {es ? "Copiar enlace" : "Copy link"}
            </button>
            {canSystemShare ? (
              <button type="button" className={ACTION} onClick={() => void onSystemShare()}>
                {es ? "Otras apps" : "Other apps"}
              </button>
            ) : null}
          </div>
          <p className="m-0 min-h-5 text-sm text-muted-foreground" aria-live="polite">
            {status}
          </p>
          {draft ? (
            <textarea
              readOnly
              rows={6}
              className="w-full resize-y rounded-lg border border-border bg-muted p-3 text-sm text-foreground"
              value={draft}
              aria-label={es ? "Texto para compartir" : "Text to share"}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
