import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.utility";
import { findAllPayitems } from "../services/payitems.service";


export const getPayitems = async (req: Request, res: Response) => {
    try {
        const payitems = await findAllPayitems();
        return res.status(200).json({ message: "Successfully fetched payitems", payitems });
    } catch (error) {
        return res
            .status(400)
            .json({
                message: "Failed to fetch payitems",
                error: getErrorMessage(error),
            });
    }
};