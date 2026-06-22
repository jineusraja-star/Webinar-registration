# AI Workshop Registration System

Full-stack registration portal for an AI Workshop with Razorpay payment integration, Google Sheets response logging, and automated confirmation emails.

---

## 📁 Project Structure

```
ai-workshop-registration/
├── frontend/                  # React app (Vite)
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── FormField.jsx
│   │   │   ├── StepIndicator.jsx
│   │   │   └── SuccessScreen.jsx
│   │   ├── pages/
│   │   │   └── RegistrationPage.jsx   # Main form page
│   │   ├── styles/
│   │   │   └── global.css             # Global styles & CSS variables
│   │   ├── utils/
│   │   │   └── razorpay.js            # Razorpay payment handler
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/                   # Node.js + Express server
│   ├── config/
│   │   └── googleSheets.js    # Google Sheets API setup
│   ├── controllers/
│   │   ├── paymentController.js   # Razorpay order creation & verification
│   │   └── registrationController.js  # Save to Sheets + send email
│   ├── middleware/
│   │   └── validateRequest.js     # Input validation middleware
│   ├── routes/
│   │   ├── payment.js
│   │   └── registration.js
│   ├── utils/
│   │   ├── emailService.js    # Nodemailer confirmation email
│   │   └── sheetsService.js   # Append row to Google Sheet
│   ├── .env.example
│   ├── server.js              # Express entry point
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone & Install

```bash
# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in all values:

```
PORT=5000
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxx
WORKSHOP_FEE=49900              # Amount in paise (₹499)

GOOGLE_SERVICE_ACCOUNT_EMAIL=your-sa@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM="AI Workshop <your@gmail.com>"
```

### 3. Google Sheets Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project → Enable **Google Sheets API**
3. Create a **Service Account** → Download JSON key
4. Share your Google Sheet with the service account email (Editor access)
5. Copy `client_email` and `private_key` from JSON into `.env`

### 4. Razorpay Setup

1. Sign up at [razorpay.com](https://razorpay.com)
2. Go to Settings → API Keys → Generate Test Key
3. Copy Key ID and Key Secret into `.env`

### 5. Email Setup (Gmail)

1. Enable 2FA on Gmail → Generate an **App Password**
2. Use that app password as `EMAIL_PASS`

### 6. Run the Application

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## 🔄 Registration Flow

```
User fills form → Razorpay payment opens → Payment verified on backend
→ Row appended to Google Sheet → Confirmation email sent → Success screen shown
```

---

## 📊 Google Sheet Columns (auto-created)

| Timestamp | Name | College | Course | Year | DOB | Personal Email | College Email | About | Domain | Payment ID | Amount |
