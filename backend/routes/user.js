import express from "express";
import { z } from "zod";
import { User, Account } from "../db.js";
import jwt from "jsonwebtoken";
import JWT_SECRET from "../config.js";
import authmiddleware from "../middlewares/authmiddleware.js";

const userRoute = express.Router();

// Validation schema for user signup
const signUpSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string()
});


// POST /api/v1/user/signup
// Creates a new user account

userRoute.post("/signup", async (req, res) => {

    // Validate incoming request body
    const body = req.body;
    const result = signUpSchema.safeParse(body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid inputs"
        });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
        email: body.email
    });

    if (existingUser) {
        return res.status(409).json({
            message: "Account already exists"
        });
    }

    // Create user
    const dbUser = await User.create(body);

    // Create account with random starting balance
    await Account.create({
        userID: dbUser._id,
        balance: 1 + Math.random() * 10000
    });

    // Generate JWT token
    const token = jwt.sign(
        {
            userID: dbUser._id
        },
        JWT_SECRET
    );

    res.json({
        message: "User created successfully",
        token
    });
});

// Validation schema for updating profile
const updatedBody = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
});


// PUT /api/v1/user/
// Updates logged-in user's profile
// Requires JWT Authentication

userRoute.put("/", authmiddleware, async (req, res) => {

    // Validate update body
    const { success } = updatedBody.safeParse(req.body);

    if (!success) {
        return res.status(400).json({
            message: "Invalid inputs"
        });
    }

    // Update current user
    await User.updateOne(
        {
            _id: req.userID
        },
        req.body
    );

    res.json({
        message: "Updated Successfully"
    });
});


// GET /api/v1/user/bulk?filter=vi
// Searches users by first or last name

userRoute.get("/bulk", authmiddleware,async (req, res) => {

    // Search text sent from frontend
    const filter = req.query.filter || "";

    // Search matching users
    const users = await User.find({
        $or: [
            {
                firstName: {
                    $regex: `^${filter}`,
                    $options: "i"
                }
            },
            {
                lastName: {
                    $regex: `^${filter}`,
                    $options: "i"
                }
            }
        ]
    });

    // Return only required fields
    res.json({
        users: users.map(user => ({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }))
    });
});

export default userRoute;