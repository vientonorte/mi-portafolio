import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { cn } from "../lib/utils";
import {
  buildServiciosPayload,
  validateServiciosContact,
  type ServiciosContactValues,
  type ServiciosFieldErrors,
} from "./servicios-contact";
import {
  CONTACT_EMAIL,
  CONTACT_ENDPOINT,
  PRIMARY_CTA_CLASS,
  SERVICIOS_INTENT_PLACEHOLDER,
  SERVICIOS_INTENTS,
  SERVICIOS_SOURCE,
  type ServiciosIntentValue,
} from "./servicios-content";

type Status = { kind: "idle" | "sending" | "ok" | "error"; text: string };

interface Props {
  intent: ServiciosIntentValue;
  onIntentChange: (intent: ServiciosIntentValue) => void;
  /** Mensaje para el lector de pantalla cuando una tarjeta preselecciona la opción. */
  announcement?: string;
}

const FIELD_ORDER = ["nombre", "correo", "intent", "detalle", "consent"] as const;

export function ServiciosContactForm({ intent, onIntentChange, announcement }: Props) {
  const uid = useId();
  const ids = {
    nombre: `${uid}-nombre`,
    correo: `${uid}-correo`,
    empresa: `${uid}-empresa`,
    intent: `${uid}-intent`,
    detalle: `${uid}-detalle`,
    consent: `${uid}-consent`,
    gotcha: `${uid}-gotcha`,
  };
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<ServiciosFieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle", text: "" });

  const readValues = (form: HTMLFormElement): ServiciosContactValues => {
    const fd = new FormData(form);
    return {
      nombre: String(fd.get("nombre") ?? ""),
      correo: String(fd.get("correo") ?? ""),
      empresa: String(fd.get("empresa") ?? ""),
      intent,
      detalle: String(fd.get("detalle") ?? ""),
      consent: fd.get("consent") === "on",
      gotcha: String(fd.get("_gotcha") ?? ""),
    };
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status.kind === "sending") return;
    const form = e.currentTarget;
    const values = readValues(form);
    const nextErrors = validateServiciosContact(values);
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((k) => nextErrors[k]);
    if (firstInvalid) {
      setStatus({ kind: "error", text: "Revisa los campos marcados antes de enviar." });
      document.getElementById(ids[firstInvalid])?.focus();
      return;
    }
    setStatus({ kind: "sending", text: "Enviando tu mensaje…" });
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildServiciosPayload(values)),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (!res.ok || data.ok === false) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      form.reset();
      onIntentChange("");
      setStatus({
        kind: "ok",
        text: "¡Listo! Recibimos tu mensaje. Te respondemos en menos de 24 horas hábiles.",
      });
    } catch {
      setStatus({
        kind: "error",
        text: `No pudimos enviar el mensaje. Intenta de nuevo o escríbenos a ${CONTACT_EMAIL}.`,
      });
    }
  };

  const errorId = (k: keyof ServiciosFieldErrors) => `${ids[k]}-error`;
  const fieldProps = (k: "nombre" | "correo" | "detalle") => ({
    id: ids[k],
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? errorId(k) : undefined,
  });
  /** El error del select se oculta en cuanto hay opción (elegida a mano o por tarjeta). */
  const intentError = intent ? undefined : errors.intent;
  const labelClass = "block text-sm font-medium text-foreground";
  const errorClass = "mt-1 text-sm font-medium text-destructive";
  const controlClass = "mt-1.5 h-11 border-foreground/50 bg-background";

  return (
    <form
      ref={formRef}
      method="post"
      noValidate
      onSubmit={handleSubmit}
      aria-describedby={`${uid}-required-note`}
      data-source={SERVICIOS_SOURCE}
      data-endpoint={CONTACT_ENDPOINT}
      className="space-y-5"
    >
      <input type="hidden" name="source" value={SERVICIOS_SOURCE} />
      <p id={`${uid}-required-note`} className="text-sm text-muted-foreground">
        Los campos con * son obligatorios.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.nombre} className={labelClass}>
            Nombre *
          </label>
          <Input {...fieldProps("nombre")} autoComplete="name" required className={controlClass} />
          {errors.nombre && (
            <p id={errorId("nombre")} className={errorClass}>
              {errors.nombre}
            </p>
          )}
        </div>
        <div>
          <label htmlFor={ids.correo} className={labelClass}>
            Correo *
          </label>
          <Input
            {...fieldProps("correo")}
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            className={controlClass}
          />
          {errors.correo && (
            <p id={errorId("correo")} className={errorClass}>
              {errors.correo}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={ids.empresa} className={labelClass}>
            Empresa <span className="font-normal text-muted-foreground">(opcional)</span>
          </label>
          <Input id={ids.empresa} name="empresa" autoComplete="organization" className={controlClass} />
        </div>
        <div>
          <label htmlFor={ids.intent} className={labelClass}>
            ¿Qué necesitas? *
          </label>
          <select
            id={ids.intent}
            name="intent"
            value={intent}
            onChange={(e) => onIntentChange(e.target.value as ServiciosIntentValue)}
            required
            aria-invalid={intentError ? true : undefined}
            aria-describedby={intentError ? errorId("intent") : undefined}
            className="mt-1.5 flex h-11 w-full rounded-md border border-foreground/50 bg-background px-3 text-base text-foreground outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
          >
            <option value="">{SERVICIOS_INTENT_PLACEHOLDER}</option>
            {SERVICIOS_INTENTS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {intentError && (
            <p id={errorId("intent")} className={errorClass}>
              {intentError}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor={ids.detalle} className={labelClass}>
          Cuéntanos más *
        </label>
        <p id={`${ids.detalle}-hint`} className="mt-1 text-sm text-muted-foreground">
          Qué hace tu negocio y qué te gustaría resolver (mínimo 10 caracteres).
        </p>
        <Textarea
          {...fieldProps("detalle")}
          aria-describedby={cn(`${ids.detalle}-hint`, errors.detalle && errorId("detalle"))}
          rows={5}
          required
          minLength={10}
          className="mt-1.5 min-h-32 border-foreground/50 bg-background"
        />
        {errors.detalle && (
          <p id={errorId("detalle")} className={errorClass}>
            {errors.detalle}
          </p>
        )}
      </div>

      {/* Honeypot: invisible para personas, visible para bots */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={ids.gotcha}>No completar</label>
        <input id={ids.gotcha} name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={ids.consent}
            name="consent"
            type="checkbox"
            required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? errorId("consent") : undefined}
            className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded border-input accent-[color:var(--primary)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          />
          <label htmlFor={ids.consent} className="text-sm leading-snug text-foreground">
            Acepto que Viento Norte me contacte por esta solicitud. *
          </label>
        </div>
        {errors.consent && (
          <p id={errorId("consent")} className={errorClass}>
            {errors.consent}
          </p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status.kind === "sending"}
        className={cn(PRIMARY_CTA_CLASS, "w-full px-8 sm:w-auto")}
      >
        {status.kind === "sending" ? "Enviando…" : "Enviar mensaje"}
      </Button>

      <p
        role="status"
        aria-live="polite"
        className={cn(
          "min-h-6 text-sm font-medium",
          status.kind === "ok" && "text-foreground",
          status.kind === "error" && "text-destructive"
        )}
      >
        {status.text || announcement || ""}
      </p>
    </form>
  );
}
