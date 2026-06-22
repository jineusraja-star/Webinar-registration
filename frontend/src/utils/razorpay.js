const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

function loadScript(src) {
  return new Promise((resolve) => {
    const existingScript = document.querySelector(`script[src="${src}"]`);

    if (existingScript) {
      return resolve(true);
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function createDemoPayment(orderId) {
  const stamp = Date.now();

  return {
    paymentId: `demo_payment_${stamp}`,
    orderId: orderId || `demo_order_${stamp}`,
    signature: "demo_signature",
    paymentMode: "demo",
  };
}

export async function initiatePayment(form, onSuccess, onError) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/payment/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: form.fullName,
        personalEmail: form.personalEmail,
        amount: Number(import.meta.env.VITE_WORKSHOP_FEE || 49900),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Unable to initialize payment.");
    }

    if (data.mode === "demo" || !import.meta.env.VITE_RAZORPAY_KEY_ID) {
      onSuccess(createDemoPayment(data.orderId));
      return;
    }

    const scriptLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!scriptLoaded || typeof window.Razorpay === "undefined") {
      throw new Error("Payment gateway could not be loaded.");
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: data.name,
      description: data.description,
      order_id: data.orderId,
      prefill: {
        name: form.fullName,
        email: form.personalEmail,
      },
      theme: {
        color: "#6366f1",
      },
      handler: (responsePayload) => {
        onSuccess({
          paymentId: responsePayload.razorpay_payment_id,
          orderId: responsePayload.razorpay_order_id,
          signature: responsePayload.razorpay_signature,
          paymentMode: "razorpay",
        });
      },
      modal: {
        ondismiss: () => onError("Payment window was closed before completion."),
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  } catch (error) {
    onError(error.message || "Unable to start payment.");
  }
}