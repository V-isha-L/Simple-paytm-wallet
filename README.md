# SimplePay Wallet

SimplePay Wallet is a full-stack MERN digital wallet application with user onboarding, JWT authentication, protected dashboard APIs, live wallet balance, searchable recipients, secure transfers, and transaction history.

## Highlights

- Complete signup and signin flow with JWT-based sessions.
- Passwords are stored as salted PBKDF2 hashes instead of plain text.
- Authenticated dashboard shows the logged-in user, live balance, recipient search, and recent transactions.
- Money transfers use MongoDB sessions/transactions so debit, credit, and transaction-log creation commit together.
- Transfer validation prevents invalid receiver IDs, self-transfers, negative amounts, and over-limit requests.
- User search excludes the logged-in user and searches by name or email.
- Environment-based API and JWT configuration for easier local setup.

## Tech Stack

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
- Node Crypto PBKDF2 password hashing
- dotenv

## Project Structure

```text
Simple-paytm-wallet/
├── backend/
│   ├── middlewares/
│   ├── routes/
│   │   ├── account.js
│   │   ├── index.js
│   │   └── user.js
│   ├── db.js
│   ├── config.js
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## API Endpoints

### User Routes
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/user/signup` | Register a user and create wallet account |
| POST | `/api/v1/user/signin` | Login user and return JWT |
| GET | `/api/v1/user/me` | Fetch logged-in user profile |
| PUT | `/api/v1/user` | Update logged-in user profile |
| GET | `/api/v1/user/bulk?filter=` | Search recipients |

### Account Routes
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/account/balance` | Fetch wallet balance |
| GET | `/api/v1/account/transactions` | Fetch recent credit/debit history |
| POST | `/api/v1/account/transfer` | Transfer money atomically |

## Environment Variables

Create a `.env` file inside the `backend` folder.

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret_key
```

Optionally create a `.env` file inside the `frontend` folder.

```env
VITE_API_URL=http://localhost:3000/api/v1
```

## Installation

Install and run the backend:

```bash
cd backend
npm install
node index.js
```

Open a new terminal, then install and run the frontend:

```bash
cd frontend
npm install
npm run dev
```

## Planned Improvements

- Unit and integration tests
- Docker Compose setup
- Admin transaction analytics dashboard
- Email/OTP verification
- Deployment on Render/Vercel

## Author

Vishal Singh
