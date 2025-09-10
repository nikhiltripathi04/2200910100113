# URL Shortener Microservice - Backend

A RESTful API built with Node.js and Express that provides URL shortening functionality, redirection, and click statistics.

## Features

- **URL Shortening:** Shortens long URLs into a unique, compact link.
- **Custom Shortcuts:** Allows users to create a personalized short link.
- **Expirations:** Shortened URLs can be set with an expiry time.
- **Click Tracking:** Tracks the number of times a short URL is accessed.
- **Logging:** Implements a mandatory logging middleware to track application events.

## Prerequisites

- Node.js (v14 or higher)
- npm
- MongoDB

## Setup and Running

1.  Clone this repository.
2.  Navigate to the project directory.
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Create a `.env` file in the root directory and add the following environment variables. Obtain the `LOG_AUTH_TOKEN` from the pre-test setup.
    ```
    LOG_AUTH_TOKEN=YOUR_VALID_TOKEN_HERE
    MONGO_URI=mongodb://localhost:27017/urlshortener
    ```
5.  Start the development server:
    ```bash
    npm run dev
    ```

The API will be available at `http://localhost:5000`.