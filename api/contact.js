// /api/contact.js   (Node serverless function for Vercel + Vite)
const { Resend } = require("resend");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, message, website } = req.body || {};

    // Honeypot: bots fill this hidden field
    if (website) return res.status(200).json({ ok: true });

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      // For fastest testing use Resend's sandbox sender:
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO,       // <-- your Gmail from the env var
      reply_to: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Server error" });
  }
};
