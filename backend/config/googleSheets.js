const crypto = require("crypto");

const TOKEN_URL = "https://www.googleapis.com/oauth2/v4/token";
const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";

let cachedAccessToken = null;

function getSheetId() {
  return String(process.env.GOOGLE_SHEET_ID || "").trim();
}

function getServiceAccountEmail() {
  return String(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || "").trim();
}

function normalizePrivateKey(privateKey) {
  return String(privateKey || "").replace(/\\n/g, "\n");
}

function isGoogleSheetsConfigured() {
  return Boolean(
    getSheetId() &&
    getServiceAccountEmail() &&
    process.env.GOOGLE_PRIVATE_KEY
  );
}

function encodeBase64Url(value) {
  return Buffer.from(
    typeof value === "string" ? value : JSON.stringify(value)
  ).toString("base64url");
}

function createServiceAccountAssertion() {
  const now = Math.floor(Date.now() / 1000);

  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const payload = {
    iss: getServiceAccountEmail(),
    scope: SHEETS_SCOPE,
    aud: TOKEN_URL,
    exp: now + 3600,
    iat: now,
  };

  const unsignedToken =
    `${encodeBase64Url(header)}.${encodeBase64Url(payload)}`;

  const signature = crypto
    .sign(
      "RSA-SHA256",
      Buffer.from(unsignedToken),
      normalizePrivateKey(process.env.GOOGLE_PRIVATE_KEY)
    )
    .toString("base64url");

  return `${unsignedToken}.${signature}`;
}

async function getServiceAccountAccessToken() {
  if (
    cachedAccessToken &&
    cachedAccessToken.expiresAt > Date.now() + 60000
  ) {
    return cachedAccessToken.token;
  }

  const response = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: createServiceAccountAssertion(),
    }),
  });

  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw new Error(
      data.error_description ||
      data.error ||
      "Google authentication failed"
    );
  }

  cachedAccessToken = {
    token: data.access_token,
    expiresAt:
      Date.now() + Number(data.expires_in || 3600) * 1000,
  };

  return cachedAccessToken.token;
}

module.exports = {
  getSheetId,
  isGoogleSheetsConfigured,
  getServiceAccountAccessToken,
};