import { describe, expect, it } from 'vitest';
import { buildKickoffBookingConfirmation } from '../lib/email-templates.js';

describe('buildKickoffBookingConfirmation', () => {
  it('includes the 30-min kickoff script, WCAG/Ley 21.719 and the ticket value (es)', () => {
    const { subject, text, html } = buildKickoffBookingConfirmation({
      safeName: 'Ana <Legal>',
      startAt: '2026-09-08T15:00:00-04:00',
      calendarUrl: 'https://calendar.google.com/event?eid=abc',
    });

    expect(subject).toMatch(/30 min/);
    expect(text).toContain('Ana <Legal>');
    expect(text).toContain('2026-09-08T15:00:00-04:00');
    expect(text).toMatch(/WCAG 2\.4\.7/);
    expect(text).toMatch(/Ley 21\.719/);
    expect(text).toMatch(/WCAG 3\.3\.2/);
    expect(text).toMatch(/5 a 7 días hábiles/);
    expect(text).toContain('$500.000 CLP');
    expect(text).toContain('https://calendar.google.com/event?eid=abc');

    // HTML must escape the visitor-provided name (no raw <Legal> tag injected).
    expect(html).not.toContain('<Legal>');
    expect(html).toContain('Ana &lt;Legal&gt;');
    expect(html).toContain('$500.000 CLP');
  });

  it('falls back to a generic schedule line without startAt', () => {
    const { text } = buildKickoffBookingConfirmation({ safeName: 'Carlos' });
    expect(text).toMatch(/Google Calendar te confirma el horario exacto\./);
  });

  it('renders English copy when language=en', () => {
    const { subject, text } = buildKickoffBookingConfirmation({
      safeName: 'John',
      startAt: '2026-09-08T15:00:00-04:00',
      language: 'en',
    });
    expect(subject).toMatch(/kickoff is confirmed/i);
    expect(text).toMatch(/Law 21\.719/);
    expect(text).toContain('$500,000 CLP');
  });
});
