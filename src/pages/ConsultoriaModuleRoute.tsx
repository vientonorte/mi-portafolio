/**
 * Deep link SEM: /consultoria/modulos/:moduleId → tour X|CMS.
 * No es el embudo de 3 packs (eso es ConsultoriaVientoNorte variant=sem).
 */
import { Navigate, useParams } from "react-router-dom";
import { isPocModuleId } from "../data/poc-product-modules";
import { ROUTES } from "../lib/routes";
import PocProductOnboarding from "./PocProductOnboarding";

export default function ConsultoriaModuleRoute() {
  const { moduleId } = useParams<{ moduleId?: string }>();
  if (!isPocModuleId(moduleId)) {
    return <Navigate to={ROUTES.consulting} replace />;
  }
  return <PocProductOnboarding initialModuleId={moduleId} />;
}
