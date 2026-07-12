import jwt from "jsonwebtoken";
import JWT_SECRET from "../config.js";

const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization header missing"
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET);

        req.userID = decoded.userID;

        next();

    } catch (err) {

        return res.status(403).json({
            message: "Invalid token"
        });

    }

};

export default authMiddleware;