import React, { useState } from "react";
import StepIndicator from "../components/StepIndicator";
import FormField from "../components/FormField";
import SuccessScreen from "../components/SuccessScreen";
import { initiatePayment } from "../utils/razorpay";
import ratulSur from "../image/be6a1fe2-3edb-47f2-8247-e1607c2c7166.jpg";


const DOMAIN_OPTIONS = [
  { value: "Equity Research & Investment Banking (The Analyst Track)", label: "Equity Research & Investment Banking (The Analyst Track)" },
  { value: "Modern Wealth Management (Client Advisor Track)", label: "Modern Wealth Management (Client Advisor Track)" },
  { value: "Data Science & AI for BFSI (The Techno-Finance Track)", label: "Data Science & AI for BFSI (The Techno-Finance Track)" },
  { value: "FinTech & Algorithmic Trading (The Innovator Track)", label: "FinTech & Algorithmic Trading (The Innovator Track)" },
  { value: "ESG & Digital Compliance (The Governance Track)", label: "ESG & Digital Compliance (The Governance Track)" },
  { value: "Commercial Banking & Credit Analytics", label: "Commercial Banking & Credit Analytics" },
  { value: "Other", label: "Other" },
];

const BACKGROUND_LAYERS = [
  { value: "Student", label: "Student" },
  { value: "Fresher", label: "Fresher" },
  { value: "Faculty", label: "Faculty" },
  { value: "Recent Graduate", label: "Recent Graduate" },
  { value: "Working Professional", label: "Working Professional" },
  {value: "MBA/PGDM Student", label: "MBA/PGDM Student" },
  { value: "Freelancer", label: "Freelancer" },
  { value: "Business Owner", label: "Business Owner" },
  {value: "Other", label: "Other" },
];

const WORKSHOP_FEE = Number(import.meta.env.VITE_WORKSHOP_FEE || 399);
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const INITIAL_FORM = {
  fullName: "",
  personalEmail: "",
  phoneNumber: "",
  city: "",
  currentStatus: "",
  collegeName: "",
  interestedDomain: "",
};

const STEPS = {
  1: { title: "Personal Information", subtitle: "Let us know who you are" },
  2: { title: "Academic Background", subtitle: "Tell us about your studies" },
  3: { title: "Complete Your Booking", subtitle: "Secure your workshop slot" },
};

const validateStep = (step, form) => {
  const errors = {};
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (step === 1) {
    if (!form.fullName.trim()) errors.fullName = "Full name is required.";
    else if (form.fullName.trim().length < 3) errors.fullName = "Enter your full name.";
    if (!form.personalEmail.trim()) errors.personalEmail = "Email is required.";
    else if (!emailRx.test(form.personalEmail)) errors.personalEmail = "Enter a valid email address.";
    if (!form.phoneNumber.trim()) errors.phoneNumber = "Phone number is required.";
    else if (form.phoneNumber.trim().length < 10) errors.phoneNumber = "Enter a valid phone number.";
  }

  if (step === 2) {
    if (!form.city.trim()) errors.city = "City is required.";
    if (!form.currentStatus) errors.currentStatus = "Please select your current status.";
    if (!form.collegeName.trim()) errors.collegeName = "Institute or organization  name is required.";
        if (!form.interestedDomain) errors.interestedDomain = "Please select your interested domain.";
  }

  return errors;
};

const STATS = [
  { value: "350+", label: "live attendees" },
  { value: "90 min", label: "hands-on webinar" },
  { value: "1", label: "live AI demo" },
];

const LandingRail = () => (
  <div style={styles.leftContent}>
    <div style={styles.aiTag}>Live AI Webinar • AI Workshop 2026</div>
   <h1 style={styles.heroTitle}>
  The AI Revolution Has Already Started —
  <span style={styles.heroGradient}> Are You Ready?</span>
</h1>

<p style={styles.heroSub}>
  Join this exclusive workshop by Lindsey School of Business and learn the exact
  AI tools, techniques, and workflows used by modern professionals to work
  smarter, faster, and more efficiently.
  <br /><br />
  ✨ Turn Data into Insights<br />
  ✨ Automate Repetitive Work<br />
  ✨ Create Reports & Dashboards in Minutes<br />
  ✨ Boost Productivity with AI
  <br /><br />
  🎓 Includes Certificate of Participation
  <br />
  ⚡ <strong>Limited Seats Only – Registration Closes Once Capacity Is Reached.</strong>
  <br />
  Complete the form below and upload your payment screenshot to reserve your seat.
</p>

    <div style={styles.heroPills}>
      {STATS.map((stat) => (
        <div key={stat.label} style={styles.statCard}>
          <div style={styles.statValue}>{stat.value}</div>
          <div style={styles.statLabel}>{stat.label}</div>
        </div>
      ))}
    </div>

    <div style={styles.featureGrid}>
      {[
        ["Live webinar", "Interactive session with Q&A"],
        ["Hands-on demo", "Prompting, AI tools, and workflow examples"],
        ["Certificate", "Participation certificate after completion"],
      ].map(([title, text]) => (
        <div key={title} style={styles.featureCard}>
          <div style={styles.featureTitle}>{title}</div>
          <div style={styles.featureText}>{text}</div>
        </div>
      ))}
    </div>

    <div style={styles.hostCard}>
      <div style={styles.hostPhotoWrap}>
        <div style={styles.hostPhotoGlow} />
        <div style={styles.hostIllustration}>
          <span style={styles.illustrationOrbA} />
          <span style={styles.illustrationOrbB} />
          <span style={styles.illustrationOrbC} />
          <div style={styles.illustrationGrid} />
        </div>
        <img
          src={ratulSur}
          alt="Ratul Sur"
          style={styles.hostPhoto}
        />
      </div>
      <div style={{ flex: 1 }}>
        <div style={styles.hostLabel}>Mentor</div>
        <div style={styles.hostName}> Ratul Sur </div>
        <div style={styles.hostRole}>(UGC-NET Qualified PhD Scholar) · Product Mentor · Prompting Coach</div>
        <p style={styles.hostBio}>
          6+ years building real-world AI solutions across analytics, LLMs & machine learning. PhD Scholar in Consumer Analytics · UGC-NET Qualified. 
PhD Scholar in Consumer Analytics. Product mentor for startups and aspiring professionals. Guest lecturer at leading business schools. Passionate about demystifying AI and making it accessible for all.
        </p>
        <div style={styles.coHostMetaRow}>
        <div style={styles.coHostMetaItem}>
          <span style={styles.coHostMetaValue}>10+</span>
          <span style={styles.coHostMetaLabel}>student projects</span>
        </div>
        <div style={styles.coHostMetaDivider} />
        <div style={styles.coHostMetaItem}>
          <span style={styles.coHostMetaValue}>Live</span>
          <span style={styles.coHostMetaLabel}>demo support</span>
        </div>
      </div>
      </div>
    </div>

    <div style={styles.coHostCard}>
      <div style={styles.coHostTopRow}>
        <div>
          <div style={styles.coHostLabel}>Host</div>
          <div style={styles.coHostName}>Anushka</div>
          <div style={styles.coHostRole}>Marketing Specialist · AI Enthusiast</div>
        </div>
      </div>
      <div style={styles.coHostBody}>
Anushka is a marketing specialist with a passion for AI and its transformative potential. With experience in digital marketing and a keen interest in emerging technologies, she is dedicated to helping professionals understand and leverage AI for growth and innovation. Anushka is excited to co-host this workshop and guide participants on their AI journey.
      </div>
      
    </div>
  </div>
);

const RegistrationPage = () => {
  const [step, setStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [paymentStatus, setPaymentStatus] = useState("idle");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [paymentError, setPaymentError] = useState("");
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");
  const [consents, setConsents] = useState({
  consent1: false,
  consent2: false,
});

const allConsentsAccepted =
  consents.consent1 &&
  consents.consent2;

  const paymentId = paymentDetails?.paymentId || null;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({ ...previous, [name]: value }));

    if (errors[name]) {
      setErrors((previous) => ({ ...previous, [name]: "" }));
    }
  };

  const handleNext = () => {
    const stepErrors = validateStep(step, form);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setErrors({});
    setCompletedSteps((previous) => [...new Set([...previous, step])]);
    setStep((currentStep) => currentStep + 1);
  };

  const handleBack = () => {
    setStep((currentStep) => currentStep - 1);
    setErrors({});
  };

  const handlePay = () => {
    setPaymentStatus("loading");
    setPaymentError("");

    initiatePayment(
      form,
      (details) => {
        setPaymentDetails(details);
        setPaymentStatus("paid");
      },
      (message) => {
        setPaymentError(message);
        setPaymentStatus("error");
      }
    );
  };

  const handleSubmit = async () => {
    if (!paymentDetails) {
      return;
    }

    setSubmitStatus("loading");
    setSubmitError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/registration/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          payment: paymentDetails,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Submission failed.");
      }

      setSubmitStatus("success");
    } catch (error) {
      setSubmitError(error.message || "Submission failed. Please contact support.");
      setSubmitStatus("error");
    }
  };

  if (submitStatus === "success") {
    return (
      <div style={styles.pageShell}>
        <BackgroundLayers />
        <div style={styles.layout}>
          <section style={styles.leftRail}>
            <LandingRail />
          </section>
          <main style={styles.rightRail}>
            <div style={styles.card}>
                <div style={styles.eventStrip}>
                  <div style={styles.eventStripLeft}>
                    <span style={styles.eventPill}>Live on campus</span>
                    <span style={styles.eventText}>AI Workshop Webinar • Interactive demo • Q&amp;A</span>
                  </div>
                  <div style={styles.eventStripRight}>Registration open now</div>
                </div>
              <SuccessScreen
                registrantName={form.fullName}
                paymentId={paymentId}
                personalEmail={form.personalEmail}
              />
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageShell}>
      <BackgroundLayers />

      <div style={styles.layout}>
        <aside style={styles.leftRail}>
          <LandingRail />
        </aside>

        <main style={styles.rightRail}>
        <div style={styles.card}>
          <div style={styles.eventStrip}>
            <div style={styles.eventStripLeft}>
              <span style={styles.eventPill}>Live on campus</span>
              <span style={styles.eventText}>AI Productivity System for Modern Professionals • Interactive demo • Q&amp;A</span>
            </div>
            <div style={styles.eventStripRight}>Registration open now</div>
          </div>
          <div style={styles.stepSection}>
            <StepIndicator currentStep={step} completedSteps={completedSteps} />
          </div>

          <div style={styles.stepHeader}>
            <div style={styles.stepBadge}>Step {step} of 3</div>
            <h2 style={styles.stepTitle}>{STEPS[step].title}</h2>
            <p style={styles.stepSubtitle}>{STEPS[step].subtitle}</p>
          </div>

          {step === 1 && (
            <div style={styles.fieldsGrid}>
              <div style={{ gridColumn: "1 / -1" }}>
                <FormField
                  label="Full Name"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="e.g. Arjun Sharma"
                  error={errors.fullName}
                  required
                />
              </div>
              <FormField
                label="Email ID"
                name="personalEmail"
                type="email"
                value={form.personalEmail}
                onChange={handleChange}
                placeholder="yourname@gmail.com"
                error={errors.personalEmail}
                required
                hint="Confirmation email will be sent here."
              />
              <FormField
                label= "Phone Number"
                name="phoneNumber"
                type="tel"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                error={errors.phoneNumber}
                required
              />
            </div>
          )}

          {step === 2 && (
            <div style={styles.fieldsGrid}>
              <div style={{ gridColumn: "1 / -1" }}>
                <FormField
                  label="City"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai, Delhi"
                  error={errors.city}
                  required
                />
              <FormField
                label="Current Status"
                name="currentStatus"
                type="select"
                value={form.currentStatus}
                onChange={handleChange}
                placeholder="Select your current status"
                error={errors.currentStatus}
                options={BACKGROUND_LAYERS}
                required
              />
              <FormField
                label="Institute/ organization Name"
                name="collegeName"
                value={form.collegeName}
                onChange={handleChange}
                  error={errors.collegeName}
                  required
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <FormField
                  label="Interested Domain in AI"
                  name="interestedDomain"
                  type="select"
                  value={form.interestedDomain}
                  onChange={handleChange}
                  placeholder="Select your area of interest"
                  error={errors.interestedDomain}
                  options={DOMAIN_OPTIONS}
                  required
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={styles.paymentSection}>
              <div style={styles.summaryCard}>
                <div style={styles.summaryTitle}>Registration Summary</div>
                {[
                  ["Name", form.fullName],
                  ["Institute/ organization", form.collegeName],
                  ["Domain", form.interestedDomain],
                  ["Personal Email", form.personalEmail],
                ].map(([label, value]) => (
                  <div key={label} style={styles.summaryRow}>
                    <span style={styles.summaryLabel}>{label}</span>
                    <span style={styles.summaryValue}>{value}</span>
                  </div>
                ))}
              </div>

              <div style={styles.priceCard}>
                <div style={styles.priceLeft}>
                  <div style={styles.priceName}>AI Workshop 2025</div>
                  <div style={styles.priceDesc}>Full access, certificate, and resources</div>
                </div>
                <div style={styles.priceAmount}>₹{WORKSHOP_FEE}</div>
              </div>
              <div
  style={{
    background: "rgba(11, 26, 16, 0.96)",
    border: "1px solid rgba(250,250,240,0.10)",
    borderRadius: "16px",
    padding: "18px 20px",
    marginTop: "12px",
  }}
>
  <h4 style={{ marginBottom: "12px", color: "#0d5e17" }}>
    Privacy & Consent
  </h4>

  <label
    style={{
      display: "flex",
      gap: "10px",
      marginBottom: "12px",
      alignItems: "flex-start",
      cursor: "pointer",
    }}
  >
    <input
      type="checkbox"
      checked={consents.consent1}
      onChange={(e) =>
        setConsents({
          ...consents,
          consent1: e.target.checked,
        })
      }
    />
    <span>
      I understand that my submitted information will be securely used for
      workshop registration, communication, certification, and future learning
      updates related to this event. My information will be kept confidential
      and protected.
    </span>
  </label>

  <label
    style={{
      display: "flex",
      gap: "10px",
      marginBottom: "12px",
      alignItems: "flex-start",
      cursor: "pointer",
    }}
  >
    <input
      type="checkbox"
      checked={consents.consent2}
      onChange={(e) =>
        setConsents({
          ...consents,
          consent2: e.target.checked,
        })
      }
    />
    <span>
      I understand that seats are limited. I may be accommodated in the
      subsequent batch if the seats fill up.
    </span>
  </label>

  <label
    style={{
      display: "flex",
      gap: "10px",
      alignItems: "flex-start",
      cursor: "pointer",
    }}
  >
    <input
      type="checkbox"
      checked={consents.consent3}
      onChange={(e) =>
        setConsents({
          ...consents,
          consent3: e.target.checked,
        })
      }
    />
    <span>
      I understand that my registration is strictly provisional. If my payment
      is not successfully verified, my registration may be cancelled.
    </span>
  </label>
</div>

{!allConsentsAccepted && (
  <div
    style={{
      color: "#dc2626",
      fontSize: "13px",
      fontWeight: "600",
      textAlign: "center",
      marginTop: "10px",
    }}
  >
    Please accept all Privacy & Consent declarations to continue.
  </div>
)}

              {paymentStatus === "idle" && (
                
                <button
  onClick={handlePay}
  disabled={!allConsentsAccepted}
  style={{
    ...styles.payBtn,
    opacity: allConsentsAccepted ? 1 : 0.5,
    cursor: allConsentsAccepted ? "pointer" : "not-allowed",
  }}
>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ marginRight: 8 }}>
                    <rect x="1" y="4" width="18" height="13" rx="2" stroke="white" strokeWidth="1.5" />
                    <path d="M1 8H19" stroke="white" strokeWidth="1.5" />
                  </svg>
                  Pay ₹{WORKSHOP_FEE} to secure slot
                </button>
              )}

              {paymentStatus === "loading" && (
                <div style={styles.payLoading}>
                  <div style={styles.spinner} className="spinner" />
                  Opening payment gateway...
                </div>
              )}

              {paymentStatus === "error" && (
                <>
                  <div style={styles.errorBanner}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" stroke="#f43f5e" strokeWidth="1.5" />
                      <path d="M8 5V8.5" stroke="#f43f5e" strokeWidth="1.5" strokeLinecap="round" />
                      <circle cx="8" cy="11" r="0.8" fill="#f43f5e" />
                    </svg>
                    {paymentError}
                  </div>
                  <button onClick={handlePay} style={styles.payBtn}>
                    Retry Payment
                  </button>
                </>
              )}

              {paymentStatus === "paid" && (
                <>
                  <div style={styles.successBanner}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="7" fill="rgba(16,185,129,0.2)" stroke="#10b981" strokeWidth="1.5" />
                      <path d="M5 8L7 10L11 6" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Payment successful! ID: <span style={{ fontFamily: "monospace", fontSize: 11 }}>{paymentId}</span>
                  </div>

                  {submitStatus === "error" && <div style={styles.errorBanner}>{submitError}</div>}

                  <button
                    onClick={handleSubmit}
                    disabled={submitStatus === "loading"}
                    style={{
                      ...styles.submitBtn,
                      opacity: submitStatus === "loading" ? 0.7 : 1,
                    }}
                  >
                    {submitStatus === "loading" ? (
                      <>
                        <div style={{ ...styles.spinner, borderTopColor: "#fff" }} className="spinner" />
                        Submitting registration...
                      </>
                    ) : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ marginRight: 8 }}>
                          <path d="M3 9L7 13L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Complete Registration
                      </>
                    )}
                  </button>
                </>
              )}
            </div>
          )}

          <div style={styles.navRow}>
            {step > 1 && (
              <button onClick={handleBack} style={styles.backBtn}>
                Back
              </button>
            )}

            {step < 3 && (
              <button onClick={handleNext} style={{ ...styles.nextBtn, marginLeft: step === 1 ? "auto" : undefined }}>
                Continue
              </button>
            )}
          </div>
        </div>
        <div style={styles.rightExtras}>
          <div style={styles.compactCard}>
            <div style={styles.demoHeader}>
              <div>
                <div style={styles.demoLabel}>AI demo preview</div>
                <div style={styles.demoTitle}>Prompt to product flow</div>
              </div>
              <div style={styles.demoBadge}>Live</div>
            </div>
            <div style={styles.demoChat}>
              <div style={styles.chatBubbleUser}>Show me how a student can build a campus assistant.</div>
              <div style={styles.chatBubbleAi}>Use a simple RAG pipeline, keep the prompt focused, and start with a small document set.</div>
            </div>
            <div style={styles.demoWaveRow}>
              <span style={{ ...styles.demoWave, animationDelay: "0s" }} />
              <span style={{ ...styles.demoWave, animationDelay: "0.14s" }} />
              <span style={{ ...styles.demoWave, animationDelay: "0.28s" }} />
              <span style={{ ...styles.demoWave, animationDelay: "0.42s" }} />
            </div>
          </div>

          <div style={styles.compactCard}>
            <div style={styles.agendaTitle}>What the webinar covers</div>
            <div style={styles.agendaList}>
              <div style={styles.agendaItem}>How AI systems are trained and evaluated</div>
              <div style={styles.agendaItem}>Where generative AI fits into real products</div>
              <div style={styles.agendaItem}>Career paths, projects, and next steps</div>
            </div>
          </div>
        </div>
        </main>
      </div>
    </div>
  );
};

const BackgroundLayers = () => (
  <>
    <div style={styles.bgGrid} />
    <div style={styles.bgOrbOne} />
    <div style={styles.bgOrbTwo} />
    <div style={styles.bgOrbThree} />
  </>
);

const styles = {
  page: {
    minHeight: "100vh",
    paddingBottom: 80,
  },
  hero: {
    padding: "64px 24px 48px",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },
  heroGlow: {
    position: "absolute",
    top: -80,
    left: "50%",
    transform: "translateX(-50%)",
    width: 600,
    height: 400,
    borderRadius: "50%",
    background: "radial-gradient(ellipse, rgba(13,94,23,0.14) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  aiTag: {
    display: "inline-block",
    background: "rgba(13,94,23,0.10)",
    border: "1px solid rgba(13,94,23,0.18)",
    color: "#e8c126",
    borderRadius: 20,
    padding: "6px 18px",
    fontSize: 13,
    fontWeight: 600,
    letterSpacing: "0.5px",
    marginBottom: 20,
    fontFamily: "Space Grotesk, sans-serif",
  },
  heroTitle: {
    fontSize: "clamp(28px, 5vw, 52px)",
    fontWeight: 800,
    color: "#e8c126",
    lineHeight: 1.15,
    marginBottom: 16,
    letterSpacing: "-1px",
    fontFamily: "Space Grotesk, sans-serif",
  },
  heroGradient: {
    background: "linear-gradient(135deg, #e8c126, #f9d44e, #fff080)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSub: {
    fontSize: 16,
    color: "#f9faf0",
    marginBottom: 24,
    lineHeight: 1.6,
  },
  heroPills: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  pageShell: {
    padding: "28px 18px 48px",
    position: "relative",
    overflow: "hidden",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #07150c 0%, #0a1b11 0%, #102615 0%)",
  },
  bgGrid: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(250,250,240,0.08) 2px, transparent 2px), linear-gradient(90deg, rgba(250,250,240,0.08) 1px, transparent 1px)",
    backgroundSize: "70px 56px",
    maskImage: "radial-gradient(circle at center, black 38%, transparent 100%)",
    pointerEvents: "none",
    opacity: 0.55,
  },
  bgOrbOne: {
    position: "fixed",
    top: -120,
    left: -80,
    width: 420,
    height: 420,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(13,94,23,0.34) 0%, rgba(13,94,23,0.10) 35%, transparent 72%)",
    filter: "blur(10px)",
    pointerEvents: "none",
  },
  bgOrbTwo: {
    position: "fixed",
    top: 100,
    right: -120,
    width: 520,
    height: 520,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(46, 160, 59, 0.28) 0%, rgba(46, 160, 59, 0.10) 40%, transparent 72%)",
    filter: "blur(12px)",
    pointerEvents: "none",
  },
  bgOrbThree: {
    position: "fixed",
    bottom: -180,
    left: "38%",
    width: 620,
    height: 620,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(250,250,240,0.08) 0%, rgba(250,250,240,0.03) 42%, transparent 74%)",
    filter: "blur(18px)",
    pointerEvents: "none",
  },
  layout: {
    position: "relative",
    zIndex: 1,
    maxWidth: 1360,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "minmax(280px, 0.95fr) minmax(0, 1.15fr)",
    gap: 24,
    alignItems: "start",
  },
  leftRail: {
    position: "sticky",
    top: 24,
    alignSelf: "start",
  },
  rightRail: {
    minWidth: 0,
  },
  leftContent: {
    padding: "18px 6px 18px 6px",
  },
  featureGrid: {
    display: "grid",
    gap: 12,
    marginTop: 24,
    marginBottom: 22,
  },
  featureCard: {
    padding: 16,
    borderRadius: 18,
    background: "rgba(8, 24, 15, 0.84)",
    border: "1px solid rgba(250,250,240,0.10)",
    backdropFilter: "blur(14px)",
  },
  featureTitle: {
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: "#fafaf0",
    marginBottom: 4,
  },
  featureText: {
    fontSize: 13,
    color: "rgba(250,250,240,0.72)",
    lineHeight: 1.55,
  },
  hostCard: {
    display: "flex",
    gap: 16,
    alignItems: "center",
    padding: 18,
    borderRadius: 22,
    background: "linear-gradient(135deg, rgba(10, 31, 19, 0.98), rgba(6, 19, 12, 0.96))",
    border: "1px solid rgba(250,250,240,0.10)",
    boxShadow: "0 28px 72px rgba(0,0,0,0.44)",
    backdropFilter: "blur(16px)",
  },
  hostPhotoWrap: {
    position: "relative",
    width: 92,
    height: 92,
    flexShrink: 0,
  },
  hostPhotoGlow: {
    position: "absolute",
    inset: -10,
    borderRadius: "50%",
    background: "radial-gradient(circle, rgba(250,250,240,0.10) 0%, transparent 72%)",
  },
  hostIllustration: {
    position: "absolute",
    inset: -22,
    borderRadius: "50%",
    overflow: "hidden",
    background: "radial-gradient(circle at 30% 30%, rgba(13,94,23,0.20), transparent 40%), radial-gradient(circle at 70% 70%, rgba(250,250,240,0.08), transparent 42%)",
    border: "1px solid rgba(250,250,240,0.06)",
    animation: "floatIn 6s ease-in-out infinite",
    pointerEvents: "none",
  },
  illustrationGrid: {
    position: "absolute",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
    backgroundSize: "14px 14px",
    maskImage: "radial-gradient(circle at center, black 38%, transparent 75%)",
    opacity: 0.45,
  },
  illustrationOrbA: {
    position: "absolute",
    top: 16,
    left: 10,
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: "rgba(250,250,240,0.86)",
    boxShadow: "0 0 20px rgba(250,250,240,0.40)",
    animation: "pulseBar 1.8s ease-in-out infinite",
  },
  illustrationOrbB: {
    position: "absolute",
    right: 10,
    top: 28,
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "rgba(46,160,59,0.82)",
    boxShadow: "0 0 16px rgba(46,160,59,0.40)",
    animation: "pulseBar 2.1s ease-in-out infinite",
  },
  illustrationOrbC: {
    position: "absolute",
    left: 28,
    bottom: 14,
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "rgba(13,94,23,0.96)",
    boxShadow: "0 0 14px rgba(13,94,23,0.52)",
    animation: "pulseBar 1.6s ease-in-out infinite",
  },
  hostPhoto: {
    position: "relative",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center top",
    border: "1px solid rgba(250,250,240,0.14)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.40)",
  },
  hostLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "#d7f0cf",
    marginBottom: 6,
  },
  hostName: {
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: 20,
    fontWeight: 800,
    color: "#fafaf0",
    marginBottom: 4,
  },
  hostRole: {
    fontSize: 13,
    color: "rgba(250,250,240,0.82)",
    marginBottom: 10,
  },
  hostBio: {
    margin: 0,
    fontSize: 13,
    lineHeight: 1.65,
    color: "rgba(250,250,240,0.76)",
  },
  coHostCard: {
    marginTop: 14,
    padding: 18,
    borderRadius: 22,
    background: "linear-gradient(180deg, rgba(12, 33, 20, 0.96), rgba(8, 24, 15, 0.98))",
    border: "1px solid rgba(250,250,240,0.10)",
    backdropFilter: "blur(14px)",
  },
  coHostTopRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 10,
  },
  coHostLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "#fafaf0",
    marginBottom: 5,
  },
  coHostName: {
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: 17,
    fontWeight: 800,
    color: "#fafaf0",
    marginBottom: 3,
  },
  coHostRole: {
    fontSize: 13,
    color: "rgba(250,250,240,0.78)",
  },
  coHostBadge: {
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(250,250,240,0.10)",
    border: "1px solid rgba(250,250,240,0.14)",
    color: "#fafaf0",
    fontSize: 11,
    fontWeight: 700,
  },
  coHostBody: {
    color: "rgba(250,250,240,0.80)",
    fontSize: 13,
    lineHeight: 1.65,
  },
  coHostMetaRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 14,
  },
  coHostMetaItem: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  coHostMetaValue: {
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: 16,
    fontWeight: 800,
    color: "#fafaf0",
  },
  coHostMetaLabel: {
    fontSize: 11,
    color: "rgba(250,250,240,0.74)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
  },
  coHostMetaDivider: {
    width: 1,
    height: 28,
    background: "rgba(250,250,240,0.14)",
  },
  agendaCard: {
    marginTop: 16,
    padding: 18,
    borderRadius: 22,
    background: "linear-gradient(180deg, rgba(11, 26, 16, 0.96), rgba(7, 18, 11, 0.98))",
    border: "1px solid rgba(250,250,240,0.10)",
    backdropFilter: "blur(14px)",
  },
  agendaTitle: {
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: 14,
    fontWeight: 700,
    color: "#fafaf0",
    marginBottom: 12,
  },
  agendaList: {
    display: "grid",
    gap: 10,
  },
  agendaItem: {
    position: "relative",
    paddingLeft: 18,
    color: "rgba(250,250,240,0.76)",
    fontSize: 13,
    lineHeight: 1.6,
  },
  cardWrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "0 16px",
  },
  card: {
background: `linear-gradient(
  135deg,
  #e8c126 0%,
  #6a7b3c 35%,
  #999563 70%,
  #94f56d 100%
)`, 
   border: "1px solid rgba(13,94,23,0.12)",
    borderRadius: 24,
    overflow: "hidden",
    boxShadow: "0 24px 80px rgba(0,0,0,0.12)",
  },
  stepSection: {
    padding: "28px 32px 20px",
    borderBottom: "1px solid rgba(13,94,23,0.12)",
    background: "rgba(13,94,23,0.04)",
  },
  stepHeader: {
    padding: "28px 32px 20px",
    borderBottom: "1px solid rgba(13,94,23,0.12)",
  },
  stepBadge: {
    display: "inline-block",
    background: "rgba(13,94,23,0.10)",
    border: "1px solid rgba(13,94,23,0.18)",
    color: "#d7f0cf",
    borderRadius: 8,
    padding: "3px 10px",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: 10,
    fontFamily: "Space Grotesk, sans-serif",
  },
  stepTitle: {
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: 22,
    fontWeight: 800,
    color: "#0d5e17",
    marginBottom: 4,
  },
  stepSubtitle: {
    fontSize: 14,
    color: "rgba(250,250,240,0.76)",
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 12,
    marginTop: 26,
    marginBottom: 18,
  },
  statCard: {
    padding: 16,
    borderRadius: 18,
    background: "linear-gradient(180deg, rgba(241,247,237,0.96), rgba(250,250,240,0.96))",
    border: "1px solid rgba(13,94,23,0.12)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
    animation: "floatIn 4.2s ease-in-out infinite",
  },
  statValue: {
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: 24,
    fontWeight: 800,
    color: "#0d5e17",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#35583a",
    lineHeight: 1.45,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  fieldsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20,
    padding: "28px 32px",
  },
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 32px 28px",
    borderTop: "1px solid rgba(13,94,23,0.12)",
  },
  backBtn: {
    background: "transparent",
    border: "1.5px solid rgba(13,94,23,0.14)",
    borderRadius: 10,
    color: "#35583a",
    padding: "10px 20px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    fontFamily: "Space Grotesk, sans-serif",
  },
  nextBtn: {
    background: "linear-gradient(135deg, #0d5e17, #177d23, #2da63c)",
    border: "none",
    borderRadius: 10,
    color: "#fff",
    padding: "11px 28px",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "Space Grotesk, sans-serif",
    boxShadow: "0 12px 32px rgba(13,94,23,0.20)",
    marginLeft: "auto",
  },
  paymentSection: {
    padding: "28px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
  summaryCard: {
    background: "rgba(250,250,240,0.96)",
    border: "1px solid rgba(13,94,23,0.12)",
    borderRadius: 16,
    padding: "18px 20px",
  },
  summaryTitle: {
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "1.2px",
    textTransform: "uppercase",
    color: "#0d5e17",
    marginBottom: 12,
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "8px 0",
    borderBottom: "1px solid rgba(13,94,23,0.10)",
    fontSize: 13,
    gap: 12,
  },
  summaryLabel: { color: "#35583a", flexShrink: 0 },
  summaryValue: { color: "#0d5e17", textAlign: "right", fontWeight: 600, wordBreak: "break-word", maxWidth: "60%" },
  priceCard: {
    background: "linear-gradient(135deg, rgba(13,94,23,0.06), rgba(13,94,23,0.12))",
    border: "1px solid rgba(13,94,23,0.12)",
    borderRadius: 16,
    padding: "18px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceLeft: {},
  priceName: {
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: 16,
    fontWeight: 700,
    color: "#0d5e17",
    marginBottom: 4,
  },
  priceDesc: { fontSize: 12, color: "#35583a" },
  priceAmount: {
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: 28,
    fontWeight: 800,
    background: "linear-gradient(135deg, #0d5e17, #177d23, #2da63c)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  payBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0d5e17, #177d23, #2da63c)",
    border: "none",
    borderRadius: 12,
    color: "#fff",
    padding: "14px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "Space Grotesk, sans-serif",
    boxShadow: "0 14px 36px rgba(13,94,23,0.20)",
    width: "100%",
  },
  payLoading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    padding: "14px",
    color: "#35583a",
    fontSize: 14,
  },
  spinner: {
    width: 18,
    height: 18,
    border: "2px solid rgba(13,94,23,0.2)",
    borderTop: "2px solid #0d5e17",
    borderRadius: "50%",
  },
  errorBanner: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(13,94,23,0.06)",
    border: "1px solid rgba(13,94,23,0.12)",
    borderRadius: 10,
    padding: "12px 14px",
    color: "#0d5e17",
    fontSize: 13,
  },
  successBanner: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    background: "rgba(13,94,23,0.08)",
    border: "1px solid rgba(13,94,23,0.16)",
    borderRadius: 10,
    padding: "12px 14px",
    color: "#0d5e17",
    fontSize: 13,
    flexWrap: "wrap",
  },
  submitBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #0d5e17, #177d23, #2da63c)",
    border: "none",
    borderRadius: 12,
    color: "#fff",
    padding: "14px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "Space Grotesk, sans-serif",
    boxShadow: "0 14px 36px rgba(13,94,23,0.20)",
    width: "100%",
  },
  demoCard: {
    marginTop: 16,
    padding: 18,
    borderRadius: 22,
    background: "linear-gradient(180deg, rgba(250,250,240,0.96), rgba(241,247,237,0.98))",
    border: "1px solid rgba(13,94,23,0.12)",
    backdropFilter: "blur(14px)",
    overflow: "hidden",
  },
  demoHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
    marginBottom: 12,
  },
  demoLabel: {
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.18em",
    color: "#0d5e17",
    marginBottom: 6,
  },
  demoTitle: {
    fontFamily: "Space Grotesk, sans-serif",
    fontSize: 16,
    fontWeight: 800,
    color: "#0d5e17",
  },
  demoBadge: {
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(13,94,23,0.10)",
    border: "1px solid rgba(13,94,23,0.18)",
    color: "#0d5e17",
    fontSize: 11,
    fontWeight: 700,
  },
  demoChat: {
    display: "grid",
    gap: 10,
  },
  chatBubbleUser: {
    justifySelf: "end",
    maxWidth: "88%",
    padding: "10px 12px",
    borderRadius: "16px 16px 4px 16px",
    background: "rgba(13,94,23,0.08)",
    border: "1px solid rgba(13,94,23,0.12)",
    color: "#0d5e17",
    fontSize: 13,
    lineHeight: 1.5,
  },
  chatBubbleAi: {
    justifySelf: "start",
    maxWidth: "92%",
    padding: "10px 12px",
    borderRadius: "16px 16px 16px 4px",
    background: "rgba(240,248,236,0.98)",
    border: "1px solid rgba(13,94,23,0.12)",
    color: "#35583a",
    fontSize: 13,
    lineHeight: 1.55,
  },
  demoWaveRow: {
    display: "flex",
    gap: 6,
    marginTop: 14,
    alignItems: "flex-end",
  },
  demoWave: {
    width: 8,
    height: 18,
    borderRadius: 999,
    background: "linear-gradient(180deg, #0d5e17, #46b55b)",
    animation: "pulseBar 1.2s ease-in-out infinite",
  },
  rightExtras: {
    display: "grid",
    gap: 16,
    marginTop: 16,
  },
  compactCard: {
    padding: 18,
    borderRadius: 22,
    background: "linear-gradient(180deg, rgba(11, 26, 16, 0.96), rgba(7, 18, 11, 0.98))",
    border: "1px solid rgba(250,250,240,0.10)",
    boxShadow: "0 18px 40px rgba(0,0,0,0.30)",
  },
  eventStrip: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "center",
    padding: "14px 18px",
    background: "linear-gradient(135deg, rgba(250,250,240,0.06), rgba(13,94,23,0.10))",
    borderBottom: "1px solid rgba(250,250,240,0.10)",
  },
  eventStripLeft: {
    display: "flex",
    flexWrap: "wrap",
    gap: 10,
    alignItems: "center",
  },
  eventPill: {
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(250,250,240,0.10)",
    color: "#fafaf0",
    border: "1px solid rgba(250,250,240,0.14)",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  eventText: {
    color: "rgba(250,250,240,0.78)",
    fontSize: 13,
    fontWeight: 600,
  },
  eventStripRight: {
    color: "#fafaf0",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
};

export default RegistrationPage;