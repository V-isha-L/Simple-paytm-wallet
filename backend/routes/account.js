import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { Account, Transaction } from "../db.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const accountRoute = express.Router();

accountRoute.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({ userID: req.userID });

    if (!account) {
        return res.status(404).json({ message: "Account not found" });
    }

    res.json({ balance: Number(account.balance.toFixed(2)) });
});

accountRoute.get("/transactions", authMiddleware, async (req, res) => {
    const transactions = await Transaction.find({
        $or: [{ from: req.userID }, { to: req.userID }]
    })
        .populate("from", "firstName lastName email")
        .populate("to", "firstName lastName email")
        .sort({ createdAt: -1 })
        .limit(10);

    res.json({
        transactions: transactions.map((transaction) => ({
            _id: transaction._id,
            amount: transaction.amount,
            status: transaction.status,
            type: transaction.from._id.toString() === req.userID ? "debit" : "credit",
            from: transaction.from,
            to: transaction.to,
            createdAt: transaction.createdAt
        }))
    });
});

const transferSchema = z.object({
    amount: z.number().positive().max(100000),
    to: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), "Invalid receiver")
});

accountRoute.post("/transfer", authMiddleware, async (req, res) => {
    const result = transferSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({ message: "Invalid transfer details" });
    }

    const amount = Number(result.data.amount.toFixed(2));
    const { to } = result.data;

    if (to === req.userID) {
        return res.status(400).json({ message: "You cannot transfer money to yourself" });
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const account = await Account.findOne({ userID: req.userID }).session(session);

        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const toAccount = await Account.findOne({ userID: to }).session(session);

        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Receiver account not found" });
        }

        await Account.updateOne({ userID: req.userID }, { $inc: { balance: -amount } }, { session });
        await Account.updateOne({ userID: to }, { $inc: { balance: amount } }, { session });
        await Transaction.create([{ from: req.userID, to, amount, status: "success" }], { session });

        await session.commitTransaction();

        res.json({ message: "Transfer successful" });
    } catch (err) {
        await session.abortTransaction();
        res.status(500).json({ message: "Something went wrong" });
    } finally {
        session.endSession();
    }
});

export default accountRoute;
