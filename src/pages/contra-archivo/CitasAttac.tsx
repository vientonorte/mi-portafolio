import React from 'react';
import { BookOpen, ExternalLink, FileText, Hash, Shield } from 'lucide-react';
import { SEOHead } from '../components/atoms/SEOHead';

// ─── Datos ────────────────────────────────────────────────────────────────────

const frictionMarkers = [
  { marker: 'trabajador ↔ cartera de custodia',         weight: 0.91 },
  { marker: 'custodia transnacional ↔ regulación',       weight: 0.86 },
  { marker: 'consentimiento ↔ liquidez como semáforo',   weight: 0.87 },
  { marker: 'rescates fondos mutuos ↔ cumplimiento',     weight: 0.84 },
  { marker: 'opacidad ↔ patrimonio depurado',            weight: 0.80 },
];

const references = [
  {
    author: 'Salazar, G.',
    year: '2003',
    title: 'Historia de la acumulación capitalista en Chile',
    publisher: 'LOM Ediciones',
  },
  {
    author: 'Harvey, D.',
    year: '2003',
    title: 'The New Imperialism',
    publisher: 'Oxford University Press',
  },
  {
    author: 'Varoufakis, Y.',
    year: '2011',
    title: 'The Global Minotaur',
    publisher: 'Zed Books',
  },
  {
    author: 'ATTAC',
    year: '2024–2026',
    title: 'Publicaciones sobre regulación financiera y justicia fiscal',
    publisher: 'attac.org',
    url: 'https://attac.org',
  },
];

const citationFields = [
  { label: 'Fuente', desc: 'URL o referencia bibliográfica completa' },
  { label: 'Fecha de publicación / captura', desc: 'Fecha exacta de acceso al documento original' },
  { label: 'Cita textual', desc: 'Transcripción exacta del fragmento, sin alteración' },
  { label: 'Capa de análisis', desc: 'Ética · Institucional · Material' },
  { label: 'Fricción con', desc: 'Mecanismo de mistranslation evidenciado' },
  { label: 'Marcador semántico', desc: 'Referencia al frictionEngine y su peso asignado' },
];

const captureProtocol = [
  'Solo capturas de sitios oficiales ATTAC (attac.org, attac-france.org, redes verificadas)',
  'URL visible en barra de direcciones cuando sea posible',
  'Fecha y hora de acceso documentadas',
  'Sin alteración ni recorte de las capturas originales',
  'Hash SHA-256 para integridad de cadena de custodia digital',
];

// ─── Componente ───────────────────────────────────────────────────────────────

export default function CitasAttac() {
  return (
    <>
      <SEOHead
        title="Citas ATTAC — Etnografía Digital SURA Investments"
        description="Fichas de citas y capturas de ATTAC usadas como evidencia en la tesis doctoral Contra-Archivo: Antropología y Corrupción. Análisis de circuitos financieros transnacionales, mistranslation institucional y marcadores de fricción semántica."
        url="https://vientonorte.github.io/mi-portafolio/#/contra-archivo/citas-attac"
        type="article"
        noIndex={false}
      />

      <div className="min-h-screen bg-background">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <header className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-orange-500/5 border-b border-border">
          <div className="max-w-4xl mx-auto px-6 py-20 lg:py-28">

            {/* Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm w-fit mb-6">
              <BookOpen className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span className="text-primary font-medium">Investigación doctoral</span>
            </span>

            <h1 className="text-3xl lg:text-5xl font-black tracking-tight mb-4 leading-tight">
              Citas{' '}
              <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                ATTAC
              </span>
              <br />
              <span className="text-foreground/80 text-2xl lg:text-3xl font-semibold">
                Etnografía Digital · SURA Investments
              </span>
            </h1>

            <p className="text-muted-foreground text-base lg:text-lg max-w-2xl mb-8 leading-relaxed">
              Capturas de pantalla y fichas de citas provenientes de{' '}
              <strong className="text-foreground">ATTAC</strong>{' '}
              (Association pour la Taxation des Transactions financières et pour l'Action Citoyenne)
              utilizadas como evidencia en la tesis doctoral{' '}
              <em className="text-foreground">Contra-Archivo: Antropología y Corrupción</em>.
            </p>

            <a
              href="https://github.com/vientonorte/antropologia-corrupcion/tree/main/Estado%20del%20Arte/Citas%20Attac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-background hover:bg-primary/5 hover:border-primary/40 transition-all duration-200 text-sm font-medium text-foreground"
            >
              <ExternalLink className="w-4 h-4 text-primary" aria-hidden="true" />
              Ver repositorio de investigación
            </a>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">

          {/* ── Relevancia SURA ──────────────────────────────────────────────── */}
          <section aria-labelledby="sura-heading">
            <h2
              id="sura-heading"
              className="text-xl lg:text-2xl font-bold tracking-tight mb-2 flex items-center gap-3"
            >
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Hash className="w-4 h-4 text-primary" aria-hidden="true" />
              </span>
              Relevancia para el caso SURA Investments
            </h2>
            <p className="text-muted-foreground text-sm mb-8 pl-11">
              ATTAC es una red internacional fundada en 1998 que propone la{' '}
              <strong className="text-foreground">Tasa Tobin</strong> (impuesto a transacciones
              financieras) y documenta los mecanismos de concentración del capital financiero
              globalizado. Sus publicaciones constituyen fuentes primarias para:
            </p>

            <ol className="pl-11 space-y-6 list-none">
              {[
                {
                  num: '01',
                  title: 'Opacidad de circuitos financieros transnacionales',
                  body: 'Vinculada a la cadena AFP → Corredora SURA → JP Morgan documentada en las FECU de la CMF.',
                },
                {
                  num: '02',
                  title: 'Mistranslation institucional',
                  body: 'Cómo los marcos regulatorios nacionales (DL 3.500, normativa CMF) fallan en traducir las dinámicas de acumulación aberrante (Salazar, 2003) y accumulation by dispossession (Harvey, 2003).',
                },
                {
                  num: '03',
                  title: 'Custodios globales como nodos extractivos',
                  body: 'ATTAC documenta cómo entidades como JP Morgan operan como nodos de un circuito de extracción de valor desde la periferia hacia centros nor-occidentales.',
                },
              ].map(({ num, title, body }) => (
                <li key={num} className="flex gap-4">
                  <span
                    className="text-2xl font-black text-primary/30 leading-none w-8 flex-shrink-0 select-none"
                    aria-hidden="true"
                  >
                    {num}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* ── Marcadores de fricción ────────────────────────────────────────── */}
          <section aria-labelledby="friction-heading">
            <h2
              id="friction-heading"
              className="text-xl lg:text-2xl font-bold tracking-tight mb-6 flex items-center gap-3"
            >
              <span className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <Hash className="w-4 h-4 text-orange-500" aria-hidden="true" />
              </span>
              Marcadores de fricción semántica
            </h2>

            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th scope="col" className="text-left px-5 py-3 font-semibold text-foreground/80">
                      Marcador
                    </th>
                    <th scope="col" className="text-right px-5 py-3 font-semibold text-foreground/80 w-32">
                      Peso
                    </th>
                    <th scope="col" className="px-5 py-3 w-40 hidden sm:table-cell" aria-label="Intensidad visual">
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {frictionMarkers.map(({ marker, weight }, i) => (
                    <tr
                      key={marker}
                      className={`border-b border-border last:border-0 ${
                        i % 2 === 0 ? 'bg-background' : 'bg-muted/20'
                      } hover:bg-primary/5 transition-colors duration-150`}
                    >
                      <td className="px-5 py-3.5 font-mono text-xs text-foreground leading-relaxed">
                        {marker}
                      </td>
                      <td className="px-5 py-3.5 text-right font-bold text-primary tabular-nums">
                        {weight.toFixed(2)}
                      </td>
                      <td className="px-5 py-3.5 hidden sm:table-cell">
                        <div
                          className="h-1.5 rounded-full bg-muted overflow-hidden"
                          role="meter"
                          aria-valuenow={weight}
                          aria-valuemin={0}
                          aria-valuemax={1}
                          aria-label={`Intensidad: ${(weight * 100).toFixed(0)}%`}
                        >
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary to-orange-400 transition-all duration-500"
                            style={{ width: `${weight * 100}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-3 pl-1">
              Pesos semánticos calculados por <code className="font-mono bg-muted px-1 rounded">frictionEngine</code>.
              Valores cercanos a 1 indican mayor tensión epistémica documentada.
            </p>
          </section>

          {/* ── Protocolo de fichas ───────────────────────────────────────────── */}
          <section aria-labelledby="protocol-heading">
            <h2
              id="protocol-heading"
              className="text-xl lg:text-2xl font-bold tracking-tight mb-6 flex items-center gap-3"
            >
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-4 h-4 text-primary" aria-hidden="true" />
              </span>
              Protocolo de fichas de cita
            </h2>

            <p className="text-muted-foreground text-sm mb-6">
              Cada captura de pantalla debe tener una ficha asociada (<code className="font-mono bg-muted px-1 rounded text-xs">.md</code>) con los siguientes campos:
            </p>

            <dl className="grid sm:grid-cols-2 gap-4">
              {citationFields.map(({ label, desc }) => (
                <div
                  key={label}
                  className="rounded-lg border border-border bg-muted/30 px-5 py-4"
                >
                  <dt className="font-semibold text-foreground text-sm mb-1">{label}</dt>
                  <dd className="text-muted-foreground text-xs leading-relaxed">{desc}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* ── Cadena de custodia ────────────────────────────────────────────── */}
          <section aria-labelledby="custody-heading">
            <h2
              id="custody-heading"
              className="text-xl lg:text-2xl font-bold tracking-tight mb-6 flex items-center gap-3"
            >
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
              </span>
              Protocolo de captura y custodia digital
            </h2>

            <ol className="space-y-3">
              {captureProtocol.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span
                    className="flex-shrink-0 w-5 h-5 rounded-full border border-primary/30 text-primary text-xs font-bold flex items-center justify-center mt-0.5"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>

            <div className="mt-6 rounded-lg border border-orange-500/20 bg-orange-500/5 px-5 py-4">
              <p className="text-xs text-muted-foreground">
                <strong className="text-foreground">Convención de nombrado:</strong>{' '}
                <code className="font-mono bg-muted px-1.5 py-0.5 rounded text-xs">
                  YYYY-MM-DD_attac_[tema-breve].png
                </code>
              </p>
            </div>
          </section>

          {/* ── Referencias académicas ────────────────────────────────────────── */}
          <section aria-labelledby="references-heading">
            <h2
              id="references-heading"
              className="text-xl lg:text-2xl font-bold tracking-tight mb-6 flex items-center gap-3"
            >
              <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
              </span>
              Referencias
            </h2>

            <ul className="space-y-4" role="list">
              {references.map((ref) => (
                <li
                  key={`${ref.author}-${ref.year}`}
                  className="flex gap-4 text-sm border-l-2 border-primary/20 pl-4 py-1"
                >
                  <div className="leading-relaxed">
                    <span className="font-semibold text-foreground">{ref.author}</span>{' '}
                    <span className="text-muted-foreground">({ref.year}).</span>{' '}
                    <em className="text-foreground">{ref.title}</em>
                    {'. '}
                    {ref.url ? (
                      <a
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
                      >
                        {ref.publisher}
                      </a>
                    ) : (
                      <span className="text-muted-foreground">{ref.publisher}.</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Link al repositorio fuente ────────────────────────────────────── */}
          <section
            className="rounded-xl border border-border bg-muted/20 px-6 py-8 text-center"
            aria-label="Repositorio de investigación"
          >
            <p className="text-sm text-muted-foreground mb-4">
              Fuente primaria · Repositorio de investigación doctoral
            </p>
            <a
              href="https://github.com/vientonorte/antropologia-corrupcion"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background font-medium text-sm hover:opacity-90 transition-opacity duration-200"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              vientonorte/antropologia-corrupcion
            </a>
            <p className="text-xs text-muted-foreground mt-4 font-mono">
              Estado del Arte / Citas Attac / README.md
            </p>
          </section>

        </main>
      </div>
    </>
  );
}
