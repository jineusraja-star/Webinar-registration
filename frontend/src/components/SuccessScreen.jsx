import React from "react";

const SuccessScreen = ({ registrantName, paymentId, personalEmail }) => (
  <div
    style={{
      padding: 32,
      background: "linear-gradient(180deg, rgba(19, 26, 51, 0.96), rgba(15, 19, 40, 0.96))",
      borderRadius: 20,
      border: "1px solid rgba(148, 163, 184, 0.16)",
      boxShadow: "0 24px 80px rgba(0, 0, 0, 0.35)",
    }}
  >
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 999,
        background: "rgba(16, 185, 129, 0.1)",
        color: "#6ee7b7",
        border: "1px solid rgba(16, 185, 129, 0.2)",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      Registration complete
    </div>
    <h2 style={{ margin: "16px 0 10px", fontSize: 30, fontFamily: "Space Grotesk, sans-serif" }}>
      You're in, {registrantName || "participant"}.
    </h2>
    <p style={{ margin: 0, color: "#8fa0bc", lineHeight: 1.7 }}>
      Your booking is confirmed. We have recorded your payment and will send the workshop access details to {personalEmail || "your email"}.
    </p>
    <div
      style={{
        marginTop: 24,
        padding: 16,
        borderRadius: 14,
        background: "rgba(99, 102, 241, 0.08)",
        border: "1px solid rgba(99, 102, 241, 0.16)",
      }}
    >
      <div style={{ fontSize: 12, color: "#8fa0bc", marginBottom: 6 }}>Payment reference</div>
      <div style={{ fontFamily: "monospace", fontSize: 14, color: "#e5eefb", wordBreak: "break-word" }}>
        {paymentId}
      </div>
    </div>
  </div>
);

export default SuccessScreen;