const crypto = require("crypto");

const { createRazorpayClient, isRazorpayConfigured } = require("../config/razorpay");

function getWorkshopAmount() {
  const amount = Number(process.env.WORKSHOP_FEE || 399);
  return Number.isFinite(amount) && amount > 0 ? Math.round(amount) : 399;
}

function createDemoOrder(amount, name) {
  const stamp = Date.now();

  return {
    success: true,
    mode: "demo",
    orderId: `demo_order_${stamp}`,
    amount,
    currency: "INR",
    keyId: null,
    name: "AI Workshop Registration",
    description: `Demo checkout for ${name || "your registration"}`,
    message: "Demo payment mode is active because Razorpay credentials are not configured.",
  };
}

async function createOrder(req, res, next) {
  try {
    const amount = Number(req.body.amount || getWorkshopAmount());
    const attendeeName = String(req.body.fullName || "Workshop attendee").trim();

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "A valid amount is required.",
      });
    }

    if (!isRazorpayConfigured()) {
      return res.json(createDemoOrder(amount, attendeeName));
    }

    const client = createRazorpayClient();
    const order = await client.orders.create({
  amount: amount * 100,
  currency: "INR",
  receipt: `reg_${Date.now()}`,
  notes: {
    attendeeName,
    personalEmail: String(req.body.personalEmail || ""),
  },
});

    return res.json({
      success: true,
      mode: "razorpay",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      name: "AI Workshop Registration",
      description: "Secure your workshop slot",
      prefill: {
        name: attendeeName,
        email: String(req.body.personalEmail || ""),
      },
    });
  } catch (error) {
    next(error);
  }
}

function verifyPaymentSignature(payment) {
  if (!payment || payment.paymentMode === "demo") {
    return { verified: true, mode: "demo" };
  }

  if (!process.env.RAZORPAY_KEY_SECRET) {
    const error = new Error("Razorpay secret is not configured.");
    error.statusCode = 500;
    throw error;
  }

  const payload = `${payment.orderId}|${payment.paymentId}`;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(payload)
    .digest("hex");

  if (
    !payment.signature ||
    payment.signature.length !== expectedSignature.length ||
    !crypto.timingSafeEqual(Buffer.from(payment.signature), Buffer.from(expectedSignature))
  ) {
    const error = new Error("Invalid payment signature.");
    error.statusCode = 400;
    throw error;
  }

  return { verified: true, mode: "razorpay" };
}

module.exports = {
  createOrder,
  verifyPaymentSignature,
};