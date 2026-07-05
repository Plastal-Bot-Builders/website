import nodemailer from 'nodemailer';

// Email is optional: it activates when SMTP_* vars are set in .env, otherwise
// sendMail becomes a no-op so the rest of the app works without configuration.
// Required vars: SMTP_HOST, SMTP_USER, SMTP_PASS. Optional: SMTP_PORT, MAIL_FROM.
let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT) || 587,
    secure: (parseInt(SMTP_PORT) || 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  });

  return transporter;
}

export function isMailConfigured() {
  return getTransporter() !== null;
}

/**
 * Send an email. Resolves without sending when SMTP is not configured.
 * Never throws — callers should not fail their request because email failed.
 */
export async function sendMail({ to, subject, text, html }) {
  const t = getTransporter();
  if (!t) {
    console.log(`📭 Email not configured — skipped "${subject}" to ${to}`);
    return false;
  }

  try {
    await t.sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to,
      subject,
      text,
      html
    });
    console.log(`📧 Sent "${subject}" to ${to}`);
    return true;
  } catch (err) {
    console.error(`Email send failed ("${subject}" to ${to}):`, err.message);
    return false;
  }
}

export function memberApprovedEmail(member) {
  return {
    to: member.email,
    subject: 'Welcome to Plastal-Bot Builders — your membership is approved!',
    text: `Hi ${member.fullName},\n\nGreat news — your membership application to Plastal-Bot Builders has been approved!\n\nWe're excited to have you join our community of innovators working on robotics and STEM education in Zambia. We'll be in touch soon with details about upcoming events and how to get involved.\n\nWelcome aboard!\nThe Plastal-Bot Builders Team`
  };
}

export function memberRejectedEmail(member, reason) {
  const reasonLine = reason && reason !== 'No reason provided'
    ? `\n\nNote from our team: ${reason}`
    : '';
  return {
    to: member.email,
    subject: 'Update on your Plastal-Bot Builders application',
    text: `Hi ${member.fullName},\n\nThank you for your interest in Plastal-Bot Builders. After reviewing your application, we're unable to offer you membership at this time.${reasonLine}\n\nYou're welcome to apply again in the future, and we'd still love to see you at our public events and workshops.\n\nBest wishes,\nThe Plastal-Bot Builders Team`
  };
}
