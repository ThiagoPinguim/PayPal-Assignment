# **PayPal Assignment: Simple PayPal Checkout Web Application**

This repository contains a simple **PayPal Checkout** web application designed to simulate a basic shopping cart experience. It allows users to view product details, enter buyer information, and complete a payment process using PayPal's API. A dynamic thank-you page displays transaction details after a successful purchase.

## Table of Contents

- [Live Demo](#live-demo)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)

## Live Demo

- **Hosted Application:** [https://paypal-assignment-ug0o.onrender.com](https://paypal-assignment-ug0o.onrender.com)
- **GitHub Repository:** [PayPal Assignment GitHub Repo](https://github.com/ThiagoPinguim/PayPal_Assignment)

## Features

- **Product Display:** View product details (name, price, item number) and an image.
- **Buyer Information Form:** Collects editable buyer details, pre-filled with sample data.
- **PayPal Integration:** Secure payments through PayPal's API with OAuth2 authentication.
- **Dynamic Thank-You Page:** Displays the transaction ID after a successful purchase.

## Technologies Used

- **Frontend:**
  - HTML5, CSS3, JavaScript
  - PayPal JS SDK

- **Backend:**
  - Node.js, Express.js
  - Axios (HTTP client)
  - PayPal API (Sandbox environment)

## Project Structure

paypal_assignment/
├── backend/                   # Backend API (Node.js + Express)
│   ├── server.js              # Main backend logic
│   ├── package.json           # Node.js dependencies and scripts
│   ├── package-lock.json      # Dependency lock file
│   ├── .gitignore             # Files to ignore in Git
│   ├── .env                   # Environment variables
│   └── README.md              # Backend-specific documentation
├── frontend/                  # Frontend (HTML, CSS, JS)
│   ├── index.html             # Main shopping cart page
│   ├── static/                # Static assets
│   │   ├── css/               # Stylesheet for index.html
│   │   │   └── styles.css
│   │   ├── js/                # JavaScript
│   │   │   └── script.js
│   │   ├── images/            # Images
│   │   │   └── paypal_mug.jpg
│   │   └── pages/             # Additional pages
│   │       ├── thankyou.html  # Thank you page
│   │       └── css/           # Stylesheet for thankyou.html
│   │           └── styles.css
├── LICENSE                    # Licensing information
└── README.md                  # Project overview (this file)

---

## Usage

1. Access the shopping cart at https://paypal-assignment-ug0o.onrender.com
    *** *NOTE: Render's instance spin down with inactivity, which can delay requests by 50 seconds or more.*
2. Fill out the buyer's information form or use the default pre-filled details.
3. Click the PayPal button to initiate the payment process.
4. After a successful payment, you will be redirected to a thank-you page displaying the transaction ID.

## License
This project is licensed for personal and educational use only.

## Contact
Author: Thiago Eugenio Barbosa de Castro
GitHub: [@ThiagoPinguim](https://github.com/ThiagoPinguim)
Email: [thiago.castro.paypal@gmail.com]

---

*Feel free to reach out for feedback, suggestions, or collaboration opportunities!*