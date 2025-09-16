import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { CompanyHolidayDto } from "../dtos/company.dto";
import { getCreatedUpdatedIsoUtcNow, getIsoUTCNow } from "../utils/date.utility";
import { generateUUIV4 } from "../utils/ids.utility";

export const findHolidays = async (
    company_id: string,
    from?: Date,
    to?: Date
) => {
    const where: Prisma.CompanyHolidayWhereInput = {
        company_id,
    };

    if (from && to) {
        where.holiday_date = {
            gte: from,
            lte: to,
        };
    }
    else if (from) {
        where.holiday_date = from;
    }

    return await prisma.companyHoliday.findMany({
        where,
        orderBy: {
            holiday_date: "asc",
        },
    });
};


export const addOneHoliday = async (
    company_id: string,
    companyHolidayData: CompanyHolidayDto,
) => {
    const { created_at, updated_at } = getCreatedUpdatedIsoUtcNow();

    return await prisma.companyHoliday.create({
        data: {
            company_holiday_id: generateUUIV4(),
            company_id,
            ...companyHolidayData,
            created_at,
            updated_at
        }
    });
};

export const updateOneHoliday = async (
    company_holiday_id: string,
    companyHolidayData: CompanyHolidayDto,
) => {
    return await prisma.companyHoliday.update({
        where: { company_holiday_id },
        data: {
            ...companyHolidayData,
            updated_at: getIsoUTCNow(),
        }
    });
};

export const deleteOneHoliday = async (
    company_holiday_id: string,
) => {
    return await prisma.companyHoliday.delete({
        where: { company_holiday_id }
    });
};