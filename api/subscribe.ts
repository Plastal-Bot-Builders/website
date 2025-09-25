import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY!);

// Where you receive notifications
const ORG_EMAIL =
  process.env.ORG_NOTIFICATION_EMAIL ||
  'plastalbotbuilders@gmail.com';

// From must be a verified domain in Resend (replace notify@yourdomain.com with yours)
const FROM_EMAIL =
  process.env.FROM_EMAIL ||
  'Plastal Bot Builders <notify@yourdomain.com>';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST')
    return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body || {};
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return res.status(400).json({ error: 'Invalid email' });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: ORG_EMAIL,
      subject: 'New Newsletter Subscriber',
      text: `New subscriber: ${email}`,
      reply_to: 'plastalbotbuilders@gmail.com'
    });
    return res.json({ ok: true });
  } catch {
    return res.status(500).json({ error: 'Send failed' });
  }
}