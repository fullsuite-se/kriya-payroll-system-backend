import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { diffDaysExcluding } from "../utils/date-processing.utility";
import { getErrorMessage } from "../utils/errors.utility";


const sumEmployeeAttendanceDays = async (employee_id: string, from: Date, to: Date): Promise<number> => {
    const where: Prisma.EmployeeAttendanceWhereInput = {
        employee_id,
        attendance_date: {
            gte: from,
            lte: to
        }
    };

    try {
        return await prisma.employeeAttendance.count({
            where,
        });
    } catch (error) {
        console.log(error);
        throw new Error(getErrorMessage(error));
    }
};


const sumEmployeeAbsenseDays = async (employee_id: string, from: Date, to: Date): Promise<number> => {
    const where: Prisma.EmployeeAbsenceWhereInput = {
        employee_id,
        absence_date: {
            gte: from,
            lte: to
        }
    };


    try {
        return await prisma.employeeAbsence.count({
            where
        });
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

const sumEmployeeLeaveDays = async (employee_id: string, from: Date, to: Date): Promise<number> => {
    const where: Prisma.EmployeeLeaveWhereInput = {
        employee_id,
        leave_date: {
            gte: from,
            lte: to
        }
    };


    try {
        return await prisma.employeeLeave.count({
            where
        });
    } catch (error) {
        throw new Error(getErrorMessage(error));
    }
};

const sumEmployeeAttendanceAbsenceLeave = async (employee_id: string, from: Date, to: Date) => {
    return await sumEmployeeAttendanceDays(employee_id, from, to) + await sumEmployeeAbsenseDays(employee_id, from, to) + await sumEmployeeLeaveDays(employee_id, from, to);
};

export const validatePayrunDateDifferenceAndAttendance = async (employee_id: string, from: Date, to: Date) => {
    //fetch employee
    //the approach is that we will be getting the dayoff from the employee record 
    //since dayoff vary from company. 

    //calculate difference: to - from
    const payrunPeriodDiff = diffDaysExcluding(from, to, [0, 6]);

    //sum of days of employee's attendance, leave, and absense
    const sumEmpDays = await sumEmployeeAttendanceAbsenceLeave(employee_id, from, to);

    if (payrunPeriodDiff == sumEmpDays) return true;
    return false;
};

