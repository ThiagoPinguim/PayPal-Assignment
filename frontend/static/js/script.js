// script.js

// PayPal Buttons Integration
paypal.Buttons({
    createOrder: async function () {
        try {
            // Call the backend to create an order
            const response = await fetch("https://paypal-assignment-ug0o.onrender.com/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: "100.00",
                    currency: "USD",
                    buyerInfo: {
                        firstName: document.getElementById("first-name").value,
                        lastName: document.getElementById("last-name").value,
                        email: document.getElementById("email").value,
                        phone: document.getElementById("phone").value,
                        addressLine1: document.getElementById("address-line1").value,
                        addressLine2: document.getElementById("address-line2").value,
                        city: document.getElementById("city").value,
                        state: document.getElementById("state").value,
                        zipCode: document.getElementById("zip").value,
                        country: document.getElementById("country").value
                    }
                })
            });

            const data = await response.json();
            if (response.ok && data.id) {
                return data.id; // Pass the order ID to PayPal
            } else {
                console.error("Error creating order:", data);
                alert("Failed to create order.");
            }
        } catch (error) {
            console.error("Error creating order:", error);
            alert("Failed to create order. Please try again.");
        }
    },

    onApprove: async function (data) {
        try {
            // Call the backend to capture the order
            const response = await fetch("https://paypal-assignment-ug0o.onrender.com/capture-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    orderID: data.orderID
                })
            });

            const captureData = await response.json();
            if (response.ok && captureData.status === "COMPLETED") {
                window.location.href = `/static/pages/thankyou.html?transactionID=${captureData.id}`;
            } else {
                console.error("Error capturing order:", captureData);
                alert("Failed to capture order.");
            }
        } catch (error) {
            console.error("Error capturing order:", error);
            alert("Failed to capture order. Please try again.");
        }
    }
}).render("#paypal-button-container");