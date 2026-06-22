const nodemailer = require("nodemailer");

function isEmailConfigured() {
  return Boolean(
    process.env.EMAIL_HOST &&
      process.env.EMAIL_PORT &&
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS &&
      process.env.EMAIL_FROM
  );
}

function createTransport() {
  if (!isEmailConfigured()) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: String(process.env.EMAIL_SECURE || "false") === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

async function sendConfirmationEmail({ to, name, paymentId, amount, mode }) {
  if (!isEmailConfigured()) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Email service is not configured.");
    }

    return { skipped: true, reason: "Email credentials are missing." };
  }

  const transport = createTransport();
  await transport.verify();
console.log("SMTP connection successful");

  const workshopAmount = Number(amount || 0) / 100;
  

  const info = await transport.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: "AI Workshop Registration Confirmed",
    text: `Hello ${name}, your registration has been confirmed. Payment ID: ${paymentId}. Amount paid: INR ${workshopAmount}.`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin: 0 0 12px;">Registration Confirmed</h2>
        <p>Hello ${name},</p>
        <p>Your AI Workshop registration has been confirmed.</p>
        <ul>
          <li><strong>Payment ID:</strong> ${paymentId}</li>
          <li><strong>Amount:</strong> INR ${workshopAmount}</li>
          <li><strong>Payment mode:</strong> ${mode}</li>
        </ul>
        <p>We will share the event details and joining instructions soon.</p>
      </div>
    `,
  });

  

  return {
    skipped: false,
    messageId: info.messageId,
  };
}

module.exports = {
  sendConfirmationEmail,
};