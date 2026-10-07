/** Datos de EJEMPLO (pyme ficticia). Seguro para el cliente: no contiene ni usa secretos. */
import sampleData from "../../data/digitalizacion-sample-movements.json";
import type { FintocAccount, FintocMovement } from "./cashflow";

export interface MovementsPayload {
  sample: boolean;
  account: FintocAccount;
  movements: FintocMovement[];
}

export const SAMPLE_BUSINESS_NAME: string = sampleData.business.name;

export function samplePayload(): MovementsPayload {
  return {
    sample: true,
    account: sampleData.account as FintocAccount,
    movements: sampleData.movements as FintocMovement[],
  };
}
