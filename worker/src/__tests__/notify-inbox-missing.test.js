import { describe, it, expect, vi } from 'vitest';
import { notifyInbox } from '../lib/notify.js';

describe('notifyInbox sin CONTACT_INBOX', () => {
  it('no envía, no lanza y devuelve ok:false', async () => {
    const send = vi.fn();
    const err = vi.spyOn(console, 'error').mockImplementation(() => {});
    const r = await notifyInbox({ EMAIL: { send } }, { subject: 's', text: 't' });
    expect(r).toEqual({ ok: false });
    expect(send).not.toHaveBeenCalled();
    expect(err).toHaveBeenCalled();
    err.mockRestore();
  });
});
