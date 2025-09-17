import { Prisma } from "@prisma/client";
import prisma from "../config/prisma";
import { CompanyHolidayDto } from "../dtos/company.dto";
import { convertToISO8601, getCreatedUpdatedIsoUtcNow, getIsoUTCNow } from "../utils/date.utility";
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



// export const getEmployeesAttendnaceOnHoliday = async (
//     company_id: string,
//     date: string,
// ) => {

//     //to YY-MM-DD string
//     const attendance_date = convertToISO8601(date);

//     if (!attendance_date) throw new Error("Error occured");

//     return await prisma.employeeAttendance.findMany({
//         where: {
//             company_id,
//             attendance_date
//         },
//         orderBy: {
//             attendance_date: "asc",
//         }
//     });
// };

export const getEmployeesAttendnaceOnHoliday = async (
    company_id: string,
    date: string,
) => {
    return await prisma.$queryRaw`
        SELECT * FROM "employee_attendances" 
        WHERE "company_id" = ${company_id} 
        AND DATE("attendance_date") = ${date}
        ORDER BY "attendance_date" ASC
    `;
};