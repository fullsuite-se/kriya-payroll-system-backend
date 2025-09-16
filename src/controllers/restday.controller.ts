import { Request, Response } from "express";
import { addRestday, deleteRestday, findAllRestdays, updateRestday } from "../services/restday.service";
import { getErrorMessage } from "../utils/errors.utility";
import { employeeRestdaySchema } from "../dtos/attendance.dto";


interface QueryParams {
    employee_id?: string,
    from?: Date,
    to?: Date
}

interface RouteParams {
    company_id?: string,
    employee_restday_id?: string,
};


export const getRestdays = async (req: Request, res: Response) => {

    const { company_id } = req.params as RouteParams;
    const { employee_id, from, to } = req.query as QueryParams;

    if (!company_id) return res.status(400).json({ message: "Failed to fetch restday", error: "Missing company_id" });

    try {
        const restdays = await findAllRestdays(company_id, employee_id, from, to);
        return res.status(200).json({ message: "Attendance successfully fetched", restdays });
    } catch (error) {
        return res.status(400).json({ message: "Failed to fetch restday", error: getErrorMessage(error) });
    }
};


export const addOneRestday = async (req: Request, res: Response) => {
    const { company_id } = req.params as RouteParams;
    const parsedRestday = employeeRestdaySchema.safeParse(req.body);

    if (!parsedRestday.success) return res.status(400).json({ message: "Failed to add restday. cat", error: parsedRestday.error?.issues });

    if (!company_id) return res.status(400).json({ message: "Failed to fetch restday", error: "Missing company_id" });

    try {
        const restday = await addRestday(company_id, parsedRestday.data);
        return res.status(201).json({ message: "Restday added successfully", restday });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add restday", error: getErrorMessage(error) });
    }
};


export const updateOneRestday = async (req: Request, res: Response) => {
    const { employee_restday_id } = req.params as RouteParams;

    if (!employee_restday_id) return res.status(400).json({ message: "Failed to update restday", error: "Missing employee_attendance_id" });

    const parsedRestday = employeeRestdaySchema.safeParse(req.body);

    if (!parsedRestday.success) return res.status(400).json({ message: "Failed to add restday. cat", error: parsedRestday.error?.issues });

    try {
        const restday = await updateRestday(employee_restday_id, parsedRestday.data);
        return res.status(201).json({ message: "Restday updated successfully", restday });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update restday", error: getErrorMessage(error) });
    }
};


export const deleteOneRestday = async (req: Request, res: Response) => {
    const { employee_restday_id } = req.params as RouteParams;

    if (!employee_restday_id) return res.status(400).json({ message: "Failed to update attendance", error: "Missing employee_attendance_id" });

    try {
        const deletedAttendance = await deleteRestday(employee_restday_id);
        return res.status(200).json({
            message: "Attendance deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete attendance", error: getErrorMessage(error) });
    }
};

