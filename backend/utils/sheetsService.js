const {
  getSheetId,
  isGoogleSheetsConfigured,
  getServiceAccountAccessToken,
} = require("../config/googleSheets");

function getSheetName() {
  return (
    String(process.env.GOOGLE_SHEET_TAB_NAME || "Sheet1").trim() ||
    "Sheet1"
  );
}

async function appendRegistrationRow(record) {
  if (!isGoogleSheetsConfigured()) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Google Sheets is not configured.");
    }

    return {
      mode: "demo",
      skipped: true,
      reason: "Google Sheets credentials are missing.",
    };
  }

  const accessToken = await getServiceAccountAccessToken();

  const values = [[
    new Date().toISOString(),
    record.fullName,
    record.collegeName,
    record.course,
    record.yearOfStudy,
    record.dob,
    record.personalEmail,
    record.phoneNumber,
    record.city,
    record.currentStatus,
    record.aboutYourself,
    record.interestedDomain,
    record.paymentId,
    record.amount,
    record.orderId,
    record.paymentMode,
  ]];

  const url =
    `https://sheets.googleapis.com/v4/spreadsheets/${getSheetId()}` +
    `/values/${encodeURIComponent(getSheetName() + "!A:N")}:append` +
    `?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message || "Failed to append row to Google Sheets."
    );
  }

  return {
    mode: "sheets",
    skipped: false,
    updatedRange:
      data?.updates?.updatedRange ||
      data?.tableRange ||
      null,
  };
}

module.exports = {
  appendRegistrationRow,
};