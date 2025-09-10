# Logging Middleware

A standalone utility for logging application events to the evaluation service. This middleware can be integrated into both backend and frontend applications.

## Features

- **API Integration:** Makes POST requests to the required log API endpoint.
- **Secure Configuration:** Uses an environment variable to securely manage the authorization token.
- **Error Handling:** Gracefully handles and logs network or API errors.

## Prerequisites

- Node.js (v14 or higher)
- npm

## Setup and Running

1.  Clone this repository.
2.  Navigate to the project directory.
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the root directory and add your authorization token:
    ```
    LOG_AUTH_TOKEN=YOUR_VALID_TOKEN_HERE
    ```
5.  To test the logger, run the following command:
    ```bash
    npm start
    ```
    (Note: A test log message is included in `index.js` for demonstration.)