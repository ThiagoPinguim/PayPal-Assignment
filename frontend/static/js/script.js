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
                    // Handle backend redirect
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
    },    
}).render("#paypal-button-container");