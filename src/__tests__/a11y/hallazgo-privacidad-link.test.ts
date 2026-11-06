// Hallazgo 2026-11-04: https://vientonorte.io/privacidad/ responde 404
// (sirve la home, canonical a "/"). El consentimiento y el footer
// mandan a la ruta hash /#/privacy. Rojo a propósito hasta el fix.
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const src = (p: string) => readFileSync(resolve(__dirname, '../..', p), 'utf8');

describe('hallazgo privacidad: link real, no hash', () => {
  it('ROUTES.privacy apunta a /privacidad/', () => {
    expect(src('vn-core/routes.ts')).toMatch(/privacy:\s*["']\/privacidad\/["']/);
  });

  it('el footer no usa la ruta hash /privacy', () => {
    expect(src('components/Footer.tsx')).not.toMatch(/to=["']\/privacy["']/);
  });
});
