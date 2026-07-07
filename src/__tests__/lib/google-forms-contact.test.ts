import { describe, expect, it } from "vitest";
import { buildGoogleFormsFields } from "@/lib/google-forms-contact";

describe("buildGoogleFormsFields", () => {
  it("maps payload to Google Forms entry keys", () => {
    const fields = buildGoogleFormsFields(
      {
        name: "Rö Test",
        email: "test@example.com",
        message: "Hola desde el portfolio",
        intent: "Consultoría",
        source: "assistant",
        language: "es",
      },
      {
        name: "entry.1001",
        email: "entry.1002",
        message: "entry.1003",
        intent: "entry.1004",
        source: "entry.1005",
        language: "entry.1006",
      }
    );

    expect(fields["entry.1001"]).toBe("Rö Test");
    expect(fields["entry.1002"]).toBe("test@example.com");
    expect(fields["entry.1003"]).toContain("Hola desde el portfolio");
    expect(fields["entry.1003"]).toContain("Motivo: Consultoría");
    expect(fields["entry.1004"]).toBe("Consultoría");
    expect(fields["entry.1005"]).toBe("assistant");
    expect(fields["entry.1006"]).toBe("es");
  });
});