// /api/contact.js  (CommonJS for Vercel)
const { Resend } = require("resend");

module.exports = async (req, res) => {
  // Only allow POST
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end(JSON.stringify({ error: "Method not allowed" }));
  }

  // Parse JSON body (Vercel Node doesn't auto-parse)
  let raw = "";
  for await (const chunk of req) raw += chunk;
  const { name, email, message, website } = JSON.parse(raw || "{}");

  // Honeypot (optional)
  if (website) return res.end(JSON.stringify({ ok: true }));

  if (!name || !email || !message) {
    res.statusCode = 400;
    return res.end(JSON.stringify({ error: "Missing fields" }));
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      // use sandbox sender for quickest test; change to your verified domain later
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO,         // your Gmail from env var
      reply_to: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    res.statusCode = 200;
    return res.end(JSON.stringify({ ok: true }));
  } catch (e) {
    res.statusCode = 500;
    return res.end(JSON.stringify({ error: e.message || "Server error" }));
  }
};
