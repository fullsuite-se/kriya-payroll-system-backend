import prisma from "../config/prisma";
import {EmployeeOvertime, Prisma } from "@prisma/client";
import { EmployeeOvertimeDto } from "../dtos/attendance.dto";
import { getCreatedUpdatedIsoUtcNow, getIsoUTCNow } from "../utils/date.utility";
import { generateUUIV4 } from "../utils/ids.utility";


export const findAllOvertimes = async (
    company_id: string,
    employee_id?: string,
    from?: Date,
    to?: Date
) => {
    const where: Prisma.EmployeeOvertimeWhereInput = {
        company_id,
    };

    if (employee_id) {
        where.employee_id = employee_id;
    }

    if (from && to) {
        where.overtime_date = {
            gte: from,
            lte: to,
        };
    } else if (from) {
        // if only one date is passed, fetch attendance for that exact date
        where.overtime_date = from;
    }

    return prisma.employeeOvertime.findMany({
        where,
        orderBy: {
            overtime_date: "asc",
        },
    });
};

export const addOvertime = async (company_id: string, employeeOvertimeData: EmployeeOvertimeDto) => {
    const { created_at, updated_at } = getCreatedUpdatedIsoUtcNow();

    return await prisma.employeeOvertime.create({
        data: {
            employee_overtime_id: generateUUIV4(),
            company_id,
            ...employeeOvertimeData,
            created_at,
            updated_at,
        }
    });
};

export const updateOvertime = async (employee_overtime_id: string, employeeOvertimeData: EmployeeOvertimeDto) => {
    return await prisma.employeeOvertime.update({
        where: { employee_overtime_id },
        data: {
            ...employeeOvertimeData,
            updated_at: getIsoUTCNow(),
        }
    });
};

export const deleteOvertime = async (
    employee_overtime_id: string
): Promise<EmployeeOvertime> => {
    return await prisma.employeeOvertime.delete({
        where: { employee_overtime_id },
    });
};