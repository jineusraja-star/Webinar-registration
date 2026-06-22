function validateCreateOrder(req, res, next) {
  const amount = Number(req.body.amount || process.env.WORKSHOP_FEE || 49900);

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({
      success: false,
      message: "A valid payment amount is required.",
    });
  }

  req.body.amount = amount;
  next();
}

function validateRegistrationRequest(req, res, next) {
  const body = req.body || {};
  const requiredFields = [
    "fullName",
    "dob",
    "personalEmail",
    "collegeEmail",
    "collegeName",
    "course",
    "yearOfStudy",
    "aboutYourself",
    "interestedDomain",
  ];

  const missingFields = requiredFields.filter((field) => !String(body[field] || "").trim());

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Missing required registration fields.",
      missingFields,
    });
  }

  if (!body.payment || !String(body.payment.paymentId || "").trim()) {
    return res.status(400).json({
      success: false,
      message: "A verified payment payload is required.",
    });
  }

  next();
}

module.exports = {
  validateCreateOrder,
  validateRegistrationRequest,
};