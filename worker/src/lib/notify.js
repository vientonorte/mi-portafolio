/** Aviso inbox VN (FormSubmit → Cloudflare Email). */

export async function notifyInbox(env, { subject, text, html, replyTo, replyName }) {
  const inbox = env.CONTACT_INBOX || 'gaete.gaona@gmail.com';
  const fromEmail = env.CONTACT_FROM || 'contacto@vientonorte.io';
  const fromName = env.CONTACT_FROM_NAME || 'Viento Norte';

  try {
    const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Referer: 'https://vientonorte.io/',
        Origin: 'https://vientonorte.io',
      },
      body: JSON.stringify({
        name: replyName || fromName,
        email: replyTo || fromEmail,
        message: text,
        _subject: subject,
        _replyto: replyTo || fromEmail,
        _template: 'table',
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (data.success === 'true' || data.success === true) {
      return { ok: true, channel: 'formsubmit' };
    }
  } catch (err) {
    console.warn('[notify] formsubmit failed:', err?.message || err);
  }

  if (env.EMAIL) {
    try {
      await env.EMAIL.send({
        to: inbox,
        from: { email: fromEmail, name: fromName },
        replyTo: replyTo ? { email: replyTo, name: replyName || replyTo } : undefined,
        subject,
        text,
        html: html || `<pre>${text}</pre>`,
      });
      return { ok: true, channel: 'cloudflare' };
    } catch (err) {
      console.warn('[notify] cloudflare email failed:', err?.message || err);
    }
  }
  return { ok: false };
}

export async function notifyVisitor(env, { to, name, subject, text, html }) {
  if (!to || !env.EMAIL) return { ok: false };
  const fromEmail = env.CONTACT_FROM || 'contacto@vientonorte.io';
  const fromName = env.CONTACT_FROM_NAME || 'Viento Norte';
  try {
    await env.EMAIL.send({
      to,
      from: { email: fromEmail, name: fromName },
      replyTo: { email: fromEmail, name: fromName },
      subject,
      text,
      html,
    });
    return { ok: true, channel: 'cloudflare' };
  } catch (err) {
    console.warn('[notify] visitor email failed:', err?.message || err);
    return { ok: false };
  }
}
