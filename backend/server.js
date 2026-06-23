require("dotenv").config();

const fs = require("fs");
const path = require("path");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const paymentRoutes = require("./routes/payment");
const registrationRoutes = require("./routes/registration");

const app = express();
const PORT = Number(process.env.PORT || 5000);
const frontendBuildPath = path.resolve(__dirname, "../frontend/dist");

app.set("trust proxy", 1);

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.use("/api/payment", paymentRoutes);
app.use("/api/registration", registrationRoutes);

if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));

  app.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(frontendBuildPath, "index.html"));
  });
}

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

function startServer() {
  return app.listen(PORT, () => {
    console.log(`\nAI Workshop API running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
    console.log(`Workshop fee: ₹${Number(process.env.WORKSHOP_FEE || 49900) / 100}\n`);
  });
}

if (require.main === module) {
  startServer();
}

module.exports = { app, startServer };
