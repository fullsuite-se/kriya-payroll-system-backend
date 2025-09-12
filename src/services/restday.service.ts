import prisma from "../config/prisma";
import { EmployeeRestday, Prisma } from "@prisma/client";
import { getCreatedUpdatedIsoUtcNow, getIsoUTCNow } from "../utils/date.utility";
import { generateUUIV4 } from "../utils/ids.utility";
import { EmployeeOvertimeDto, EmployeeRestdayDto } from "../dtos/attendance.dto";

export const findAllRestdays = async (
    company_id: string,
    employee_id?: string,
    from?: Date,
    to?: Date
) => {
    const where: Prisma.EmployeeRestdayWhereInput = {
        company_id,
    };

    if (employee_id) {
        where.employee_id = employee_id;
    }

    if (from && to) {
        where.restday_date = {
            gte: from,
            lte: to,
        };
    } else if (from) {
        // if only one date is passed, fetch attendance for that exact date
        where.restday_date = from;
    }

    return prisma.employeeRestday.findMany({
        where,
        orderBy: {
            restday_date: "asc",
        },
    });
};

export const addRestday = async (company_id: string, employeeRestdayData: EmployeeRestdayDto) => {
    const { created_at, updated_at } = getCreatedUpdatedIsoUtcNow();

    return await prisma.employeeRestday.create({
        data: {
            employee_restday_id: generateUUIV4(),
            company_id,
            ...employeeRestdayData,
            created_at,
            updated_at,
        }
    });

};

export const updateRestday = async (employee_restday_id: string, employeeRestdayData: EmployeeRestdayDto) => {
    return await prisma.employeeRestday.update({
        where: { employee_restday_id },
        data: {
            ...employeeRestdayData,
            updated_at: getIsoUTCNow(),
        }
    });
};

export const deleteRestday = async (
    employee_restday_id: string
): Promise<EmployeeRestday> => {
    return await prisma.employeeRestday.delete({
        where: { employee_restday_id },
    });
};