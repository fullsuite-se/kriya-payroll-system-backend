import prisma from "../config/prisma";
import { EmployeeRestday, Prisma } from "@prisma/client";
import { getCreatedUpdatedIsoUtcNow, getIsoUTCNow } from "../utils/date.utility";
import { generateUUIV4 } from "../utils/ids.utility";
import { EmployeeRestdayDto } from "../dtos/attendance.dto";

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
            gte: new Date(from),
            lte: new Date(to),
        };
    } else if (from) {
        where.restday_date = {
            gte: new Date(from),
        };
    }
    else if (to) {
        where.restday_date = {
            lte: new Date(to),
        };
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

    const restday = await prisma.employeeRestday.findFirst({
        where: {
            employee_id: employeeRestdayData.employee_id,
            restday_date: employeeRestdayData.restday_date,
        }
    });

    if (restday) throw new Error("Record already existed");

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