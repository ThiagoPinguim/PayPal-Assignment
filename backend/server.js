require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files
app.use("/static", express.static(path.join(__dirname, "../frontend/static")));

// Serve frontend pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/thankyou", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/static/pages/thankyou.html"));
});

// Helper: Get PayPal Access Token
async function getAccessToken() {
    const auth = Buffer.from(`${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`).toString("base64");
    const response = await axios.post(`${process.env.PAYPAL_API_BASE_URL}/v1/oauth2/token`, "grant_type=client_credentials", {
        headers: {
            Authorization: `Basic ${auth}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    return response.data.access_token;
}

// Create Order
app.post("/create-order", async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        phone,
        addressLine1,
        addressLine2,
        city,
        state,
        zip,
        country
    } = req.body.buyerInfo;

    // Validate ZIP Code for US
    if (country === "US" && !/^\d{5}$/.test(zip)) {
        return res.status(400).json({ error: "Invalid ZIP Code format for US" });
    }

    // Sanitize phone number to contain only digits
    const sanitizedPhone = phone.replace(/\D/g, "");

    try {
        const orderData = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: "100.00"
                    },
                    shipping: {
                        address: {
                            address_line_1: addressLine1,
                            address_line_2: addressLine2,
                            admin_area_2: city,
                            admin_area_1: state,
                            postal_code: zip,
                            country_code: country
                        }
                    }
                }
            ],
            payer: {
                name: {
                    given_name: firstName,
                    surname: lastName
                },
                email_address: email,
                phone: {
                    phone_type: "MOBILE",
                    phone_number: {
                        national_number: sanitizedPhone
                    }
                },
                address: {
                    address_line_1: addressLine1,
                    address_line_2: addressLine2,
                    admin_area_2: city,
                    admin_area_1: state,
                    postal_code: zip,
                    country_code: country
                }
            }
        };

        // Log payload for debugging
        console.log("Order Data:", JSON.stringify(orderData, null, 2));

        const accessToken = await getAccessToken();
        const response = await axios.post(
            `${process.env.PAYPAL_API_BASE_URL}/v2/checkout/orders`,
            orderData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error creating order:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to create order" });
    }
});

// Capture Order
app.post("/capture-order", async (req, res) => {
    const { orderID } = req.body;

    try {
        const accessToken = await getAccessToken();
        const response = await axios.post(
            `${process.env.PAYPAL_API_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const transactionID = response.data.purchase_units[0].payments.captures[0].id;

        console.log(`Redirecting to: /static/pages/thankyou.html?transactionID=${transactionID}`);
        res.redirect(`/static/pages/thankyou.html?transactionID=${transactionID}`);
    } catch (error) {
        console.error("Error capturing order:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to capture order" });
    }
});

// Health Check
app.get("/health", (req, res) => {
    res.status(200).json({ status: "Server is running" });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});