import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.utility";
import { validatePayrunDateDifferenceAndAttendance } from "../services/validate-daily-record.service";

interface QueryParams {
    //both required
    from: string,
    to: string,
}

interface RouteParams {
    employee_id: string,
}

export const validateDailyRecordOfOneEmployee = async (req: Request, res: Response) => {
    const { employee_id } = req.params as unknown as RouteParams;
    const { from, to } = req.query as unknown as QueryParams;


    //validate total number of attendance + leave + absense = from - to
    try {
        if (await validatePayrunDateDifferenceAndAttendance(employee_id, new Date(from), new Date(to))) {
            return res.status(200).json({
                message: `Success: employee's attendance, leave and absence match the number of days in payrun`,
                valid: true,
            });
        }
        return res.status(200).json({
            message: `Failed: employee's attendance, leave and absence match the number of days in payrun`,
            valid: false,
        });
    } catch (error) {
        return res.status(500).json({
            message: `Failed to validate the daily record of ${employee_id}`,
            error: getErrorMessage(error)
        });
    }
};