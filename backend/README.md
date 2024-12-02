# **PayPal Assignment Backend**

This project implements the backend for a simple **PayPal** Checkout web application. The application allows users to simulate a basic shopping cart, complete a payment process using PayPal's API, and displays a thank-you message with the transaction ID after successful payment.

---

## **Features**

- Simulates a shopping cart with product details and buyer information.
- Integrates with the PayPal API for secure payments using OAuth2 authentication.
- Provides endpoints to:
  - Create orders
  - Capture payments
- Displays a thank-you page with transaction details upon successful payment.
- Includes a health check endpoint to ensure server availability.

---

## **Technology Stack**

- **Node.js**: Backend framework.
- **Express**: HTTP server framework.
- **Axios**: HTTP client for API calls.
- **PayPal API**: Payment processing.
- **dotenv**: Environment variable management.
- **body-parser**: Parsing incoming request bodies.
- **cors**: Cross-origin resource sharing.

---

## **Project Structure**

paypal_assignment/
├── backend/
│   ├── .env                  # Environment variables
│   ├── .gitignore            # Files to ignore in Git
│   ├── package.json          # Project metadata and dependencies
│   ├── package-lock.json     # Dependency lock file
│   ├── server.js             # Main server code
│   └── README.md             # Project documentation (this file)

---

## **Repository**

- [GitHub Repository](https://github.com/ThiagoPinguim/PayPal_Assignment/tree/main/backend)

---

## **Deployment**

This project is deployed on Render. You can access the live backend via URL: https://paypal-assignment-ug0o.onrender.com/

---

**Contact**
Author: Thiago Eugenio Barbosa de Castro
Email: [thiago.castro.paypal@gmail.com]
Feel free to reach out for questions or suggestions!
Cheers!