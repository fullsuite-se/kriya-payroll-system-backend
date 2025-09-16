import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.utility";
import { addOneHoliday, deleteOneHoliday, findHolidays, updateOneHoliday } from "../services/holiday.service";
import { companyHolidaySchema } from "../dtos/company.dto";

interface QueryParams {
    from?: Date;
    to?: Date;
}

interface RouteParams {
    company_id?: string;
    company_holiday_id?: string;
}

export const getHolidays = async (req: Request, res: Response) => {
    const { company_id } = req.params as RouteParams;
    const { from, to } = req.query as QueryParams;

    if (!company_id)
        return res
            .status(400)
            .json({
                message: "Failed to fetch holiday",
                error: "Missing company_id",
            });

    try {
        const holidays = await findHolidays(company_id, from, to);
        return res.status(200).json({ message: "Holidays fetched successfully", holidays });
    } catch (error) {
        return res.status(400).json({
            message: "Failed to fetch holidays",
            error: getErrorMessage(error),
        });
    }
};

export const addHoliday = async (req: Request, res: Response) => {
    const { company_id } = req.params as RouteParams;
    const parsedCompanyHoliday = companyHolidaySchema.safeParse(req.body);

    if (!parsedCompanyHoliday.success)
        return res.status(400).json({
            message: "Failed to add holiday",
            error: parsedCompanyHoliday.error?.issues,
        });

    if (!company_id)
        return res
            .status(400)
            .json({
                message: "Failed to fetch holiday",
                error: "Missing company_id",
            });

    try {
        const holiday = await addOneHoliday(company_id, parsedCompanyHoliday.data);
        return res.status(201).json({ message: "Holiday added successfully", holiday });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to add holiday",
            error: getErrorMessage(error),
        });
    }
};

export const updateHoliday = async (req: Request, res: Response) => {
    const { company_holiday_id } = req.params as RouteParams;
    const parsedCompanyHoliday = companyHolidaySchema.safeParse(req.body);

    if (!parsedCompanyHoliday.success)
        return res.status(400).json({
            message: "Failed to update holiday",
            error: parsedCompanyHoliday.error?.issues,
        });

    if (!company_holiday_id)
        return res
            .status(400)
            .json({
                message: "Failed to update holiday",
                error: "Missing company_holiday_id",
            });

    try {
        const holiday = await updateOneHoliday(company_holiday_id, parsedCompanyHoliday.data);
        return res.status(201).json({ message: "Holiday added successfully", holiday });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to update holiday",
            error: getErrorMessage(error),
        });
    }

};

export const deleteHoliday = async (req: Request, res: Response) => {
    const { company_holiday_id } = req.params as RouteParams;

    if (!company_holiday_id)
        return res
            .status(400)
            .json({
                message: "Failed to update holiday",
                error: "Missing company_holiday_id",
            });

    try {
        await deleteOneHoliday(company_holiday_id);
        return res.status(200).json({
            message: "Holiday deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Failed to delete Holiday",
            error: getErrorMessage(error),
        });
    };
};