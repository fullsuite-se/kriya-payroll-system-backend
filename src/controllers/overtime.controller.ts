import { Request, Response } from "express";
import { addOvertime, deleteOvertime, findAllOvertimes, updateOvertime } from "../services/overtime.service";
import { getErrorMessage } from "../utils/errors.utility";
import { employeeOvertimeSchema } from "../dtos/attendance.dto";

interface QueryParams {
    employee_id?: string,
    from?: Date,
    to?: Date
}

interface RouteParams {
    company_id?: string,
    employee_overtime_id?: string,
};


export const getOvertimes = async(req: Request, res: Response) => {
    const { company_id } = req.params as RouteParams;
    const { employee_id, from, to } = req.query as QueryParams;

    if (!company_id) return res.status(400).json({ message: "Failed to fetch overtime", error: "Missing company_id" });

    try {
        const overtimes = await findAllOvertimes(company_id, employee_id, from, to)
        return res.status(200).json({ message: "Overtime successfully fetched", overtimes });
    } catch (error) {
        return res.status(400).json({ message: "Failed to fetch overtime", error: getErrorMessage(error) });
    }
};


export const addOneOvertime = async (req: Request, res: Response) => {
    const { company_id } = req.params as RouteParams;
        const parsedOvertime = employeeOvertimeSchema.safeParse(req.body);
    
        if (!parsedOvertime.success) return res.status(400).json({ message: "Failed to add overtime. cat", error: parsedOvertime.error?.issues });
    
        if (!company_id) return res.status(400).json({ message: "Failed to fetch overtime", error: "Missing company_id" });
    
        try {
            const overtime = await addOvertime(company_id, parsedOvertime.data);
            return res.status(201).json({ message: "Overtime added successfully", overtime });
        } catch (error) {
            return res.status(500).json({ message: "Failed to add overtime", error: getErrorMessage(error) });
        }
};


export const updateOneOvertime = async(req: Request, res: Response) => {
    const { employee_overtime_id } = req.params as RouteParams;
    
        if (!employee_overtime_id) return res.status(400).json({ message: "Failed to update overtime", error: "Missing employee_overtime_id" });
    
        const parsedOvertime = employeeOvertimeSchema.safeParse(req.body);
    
        if (!parsedOvertime.success) return res.status(400).json({ message: "Failed to add attendance. cat", error: parsedOvertime.error?.issues });
    
        try {
            const overtime = await updateOvertime(employee_overtime_id, parsedOvertime.data);
            return res.status(201).json({ message: "Overtime updated successfully", overtime });
        } catch (error) {
            return res.status(500).json({ message: "Failed to update overtime", error: getErrorMessage(error) });
        }
};


export const deleteOneOvertime = async(req: Request, res: Response) => {
    const { employee_overtime_id } = req.params as RouteParams;
    
        if (!employee_overtime_id) return res.status(400).json({ message: "Failed to update attendance", error: "Missing employee_attendance_id" });
    
        try {
            const deletedOvertime = await deleteOvertime(employee_overtime_id);
            return res.status(200).json({
                message: "Overtime deleted successfully",
            });
        } catch (error) {
            return res.status(500).json({ message: "Failed to delete overtime", error: getErrorMessage(error) });
        }
   
};
