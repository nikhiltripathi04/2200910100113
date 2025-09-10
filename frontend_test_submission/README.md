# URL Shortener Web Application - Frontend

A single-page application built with React that provides a user-friendly interface for the URL shortening microservice.

## Features

- **Intuitive UI:** A clean interface to shorten URLs.
- **URL Management:** Displays a list of URLs shortened in the current session.
- **Statistics View:** Provides a detailed view of click statistics for each shortened URL.

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
4.  Create a `.env` file in the root directory and add the following environment variable. Obtain the `LOG_AUTH_TOKEN` from the pre-test setup.
    ```
    REACT_APP_LOG_AUTH_TOKEN=YOUR_VALID_TOKEN_HERE
    ```
5.  Start the development server:
    ```bash
    npm start
    ```

The application will be available at `http://localhost:3000`.