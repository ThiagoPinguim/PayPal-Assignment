# PayPal Assignment Backend

This is the **backend** service for the PayPal Assignment project. It provides API endpoints to create and capture orders using the **PayPal REST API**. The backend is built using **Node.js** and **Express.js**, and integrates seamlessly with the frontend to handle payment processing and buyer information.

---

## **Features**
- **Create Order**: Generates a PayPal order with buyer and shipping details.
- **Capture Order**: Completes the payment process after buyer approval.
- **Health Check**: Provides a simple endpoint to check server status.
- **Frontend Integration**: Serves the frontend files and facilitates end-to-end functionality.

---

## **Technologies Used**
- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for building RESTful APIs.
- **Axios**: HTTP client for making API requests.
- **dotenv**: Manages environment variables.
- **CORS**: Enables cross-origin requests.
- **Body-parser**: Parses incoming JSON payloads.

---

## **Folder Structure**
backend/
├── server.js               # Main backend file
├── package.json            # Backend dependencies
├── package-lock.json       # Locked dependencies
├── app.yaml                # Google Cloud App Engine config
├── .env                    # Environment variables
├── .gitignore              # Ignored files for backend
└── README.md               # Backend-specific documentation