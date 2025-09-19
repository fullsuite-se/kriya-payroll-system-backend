import prisma from "../config/prisma";
import { RecurringPayDto } from "../dtos/recurring-pay.dto";
import { getIsoUTCNow } from "../utils/date.utility";

export const findAllRecurringPays = async (company_id: string) => {
    return await prisma.recurringPay.findMany({
        where: {
            company_id
        }
    });
};

export const addOneRecurringPay = async (company_id: string, recurringPayData: RecurringPayDto) => {
    return await prisma.recurringPay.create({
        data: {
            company_id,
            ...recurringPayData,
            created_at: getIsoUTCNow(),
        }
    });
};


export const updateOneRecurringPay = async (recurring_pay_id: string, recurringPayData: RecurringPayDto) => {
    return await prisma.recurringPay.update({
        where: { recurring_pay_id },
        data: {
            ...recurringPayData
        }
    });
};

export const deleteOneRecurringPay = async (recurring_pay_id: string) => {
    return await prisma.recurringPay.delete({
        where: { recurring_pay_id }
    });
};

