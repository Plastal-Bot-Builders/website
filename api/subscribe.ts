import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const apiKey = process.env.RESEND_API_KEY;
const resend = new Resend(apiKey || '');

const ORG_EMAIL = process.env.ORG_NOTIFICATION_EMAIL || 'plastalbotbuilders@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Plastal Bot Builders <notify@yourdomain.com>';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  if (!apiKey) return res.status(500).json({ error: 'Missing RESEND_API_KEY' });

  const { email } = req.body || {};
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))
    return res.status(400).json({ error: 'Invalid email' });

  try {
    await resend.emails.send({
      from: FROM_EMAIL,            // must be verified in Resend
      to: ORG_EMAIL,               // your Gmail receives the notification
      subject: 'New Newsletter Subscriber',
      text: `New subscriber: ${email}`,
      reply_to: 'plastalbotbuilders@gmail.com'
    });
    return res.json({ ok: true });
  } catch (e) {
    console.error('Resend error:', e);
    return res.status(500).json({ error: 'Send failed' });
  }
}