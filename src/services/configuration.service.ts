import prisma from "../config/prisma";
import { getCreatedUpdatedIsoUtcNow } from "../utils/date.utility";

export const addPayrollFrequencyService = async (company_id: string, frequency: number) => {
    const { created_at, updated_at } = getCreatedUpdatedIsoUtcNow();

    return await prisma.companyMonthlyPayrollFrequency.create({
        data: {
            company_id,
            frequency,
            created_at,
            updated_at
        }
    });
};

export const addWorkingDaysService = async (company_id: string, number_of_days: number) => {
    const { created_at, updated_at } = getCreatedUpdatedIsoUtcNow();

    return await prisma.companyMonthlyWorkingDay.create({
        data: {
            company_id,
            number_of_days,
            created_at,
            updated_at
        }
    });
};