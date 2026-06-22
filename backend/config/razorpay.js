const Razorpay = require("razorpay");

function isRazorpayConfigured() {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

function createRazorpayClient() {
  if (!isRazorpayConfigured()) {
    return null;
  }

  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

module.exports = {
  createRazorpayClient,
  isRazorpayConfigured,
};