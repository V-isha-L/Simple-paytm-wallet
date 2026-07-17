# 💸 SimplePay Wallet

A full-stack digital wallet application inspired by Paytm, built while learning the MERN stack.

The project demonstrates complete user authentication, protected routes, wallet management, real-time user search, and secure money transfers using MongoDB transactions.

> 🚧 This project is built for learning purposes and is actively being improved.

---

## ✨ Features

### Authentication

- User Registration
- User Login
- JWT Authentication
- Protected API Routes
- Protected Frontend Routes
- Local Storage Authentication

### Wallet

- View Current Balance
- Transfer Money
- Atomic MongoDB Transactions
- Balance Validation
- Receiver Validation

### User Management

- Search Users
- Update User Profile
- Dynamic Dashboard

### Frontend

- React
- React Router
- Reusable Components
- Axios API Integration
- Responsive UI using Tailwind CSS

### Backend

- REST APIs
- Express Middleware
- MongoDB & Mongoose
- Request Validation using Zod
- JWT Authentication
- MongoDB Transactions

---

## 🛠 Tech Stack

### Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
- Vite

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Zod
- dotenv

---

## 📁 Project Structure

```
paytm/
│
├── backend/
│   ├── middlewares/
│   ├── routes/
│   ├── db.js
│   ├── config.js
│   ├── index.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │
│   ├── components/
│   │   ├── Appbar.jsx
│   │   ├── Balance.jsx
│   │   ├── BottomWarning.jsx
│   │   ├── Heading.jsx
│   │   ├── InputBox.jsx
│   │   ├── SButton.jsx
│   │   ├── SubHeading.jsx
│   │   └── Users.jsx
│   │
│   ├── pages/
│   │   ├── Signup.jsx
│   │   ├── Signin.jsx
│   │   ├── Dashboard.jsx
│   │   └── SendMoney.jsx
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── README.md
```

---

## 🔗 API Endpoints

### User Routes

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/v1/user/signup` | Register User |
| POST | `/api/v1/user/signin` | Login User |
| PUT | `/api/v1/user` | Update Profile |
| GET | `/api/v1/user/bulk?filter=` | Search Users |

### Account Routes

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/v1/account/balance` | Fetch Wallet Balance |
| POST | `/api/v1/account/transfer` | Transfer Money |

---

## ⚙ Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🚀 Installation

Clone the repository

```bash
git clone https://github.com/V-isha-L/Simple-paytm-wallet.git
```

Go into the project

```bash
cd Simple-paytm-wallet
```

Install backend dependencies

```bash
cd backend
npm install
```

Install frontend dependencies

```bash
cd ../frontend
npm install
```

Run backend

```bash
npm start
```

Run frontend

```bash
npm run dev
```

---

## 📚 Concepts Practiced

- REST API Design
- React Component Architecture
- React Router
- State Management using Hooks
- Axios
- JWT Authentication
- Protected Routes
- Authentication Middleware
- MongoDB Transactions
- MongoDB Relationships
- Mongoose
- Zod Validation
- Async/Await
- Folder Structure
- Tailwind CSS

---

## 🚀 Planned Improvements

- Password Hashing (bcrypt)
- Debounced User Search
- Transaction History
- Better Error Handling
- Toast Notifications
- Loading Indicators
- Better Form Validation
- Route Guards
- Unit Testing
- Docker Support
- Refresh Token Authentication

---

## 👨‍💻 Author

**Vishal Singh**

Built while learning the MERN stack through hands-on development, debugging, and iterative improvements.

This project is part of my journey toward becoming a Full Stack MERN Developer.