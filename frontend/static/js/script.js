// Define API endpoints
const createOrderUrl = "https://paypal-assignment-ug0o.onrender.com/create-order";
const captureOrderUrl = "https://paypal-assignment-ug0o.onrender.com/capture-order";

// Initialize PayPal Button
paypal.Buttons({
    createOrder: async (data, actions) => {
        // Gather buyer information from form inputs
        const buyerInfo = {
            firstName: document.getElementById("first-name").value,
            lastName: document.getElementById("last-name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            addressLine1: document.getElementById("address-line1").value,
            addressLine2: document.getElementById("address-line2").value,
            city: document.getElementById("city").value,
            state: document.getElementById("state").value,
            zipCode: document.getElementById("zipCode").value,
            country: document.getElementById("country").value,
        };

        console.log("Buyer Info Sent to Backend:", buyerInfo); // Debugging log

        // Send buyer info to backend to create an order
        return fetch(createOrderUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ buyerInfo }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to create order. Check backend logs.");
                }
                return response.json();
            })
            .then((orderData) => {
                console.log("Order ID:", orderData.id);
                return orderData.id; // Return the PayPal order ID
            })
            .catch((err) => {
                console.error("Error during create-order:", err);
                alert("Failed to create order. Check the console for details.");
            });
    },

    onApprove: async (data, actions) => {
        console.log("Order ID:", data.orderID); // Debugging log

        // Capture the order
        return fetch(captureOrderUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ orderID: data.orderID }),
        })
            .then((response) => {
                if (response.redirected) {
                    console.log("Redirecting to:", response.url); // Debugging log
                    window.location.href = response.url; // Handle redirect
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

    onError: (err) => {
        console.error("Error in PayPal flow:", err);
        alert("Something went wrong with the PayPal process. Check the console for details.");
    },
}).render("#paypal-button-container");