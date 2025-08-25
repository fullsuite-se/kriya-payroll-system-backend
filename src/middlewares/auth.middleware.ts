import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import env from "../config/env";
import { AuthPayload } from "./auth.type";



// Extend Express Request type to include user
declare module "express-serve-static-core" {
    interface Request {
        user?: AuthPayload,
    }
}

export const authenticateJWTToken = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const header = req.headers["authorization"];
    const token = header && header.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized access. No token" });
        return;
    }

    jwt.verify(token, env.JWT_SECRET!, (err, decoded) => {
        if (err || !decoded) {
            res.status(403).json({ message: "Invalid token" });
            return;
        }

        req.user = decoded as AuthPayload;
        next();
    });
};
