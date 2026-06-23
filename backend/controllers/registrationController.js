const { appendRegistrationRow } = require("../utils/sheetsService");
const { sendConfirmationEmail } = require("../utils/emailService");
const { verifyPaymentSignature } = require("./paymentController");

function getWorkshopAmount() {
  const amount = Number(process.env.WORKSHOP_FEE || 399);
  return Number.isFinite(amount) && amount > 0 ? Math.round(amount) : 399;
}

function trimValue(value) {
  return String(value || "").trim();
}

async function submitRegistration(req, res, next) {
  try {
    console.log("===== REGISTRATION STARTED =====");

    verifyPaymentSignature(req.body.payment);
    console.log("✓ Payment verified");

    const record = {
      fullName: trimValue(req.body.fullName),
      personalEmail: trimValue(req.body.personalEmail),
      phoneNumber: trimValue(req.body.phoneNumber),
      city: trimValue(req.body.city),
      currentStatus: trimValue(req.body.currentStatus),
      collegeName: trimValue(req.body.collegeName),
      interestedDomain: trimValue(req.body.interestedDomain),
      paymentId: trimValue(req.body.payment?.paymentId),
      orderId: trimValue(req.body.payment?.orderId),
      paymentMode: trimValue(req.body.payment?.paymentMode || "razorpay"),
      amount: getWorkshopAmount(),
    };

    console.log("Saving data to Google Sheets...");

    const sheetResult = await appendRegistrationRow(record);

    console.log("✓ Google Sheet Success");
    console.log(sheetResult);

    let emailResult = { skipped: true };

    try {
      console.log("Sending confirmation email...");

      emailResult = await sendConfirmationEmail({
        to: record.personalEmail,
        name: record.fullName,
        paymentId: record.paymentId,
        amount: record.amount,
        mode: record.paymentMode,
      });

      console.log("✓ Email Sent Successfully");
      console.log(emailResult);
    } catch (emailError) {
      console.error("✗ Email Error:");
      console.error(emailError);
      console.warn("Confirmation email failed:", emailError.message);
    }

    console.log("✓ Registration Completed");

    res.status(201).json({
      success: true,
      message: "Registration completed successfully.",
      data: {
        registrationId: record.paymentId || `reg_${Date.now()}`,
        sheetResult,
        emailSent: !emailResult.skipped,
      },
    });
  } catch (error) {
    console.error("✗ REGISTRATION ERROR:");
    console.error(error);

    next(error);
  }
}

module.exports = {
  submitRegistration,
};