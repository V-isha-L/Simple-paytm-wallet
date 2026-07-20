import express from "express";
import { z } from "zod";
import { User, Account } from "../db.js";
import jwt from "jsonwebtoken";
import { randomBytes, pbkdf2Sync, timingSafeEqual } from "crypto";
import JWT_SECRET from "../config.js";
import authmiddleware from "../middlewares/authmiddleware.js";

const userRoute = express.Router();
const SALT_LENGTH = 16;
const KEY_LENGTH = 64;
const ITERATIONS = 100000;
const DIGEST = "sha512";

const createToken = (userID) => jwt.sign({ userID }, JWT_SECRET, { expiresIn: "2h" });

const hashPassword = (password) => {
    const salt = randomBytes(SALT_LENGTH).toString("hex");
    const hash = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST).toString("hex");
    return `${ITERATIONS}:${salt}:${hash}`;
};

const verifyPassword = (password, storedPassword) => {
    const parts = storedPassword.split(":");

    if (parts.length !== 3) {
        return password === storedPassword;
    }

    const [iterations, salt, originalHash] = parts;
    const hash = pbkdf2Sync(password, salt, Number(iterations), KEY_LENGTH, DIGEST);
    const originalHashBuffer = Buffer.from(originalHash, "hex");

    return hash.length === originalHashBuffer.length && timingSafeEqual(hash, originalHashBuffer);
};

const userResponse = (user) => ({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
});

const signUpSchema = z.object({
    firstName: z.string().trim().min(2),
    lastName: z.string().trim().min(2),
    email: z.string().trim().email().toLowerCase(),
    password: z.string().min(6)
});

const signInSchema = z.object({
    email: z.string().trim().email().toLowerCase(),
    password: z.string().min(1)
});

userRoute.post("/signup", async (req, res) => {
    const result = signUpSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: "Please enter valid signup details" });
    }

    const body = result.data;
    const existingUser = await User.findOne({ email: body.email });

    if (existingUser) {
        return res.status(409).json({ message: "Account already exists" });
    }

    const dbUser = await User.create({
        ...body,
        password: hashPassword(body.password)
    });

    await Account.create({
        userID: dbUser._id,
        balance: Number((1000 + Math.random() * 9000).toFixed(2))
    });

    res.status(201).json({
        message: "User created successfully",
        token: createToken(dbUser._id),
        user: userResponse(dbUser)
    });
});

userRoute.post("/signin", async (req, res) => {
    const result = signInSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: "Please enter a valid email and password" });
    }

    const user = await User.findOne({ email: result.data.email });

    if (!user || !verifyPassword(result.data.password, user.password)) {
        return res.status(401).json({ message: "Incorrect email or password" });
    }

    res.json({
        message: "Signed in successfully",
        token: createToken(user._id),
        user: userResponse(user)
    });
});

const updatedBody = z.object({
    password: z.string().min(6).optional(),
    firstName: z.string().trim().min(2).optional(),
    lastName: z.string().trim().min(2).optional()
});

userRoute.get("/me", authmiddleware, async (req, res) => {
    const user = await User.findById(req.userID).select("firstName lastName email");

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({ user: userResponse(user) });
});

userRoute.put("/", authmiddleware, async (req, res) => {
    const result = updatedBody.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: "Invalid inputs" });
    }

    const update = { ...result.data };

    if (update.password) {
        update.password = hashPassword(update.password);
    }

    await User.updateOne({ _id: req.userID }, update);

    res.json({ message: "Updated Successfully" });
});

userRoute.get("/bulk", authmiddleware, async (req, res) => {
    const filter = String(req.query.filter || "").trim();
    const safeFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const users = await User.find({
        _id: { $ne: req.userID },
        $or: [
            { firstName: { $regex: safeFilter, $options: "i" } },
            { lastName: { $regex: safeFilter, $options: "i" } },
            { email: { $regex: safeFilter, $options: "i" } }
        ]
    }).select("firstName lastName email").limit(10);

    res.json({ users: users.map(userResponse) });
});

export default userRoute;
