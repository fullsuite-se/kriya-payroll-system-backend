import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.utility";
import { addOneRecurringPay, deleteOneRecurringPay, findAllRecurringPays, updateOneRecurringPay } from "../services/recurring-pay.service";
import { recurringPaySchema } from "../dtos/recurring-pay.dto";

interface RouteParams {
    company_id?: string,
    employee_id?: string,
    recurring_pay_id?: string
}

export const getMany = async (req: Request, res: Response) => {
    const { company_id } = req.params as RouteParams;

    if (!company_id) return res.status(401).json({ message: "Failed to fetch recurring pays", error: "Missing company_id" });

    try {
        const recurring_pays = await findAllRecurringPays(company_id);
        return res.status(200).json({ message: "Recurring pays fetched successfully", recurring_pays });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch recurring pays", error: getErrorMessage(error) });
    }
};

export const addOne = async (req: Request, res: Response) => {
    const { company_id } = req.params as RouteParams;

    if (!company_id) return res.status(401).json({ message: "Failed to add recurring pay", error: "Missing company_id" });

    const parsedRecurringPay = recurringPaySchema.safeParse(req.body);

    if (!parsedRecurringPay.success) return res.status(401).json({ message: "Failed to add recurring pay", error: parsedRecurringPay.error.issues });

    try {
        const recurring_pay = await addOneRecurringPay(company_id, parsedRecurringPay.data);
        return res.status(201).json({ message: "Recurring pay created successfully", recurring_pay });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add recurring pay", error: getErrorMessage(error) });
    }
};

export const updateOne = async (req: Request, res: Response) => {

    const { recurring_pay_id } = req.params as RouteParams;

    if (!recurring_pay_id) return res.status(401).json({ message: "Failed to update recurring pay", error: "Missing recurring_pay_id" });

    const parsedRecurringPay = recurringPaySchema.safeParse(req.body);

    if (!parsedRecurringPay.success) return res.status(401).json({ message: "Failed to update recurring pay", error: parsedRecurringPay.error.issues });

    try {
        const recurring_pay = await updateOneRecurringPay(recurring_pay_id, parsedRecurringPay.data);
        return res.status(201).json({ message: "Recurring pay updated successfully", recurring_pay });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add recurring pay", error: getErrorMessage(error) });
    }
};

export const deleteOne = async (req: Request, res: Response) => {
    const { recurring_pay_id } = req.params as RouteParams;

    if (!recurring_pay_id) return res.status(401).json({ message: "Failed to update recurring pay", error: "Missing recurring_pay_id" });

    try {
        await deleteOneRecurringPay(recurring_pay_id);
        return res.status(201).json({ message: "Recurring pay deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete recurring pay", error: getErrorMessage(error) });
    }
};