# KahvanaTask

Repository for a code challenge by Kahvana

## Overview

This project is a full-stack web application that uses Node.js, TypeScript, Express.js, React, and Axios for the backend and frontend.

### Backend

The backend of the project is implemented using Node.js and TypeScript. It uses Express.js as the web server framework to handle API requests and serves as the data source for the frontend. User data is stored in-memory, and various endpoints are exposed to interact with the user data.

### Frontend

The frontend of the project is built with React and TypeScript. It communicates with the backend through API calls using Axios. Users can view, add, edit, and delete user records in a user-friendly web interface.

## Getting Started

To run the application locally, follow these steps:

1. Clone the repository to your local machine:
```bash
git clone <repository-url>
```
2. Navigate to the server directory:
```bash
cd server
```
3. Start the backend server:
```bash
npm run start-backend
```

4. Open another terminal window (preferably PowerShell) and navigate to the client directory:
```bash
cd client
```
5. Start the frontend application:
```bash
npm run start-front
```

Open your web browser and navigate to http://localhost:3000 to access the application.  
***Keep in mind that the backend is expected to run on port 8080 and the frontend is to run on port 3000***
