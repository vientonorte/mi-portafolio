import { describe, expect, it } from "vitest";
import { ADMIN_ROUTES } from "@/lib/admin-config";
import { ROUTES } from "@/lib/routes";

describe("admin kickoff routes", () => {
  it("exposes data-browser endpoints on the same Worker host", () => {
    expect(ADMIN_ROUTES.overview).toMatch(/\/api\/admin\/overview$/);
    expect(ADMIN_ROUTES.leads).toMatch(/\/api\/admin\/leads$/);
    expect(ADMIN_ROUTES.bookings).toMatch(/\/api\/admin\/bookings$/);
    expect(ADMIN_ROUTES.diagnosticos).toMatch(/\/api\/admin\/diagnosticos$/);
    expect(ADMIN_ROUTES.services).toMatch(/\/api\/admin\/services$/);
    expect(ADMIN_ROUTES.cases).toMatch(/\/api\/admin\/cases$/);
    expect(ADMIN_ROUTES.health).toMatch(/\/api\/health$/);
  });

  it("keeps the admin hub off the public nav", () => {
    expect(ROUTES.admin).toBe("/admin");
    expect(ROUTES.adminPhotos.startsWith(ROUTES.admin)).toBe(true);
  });
});
