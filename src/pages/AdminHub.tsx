import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Database, ImageIcon, LogOut, RefreshCw, Search } from "lucide-react";
import { SEOHead } from "../components/atoms/SEOHead";
import { PageShell } from "../components/layout/PageShell";
import { useLanguage } from "../lib/LanguageContext";
import { useTranslation } from "../lib/i18n";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { ADMIN_GITHUB_USER } from "../lib/admin-config";
import { ROUTES } from "../lib/routes";
import {
  adminLogout,
  getAdminOverview,
  getAdminSession,
  listAdminCatalog,
  listAdminCollection,
  passkeyLoginBegin,
  passkeyLoginFinish,
  patchAdminRecord,
  startGithubLogin,
  type AdminCollection,
  type AdminOverview,
  type AdminRecord,
} from "../lib/admin-api";
import { isPasskeySupported, loginWithPasskey } from "../lib/admin-passkey";

const STATUSES: Record<AdminCollection, string[]> = {
  leads: ["nuevo", "contactado", "cerrado"],
  bookings: ["pendiente", "confirmado", "cancelado", "hecho"],
  diagnosticos: ["nuevo", "en_revision", "respondido", "cerrado"],
};

function personName(value: AdminRecord["name"]) {
  if (!value) return "—";
  if (typeof value === "string") return value;
  return value.es || value.en || "—";
}

function formatWhen(value?: string) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("es-CL", { dateStyle: "short", timeStyle: "short" });
}

function statusVariant(status?: string): "default" | "secondary" | "outline" | "destructive" {
  if (status === "cerrado" || status === "cancelado") return "outline";
  if (status === "nuevo" || status === "pendiente") return "default";
  return "secondary";
}

export default function AdminHub() {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [session, setSession] = useState<{ ok: boolean; user?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState("overview");
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [rows, setRows] = useState<AdminRecord[]>([]);
  const [catalog, setCatalog] = useState<AdminRecord[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  const refreshSession = useCallback(async () => {
    try {
      const data = await getAdminSession();
      setSession(data);
      return data.ok;
    } catch {
      setSession({ ok: false });
      return false;
    }
  }, []);

  const loadOverview = useCallback(async () => {
    const data = await getAdminOverview();
    setOverview(data);
  }, []);

  const loadCollection = useCallback(async (collection: AdminCollection) => {
    const items = await listAdminCollection(collection, {
      q: query || undefined,
      status: statusFilter === "all" ? undefined : statusFilter,
    });
    setRows(items);
  }, [query, statusFilter]);

  const loadCatalog = useCallback(async (kind: "services" | "cases") => {
    const items = await listAdminCatalog(kind);
    setCatalog(items);
  }, []);

  const refreshTab = useCallback(
    async (next = tab) => {
      setError(null);
      try {
        if (next === "overview") await loadOverview();
        else if (next === "leads" || next === "bookings" || next === "diagnosticos") {
          await loadCollection(next);
        } else if (next === "services" || next === "cases") {
          await loadCatalog(next);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error cargando datos");
      }
    },
    [loadCatalog, loadCollection, loadOverview, tab]
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const ok = await refreshSession();
      if (ok) {
        try {
          await loadOverview();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Error cargando overview");
        }
      }
      setLoading(false);
    })();
  }, [loadOverview, refreshSession]);

  useEffect(() => {
    if (!session?.ok) return;
    if (tab === "overview") return;
    void refreshTab(tab);
  }, [query, refreshTab, session?.ok, statusFilter, tab]);

  const handleGithub = () => startGithubLogin(ROUTES.admin);

  const handlePasskeyLogin = async () => {
    setError(null);
    try {
      const options = await passkeyLoginBegin();
      const body = await loginWithPasskey(options);
      await passkeyLoginFinish(body);
      const ok = await refreshSession();
      if (ok) await loadOverview();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error con passkey");
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    setSession({ ok: false });
    setOverview(null);
    setRows([]);
  };

  const handleStatus = async (collection: AdminCollection, id: string, status: string) => {
    setBusyId(id);
    setError(null);
    try {
      const updated = await patchAdminRecord(collection, id, { status });
      setRows((prev) => prev.map((row) => (row.id === id ? updated : row)));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo actualizar");
    } finally {
      setBusyId(null);
    }
  };

  const collectionTab = tab === "leads" || tab === "bookings" || tab === "diagnosticos" ? tab : null;

  const filteredHint = useMemo(() => {
    if (!collectionTab) return null;
    return `${rows.length} registro${rows.length === 1 ? "" : "s"}`;
  }, [collectionTab, rows.length]);

  if (loading) {
    return (
      <PageShell crumbs={[]} showToolbar={false}>
        <SEOHead title="VN" description="" noIndex />
        <div className="container max-w-md mx-auto px-4 py-24 text-center text-muted-foreground">
          …
        </div>
      </PageShell>
    );
  }

  if (!session?.ok) {
    return (
      <PageShell crumbs={[]} showToolbar={false}>
        <SEOHead title="VN" description="" noIndex />
        <div className="container max-w-md mx-auto px-4 py-24 space-y-6">
          <h1 className="text-xl font-semibold tracking-tight">Entrar</h1>
          <p className="text-sm text-muted-foreground">Acceso con passkey.</p>
          {error ? (
            <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {error}
            </div>
          ) : null}
          {isPasskeySupported() ? (
            <Button className="min-h-[44px] w-full" onClick={() => void handlePasskeyLogin()}>
              Continuar con passkey
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">Este dispositivo no soporta passkey.</p>
          )}
          <details className="text-sm text-muted-foreground">
            <summary className="cursor-pointer select-none">Primera vez</summary>
            <p className="mt-2 mb-3">
              Solo @{ADMIN_GITHUB_USER}. Después registra la passkey y no vuelvas a usar GitHub aquí.
            </p>
            <Button variant="outline" className="min-h-[44px]" onClick={handleGithub}>
              GitHub (bootstrap)
            </Button>
          </details>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell crumbs={[{ label: t.breadcrumbs.admin, current: true }]} showLogoText={false}>
      <SEOHead title="VN" description="" noIndex />
      <div className="container max-w-6xl mx-auto px-4 py-8 md:py-12 space-y-8">
        <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-widest text-primary">Interno</p>
            <h1 className="text-3xl font-bold">Bases</h1>
            <p className="text-muted-foreground max-w-2xl">
              Solo sesión @{ADMIN_GITHUB_USER}.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="min-h-[44px]">
              <Link to={ROUTES.adminPhotos}>
                <ImageIcon className="mr-2 h-4 w-4" aria-hidden />
                Fotos
              </Link>
            </Button>
            <Button variant="ghost" className="min-h-[44px]" onClick={() => void handleLogout()}>
              <LogOut className="mr-2 h-4 w-4" aria-hidden />
              Salir {session.user ? `(@${session.user})` : ""}
            </Button>
          </div>
        </header>

        {error ? (
          <div className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        <Tabs value={tab} onValueChange={setTab}>
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <TabsList className="flex flex-wrap h-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
                <TabsTrigger value="bookings">Agenda</TabsTrigger>
                <TabsTrigger value="diagnosticos">Diagnósticos</TabsTrigger>
                <TabsTrigger value="services">Servicios</TabsTrigger>
                <TabsTrigger value="cases">Casos</TabsTrigger>
              </TabsList>
              <Button
                type="button"
                variant="outline"
                className="min-h-[44px]"
                onClick={() => void refreshTab()}
              >
                <RefreshCw className="mr-2 h-4 w-4" aria-hidden />
                Actualizar
              </Button>
            </div>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <Metric title="Leads hoy / semana" today={overview?.today.leads} week={overview?.week.leads} total={overview?.totals.leads} />
                <Metric title="Agenda hoy / semana" today={overview?.today.bookings} week={overview?.week.bookings} total={overview?.totals.bookings} />
                <Metric title="Diagnósticos hoy / semana" today={overview?.today.diagnosticos} week={overview?.week.diagnosticos} total={overview?.totals.diagnosticos} />
              </div>
              <RecentList title="Últimos leads" items={overview?.recent.leads ?? []} />
              <RecentList title="Últimas reservas" items={overview?.recent.bookings ?? []} />
            </TabsContent>

            {(["leads", "bookings", "diagnosticos"] as const).map((collection) => (
              <TabsContent key={collection} value={collection} className="space-y-4">
                <div className="flex flex-col gap-3 md:flex-row">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
                    <Input
                      className="min-h-[44px] pl-9"
                      placeholder="Buscar nombre, email, mensaje…"
                      value={tab === collection ? query : ""}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  <Select
                    value={tab === collection ? statusFilter : "all"}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger className="min-h-[44px] w-full md:w-48">
                      <SelectValue placeholder="Estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      {STATUSES[collection].map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-sm text-muted-foreground">{filteredHint}</p>
                <RecordsTable
                  collection={collection}
                  rows={tab === collection ? rows : []}
                  busyId={busyId}
                  onStatus={handleStatus}
                />
              </TabsContent>
            ))}

            <TabsContent value="services">
              <CatalogTable rows={tab === "services" ? catalog : []} kind="services" />
            </TabsContent>
            <TabsContent value="cases">
              <CatalogTable rows={tab === "cases" ? catalog : []} kind="cases" />
            </TabsContent>
        </Tabs>
      </div>
    </PageShell>
  );
}

function Metric({
  title,
  today,
  week,
  total,
}: {
  title: string;
  today?: number;
  week?: number;
  total?: number;
}) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold tabular-nums">
          {today ?? "—"} <span className="text-base text-muted-foreground">/ {week ?? "—"}</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Total histórico: {total ?? "—"}</p>
      </CardContent>
    </Card>
  );
}

function RecentList({ title, items }: { title: string; items: AdminRecord[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sin registros todavía.</p>
        ) : (
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.id} className="flex flex-col gap-1 border-b border-border/60 pb-3 last:border-0 last:pb-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{personName(item.name) === "—" ? item.id : personName(item.name)}</span>
                  <Badge variant={statusVariant(item.status)}>{item.status || "—"}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.email}</p>
                <p className="text-xs text-muted-foreground">{formatWhen(item.createdAt)}</p>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function RecordsTable({
  collection,
  rows,
  busyId,
  onStatus,
}: {
  collection: AdminCollection;
  rows: AdminRecord[];
  busyId: string | null;
  onStatus: (collection: AdminCollection, id: string, status: string) => void;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cuándo</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Detalle</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-muted-foreground">
                Sin registros.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="whitespace-nowrap text-xs">{formatWhen(row.createdAt)}</TableCell>
                <TableCell className="font-medium">{personName(row.name)}</TableCell>
                <TableCell>
                  {row.email ? (
                    <a className="underline-offset-2 hover:underline" href={`mailto:${row.email}`}>
                      {row.email}
                    </a>
                  ) : (
                    "—"
                  )}
                </TableCell>
                <TableCell className="max-w-[28rem] text-sm text-muted-foreground">
                  <DetailCell row={row} collection={collection} />
                </TableCell>
                <TableCell>
                  <Select
                    value={row.status || STATUSES[collection][0]}
                    disabled={busyId === row.id}
                    onValueChange={(value) => onStatus(collection, row.id, value)}
                  >
                    <SelectTrigger className="min-h-[40px] w-[11rem]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {STATUSES[collection].map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

function DetailCell({ row, collection }: { row: AdminRecord; collection: AdminCollection }) {
  if (collection === "bookings") {
    return (
      <div className="space-y-1">
        <p>{row.intent || row.notes || "—"}</p>
        {row.calendarUrl ? (
          <a
            href={String(row.calendarUrl)}
            className="inline-flex items-center gap-1 text-primary"
            target="_blank"
            rel="noreferrer"
          >
            <CalendarDays className="h-3.5 w-3.5" aria-hidden />
            Calendar
          </a>
        ) : null}
      </div>
    );
  }
  if (collection === "diagnosticos") {
    return (
      <div className="space-y-1">
        <p>{row.friction || "—"}</p>
        {row.company ? <p>Empresa: {String(row.company)}</p> : null}
      </div>
    );
  }
  return <p className="line-clamp-3">{row.message || row.intent || "—"}</p>;
}

function CatalogTable({ rows, kind }: { rows: AdminRecord[]; kind: "services" | "cases" }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>{kind === "services" ? "Nombre" : "Caso"}</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Nota</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-muted-foreground">
                Catálogo vacío o API no disponible.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => {
              const name =
                typeof row.name === "object" && row.name
                  ? String((row.name as { es?: string }).es || row.id)
                  : String(row.name || row.title || row.id);
              const title =
                typeof row.title === "object" && row.title
                  ? String((row.title as { es?: string }).es || "")
                  : "";
              const active = row.active !== false && row.published !== false;
              return (
                <TableRow key={row.id}>
                  <TableCell className="font-mono text-xs">{row.id}</TableCell>
                  <TableCell className="font-medium">{name || title}</TableCell>
                  <TableCell>
                    <Badge variant={active ? "default" : "outline"}>
                      {active ? "activo" : "oculto"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {kind === "services" ? (
                      <span className="inline-flex items-center gap-1">
                        <Database className="h-3.5 w-3.5" aria-hidden />
                        {String(row.kind || "servicio")}
                      </span>
                    ) : (
                      String(row.company || "")
                    )}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
