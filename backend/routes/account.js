import express from "express";
import mongoose from "mongoose";
import { z } from "zod";
import { Account } from "../db.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const accountRoute = express.Router();

/*

GET /api/v1/account/balance

Returns the balance of the currently logged-in user.
Requires JWT authentication.

*/
accountRoute.get("/balance", authMiddleware, async (req, res) => {

    // Find account associated with logged-in user
    const account = await Account.findOne({
        userID: req.userID
    });

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        });
    }

    res.json({
        balance: account.balance
    });
});


/*

Validation schema for money transfer

*/
const transferSchema = z.object({
    amount: z.number().positive(),
    to: z.string()
});


/*

POST /api/v1/account/transfer

Transfers money from the logged-in user
to another user's account.

Uses MongoDB Transactions to ensure
both balance updates succeed together.

*/
accountRoute.post("/transfer", authMiddleware, async (req, res) => {

    // Validate request body
    const result = transferSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid transfer details"
        });
    }

    const { amount, to } = req.body;

    // Start MongoDB session for transaction
    const session = await mongoose.startSession();

    try {

        session.startTransaction();

        // Find sender's account
        const account = await Account.findOne({
            userID: req.userID
        }).session(session);

        // Check if sender has sufficient balance
        if (!account || account.balance < amount) {

            await session.abortTransaction();

            return res.status(400).json({
                message: "Insufficient balance"
            });
        }

        // Find receiver's account
        const toAccount = await Account.findOne({
            userID: to
        }).session(session);

        if (!toAccount) {

            await session.abortTransaction();

            return res.status(400).json({
                message: "Receiver account not found"
            });
        }

        // Deduct money from sender
        await Account.updateOne(
            {
                userID: req.userID
            },
            {
                $inc: {
                    balance: -amount
                }
            },
            { session }
        );

        // Credit receiver
        await Account.updateOne(
            {
                userID: to
            },
            {
                $inc: {
                    balance: amount
                }
            },
            { session }
        );

        // Save both updates permanently
        await session.commitTransaction();

        res.json({
            message: "Transfer Successful"
        });

    } catch (err) {

        // Undo every database operation
        await session.abortTransaction();

        res.status(500).json({
            message: "Something went wrong"
        });

    } finally {
        session.endSession();
    }

});

export default accountRoute;