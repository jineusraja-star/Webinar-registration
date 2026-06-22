const express = require("express");

const { submitRegistration } = require("../controllers/registrationController");
const { validateRegistrationRequest } = require("../middleware/validateRequest");

const router = express.Router();

router.post("/submit", validateRegistrationRequest, submitRegistration);

module.exports = router;