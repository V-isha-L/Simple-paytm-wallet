# 💸 Paytm Clone Backend

A backend implementation of a Paytm-inspired wallet application built with **Node.js**, **Express.js**, and **MongoDB**.

The project focuses on learning backend development concepts including authentication, middleware, MongoDB transactions, REST APIs, and request validation.

> 🚧 **Status:** Backend completed. React frontend is currently under development.

---

## Features

- User Registration
- JWT Authentication
- Protected Routes
- Authentication Middleware
- User Profile Update
- Search Users
- Wallet Balance API
- Money Transfer using MongoDB Transactions
- Request Validation with Zod

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Zod
- dotenv

---

## Project Structure

```
backend/
│
├── middlewares/
│   └── authmiddleware.js
│
├── routes/
│   ├── account.js
│   ├── user.js
│   └── index.js
│
├── db.js
├── config.js
├── index.js
└── package.json
```

---

## API Endpoints

### User Routes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/user/signup` | Register a new user |
| PUT | `/api/v1/user/` | Update logged-in user |
| GET | `/api/v1/user/bulk?filter=` | Search users |

### Account Routes

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/account/balance` | Get current balance |
| POST | `/api/v1/account/transfer` | Transfer money |

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## Installation

Clone the repository

```bash
git clone https://github.com/V-isha-L/Simple-paytm-wallet.git
```

Go to the backend

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Run the server

```bash
npm start
```

---

## Upcoming Features

- React Frontend
- User Sign In
- Password Hashing with bcrypt
- Transaction History
- Improved Error Handling
- Better UI/UX

---

## What I Learned

While building this project, I practiced:

- Express Routing
- MongoDB & Mongoose
- JWT Authentication
- Authentication Middleware
- MongoDB Transactions
- REST API Design
- Request Validation with Zod
- Async/Await
- Backend Project Structure

---

## Author

**Vishal Singh**

Backend project built while learning the MERN stack.