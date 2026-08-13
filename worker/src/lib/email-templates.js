const PRIVACY_FOOTER_ES = `
<p style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e5e5;font-size:12px;color:#666;line-height:1.5">
  <strong>Privacidad:</strong> usamos tu email solo para responder esta consulta.
  No vendemos ni compartimos datos con terceros. Conservación máxima 12 meses o hasta resolver el contacto.
</p>`;

const PRIVACY_FOOTER_EN = `
<p style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e5e5;font-size:12px;color:#666;line-height:1.5">
  <strong>Privacy:</strong> we use your email only to reply to this inquiry.
  We do not sell or share data with third parties. Retention up to 12 months or until resolved.
</p>`;

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function buildAdminEmail({ safeName, safeEmail, safeMessage, intent, source, subject }) {
  const text = [
    'Nuevo mensaje desde vientonorte.io',
    '',
    `Nombre: ${safeName}`,
    `Email: ${safeEmail}`,
    intent ? `Motivo: ${intent}` : null,
    source ? `Canal: ${source}` : null,
    '',
    safeMessage,
    '',
    `— Relay mi-portafolio-contact · ${new Date().toISOString()}`,
    'Responde directamente a este correo (Reply-To del visitante).',
  ]
    .filter(Boolean)
    .join('\n');

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:24px;font-family:system-ui,-apple-system,sans-serif;background:#f8f8f8;color:#111">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e8e8e8;overflow:hidden">
    <tr>
      <td style="height:4px;background:linear-gradient(90deg,#e85d26,#f5a623)"></td>
    </tr>
    <tr>
      <td style="padding:28px 24px">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#888">Viento Norte · vientonorte.io</p>
        <h1 style="margin:0 0 20px;font-size:20px;font-weight:600;line-height:1.3">${escapeHtml(subject)}</h1>
        <table role="presentation" width="100%" style="margin-bottom:20px;font-size:14px">
          <tr><td style="padding:6px 0;color:#666;width:100px">Nombre</td><td style="padding:6px 0;font-weight:500">${escapeHtml(safeName)}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(safeEmail)}" style="color:#e85d26">${escapeHtml(safeEmail)}</a></td></tr>
          ${intent ? `<tr><td style="padding:6px 0;color:#666">Motivo</td><td style="padding:6px 0">${escapeHtml(intent)}</td></tr>` : ''}
          ${source ? `<tr><td style="padding:6px 0;color:#666">Canal</td><td style="padding:6px 0">${escapeHtml(source)}</td></tr>` : ''}
        </table>
        <div style="padding:16px;background:#fafafa;border-radius:8px;border:1px solid #eee">
          <p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#888">Mensaje</p>
          <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(safeMessage)}</p>
        </div>
        <p style="margin:20px 0 0;font-size:12px;color:#888">Reply-To configurado al email del visitante.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { text, html };
}

export function buildVisitorConfirmation({ safeName, publicFromEmail, language = 'es' }) {
  const isEn = language === 'en';
  const subject = isEn
    ? 'We received your message · Viento Norte'
    : 'Recibimos tu mensaje · Viento Norte';

  const text = isEn
    ? [
        `Hi ${safeName},`,
        '',
        'We received your message from vientonorte.io. Viento Norte will reply within 24 business hours.',
        '',
        'Your email is used only to respond to this contact — we do not share it with third parties.',
        '',
        `If you did not send this request, ignore this email or write to ${publicFromEmail}.`,
        '',
        '— Viento Norte',
        'vientonorte.io',
      ].join('\n')
    : [
        `Hola ${safeName},`,
        '',
        'Recibimos tu consulta desde vientonorte.io. Viento Norte te responde en menos de 24 horas hábiles.',
        '',
        'Tu email se usa solo para responder este contacto — no lo compartimos con terceros.',
        '',
        `Si no enviaste esta solicitud, ignora este correo o escribe a ${publicFromEmail}.`,
        '',
        '— Viento Norte',
        'vientonorte.io',
      ].join('\n');

  const footer = isEn ? PRIVACY_FOOTER_EN : PRIVACY_FOOTER_ES;
  const html = `
<!DOCTYPE html>
<html lang="${isEn ? 'en' : 'es'}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:24px;font-family:system-ui,-apple-system,sans-serif;background:#f8f8f8;color:#111">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;margin:0 auto;background:#fff;border-radius:12px;border:1px solid #e8e8e8;overflow:hidden">
    <tr><td style="height:4px;background:linear-gradient(90deg,#e85d26,#f5a623)"></td></tr>
    <tr>
      <td style="padding:28px 24px">
        <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#888">Viento Norte</p>
        <h1 style="margin:0 0 16px;font-size:18px;font-weight:600">${isEn ? 'Message received' : 'Mensaje recibido'}</h1>
        <p style="margin:0 0 12px;font-size:15px;line-height:1.5">${isEn ? 'Hi' : 'Hola'} <strong>${escapeHtml(safeName)}</strong>,</p>
        <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#333">
          ${isEn
            ? 'We received your message from <strong>vientonorte.io</strong>. Viento Norte will reply within <strong>24 business hours</strong>.'
            : 'Recibimos tu consulta desde <strong>vientonorte.io</strong>. Viento Norte te responde en <strong>menos de 24 horas hábiles</strong>.'}
        </p>
        <p style="margin:0;font-size:13px;line-height:1.5;color:#666">
          ${isEn
            ? `Your email is used only to respond to this contact. Questions: <a href="mailto:${escapeHtml(publicFromEmail)}" style="color:#e85d26">${escapeHtml(publicFromEmail)}</a>`
            : `Tu email se usa solo para responder este contacto. Dudas: <a href="mailto:${escapeHtml(publicFromEmail)}" style="color:#e85d26">${escapeHtml(publicFromEmail)}</a>`}
        </p>
        ${footer}
      </td>
    </tr>
  </table>
</body>
</html>`;

  return { subject, text, html };
}