import prisma from "../config/prisma";
import { EmployeeAttendance, Prisma } from "@prisma/client";
import { EmployeeAttendanceDto } from "../dtos/attendance.dto";
import { getCreatedUpdatedIsoUtcNow, getIsoUTCNow } from "../utils/date.utility";
import { generateUUIV4 } from "../utils/ids.utility";

export const findAllAttendances = async (
    company_id: string,
    employee_id?: string,
    from?: Date,
    to?: Date
) => {
    const where: Prisma.EmployeeAttendanceWhereInput = {
        company_id,
    };

    if (employee_id) {
        where.employee_id = employee_id;
    }

    if (from && to) {
        where.attendance_date = {
            gte: from,
            lte: to,
        };
    } else if (from) {
        // if only one date is passed, fetch attendance for that exact date
        where.attendance_date = from;
    }

    return prisma.employeeAttendance.findMany({
        where,
        orderBy: {
            attendance_date: "asc",
        },
    });
};

export const addOneAttendance = async (company_id: string, employeeAttendanceData: EmployeeAttendanceDto) => {
    const { created_at, updated_at } = getCreatedUpdatedIsoUtcNow();

    return await prisma.employeeAttendance.create({
        data: {
            employee_attendance_id: generateUUIV4(),
            company_id,
            ...employeeAttendanceData,
            created_at,
            updated_at,
        }
    });

};

export const updateOneAttendance = async (employee_attendance_id: string, employeeAttendanceData: EmployeeAttendanceDto) => {
    return await prisma.employeeAttendance.update({
        where: { employee_attendance_id },
        data: {
            ...employeeAttendanceData,
            updated_at: getIsoUTCNow(),
        }
    });
};

export const deleteOneAttendance = async (
    employee_attendance_id: string
): Promise<EmployeeAttendance> => {
    return await prisma.employeeAttendance.delete({
        where: { employee_attendance_id },
    });
};