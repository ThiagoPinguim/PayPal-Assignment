// Backend API URLs
const createOrderUrl = "https://https://paypal-assignment-ug0o.onrender.com/create-order";
const captureOrderUrl = "https://paypal-assignment-ug0o.onrender.com/capture-order";

// PayPal Button Configuration
paypal.Buttons({
    createOrder: async (data, actions) => {
        return fetch(createOrderUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ buyerInfo })
        })
            .then((response) => response.json())
            .then((orderData) => {
                console.log("Order ID:", orderData.id);
                return orderData.id;
            })
            .catch((err) => {
                console.error("Error during create-order:", err);
                alert("Failed to create order. Check the console for details.");
            });
    },
    onApprove: async (data, actions) => {
        console.log("Order ID:", data.orderID);
        return fetch(captureOrderUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ orderID: data.orderID })
        })
            .then((response) => {
                if (response.redirected) {
                    console.log("Redirecting to:", response.url);
                    window.location.href = response.url;
                    return;
                }
                return response.json();
            })
            .then((captureData) => {
                if (captureData.error) {
                    throw new Error(captureData.error);
                }
            })
            .catch((err) => {
                console.error("Error during capture-order:", err);
                alert("Failed to capture order. Check the console for details.");
            });
    }
}).render("#paypal-button-container");