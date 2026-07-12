import express from "express";
import userRoute from "./user.js";
import accountRoute from "./account.js";

const route = express.Router();

// Mount all user-related routes
// Base URL: /api/v1/user
route.use("/user", userRoute);

// Mount all account-related routes
// Base URL: /api/v1/account
route.use("/account", accountRoute);

export default route;