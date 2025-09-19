import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.utility";
import { addPayrollFrequencyService, addWorkingDaysService, findOnePayrollFrequency, findOnePayrollWorkingDays } from "../services/configuration.service";

interface RouteParams {
    company_id?: string,
};

export const getPayrollFrequency = async (req: Request, res: Response) => {
    const { company_id } = req.params as RouteParams;

    if (!company_id) return res.status(500).json({
        message: "Failed to fetch payroll frequency", error: " The client sent a malformed or incomplete request"
    });

    try {
        const frequency = await findOnePayrollFrequency(company_id);
        return res.status(200).json({ message: "Frequency fetched successfully", frequency });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch payroll frequency", error: getErrorMessage(error),
        });

    }
};

export const getWorkingDays = async (req: Request, res: Response) => {
    const { company_id } = req.params as RouteParams;

    if (!company_id) return res.status(500).json({
        message: "Failed to fetch payroll frequency", error: " The client sent a malformed or incomplete request"
    });


    try {
        const days = await findOnePayrollWorkingDays(company_id);
        return res.status(200).json({ message: "Working days fetched successfully", days });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch payroll working days", error: getErrorMessage(error),
        });
    }
};



export const addPayrollFrequency = async (req: Request, res: Response) => {
    const company_id = req.params.company_id as string;

    const { frequency } = req.body as { frequency: number };

    if (!company_id || !frequency) return res.status(500).json({
        message: "Failed to add payroll frequency", error: " The client sent a malformed or incomplete request"
    });


    try {
        const payroll_frequency = await addPayrollFrequencyService(company_id, frequency);
        return res.status(200).json({ message: "Frequency successfully add", payroll_frequency });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add  frequency", error: getErrorMessage(error) });
    }
};

export const addWorkingDays = async (req: Request, res: Response) => {
    const company_id = req.params.company_id as string;

    const { number_of_days } = req.body as { number_of_days: number };

    if (!company_id || !number_of_days) return res.status(500).json({
        message: "Failed to add payroll frequency", error: " The client sent a malformed or incomplete request"
    });


    try {
        const working_days = await addWorkingDaysService(company_id, number_of_days);
        return res.status(200).json({ message: "Successfully add working days", working_days });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add  working days", error: getErrorMessage(error) });
    }
};