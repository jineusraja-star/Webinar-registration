import React from "react";

const steps = ["Personal", "Academic", "Payment"];

const StepIndicator = ({ currentStep, completedSteps = [] }) => {
  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
        {steps.map((label, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isComplete = completedSteps.includes(stepNumber) || currentStep > stepNumber;

          return (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  margin: "0 auto 8px",
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  background: isComplete
                    ? "linear-gradient(135deg, #10b981, #06b6d4)"
                    : isActive
                      ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
                      : "rgba(148, 163, 184, 0.12)",
                  color: isComplete || isActive ? "#ffffff" : "#8fa0bc",
                  border: "1px solid rgba(148, 163, 184, 0.18)",
                  fontWeight: 800,
                  fontSize: 13,
                }}
              >
                {isComplete ? "✓" : stepNumber}
              </div>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: isActive ? "#dbe7f7" : "#8fa0bc",
                }}
              >
                {label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;