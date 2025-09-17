import prisma from "../config/prisma";
import { EmployeeLeave, Prisma } from "@prisma/client";
import { EmployeeLeaveDto } from "../dtos/attendance.dto";
import {
  getCreatedUpdatedIsoUtcNow,
  getIsoUTCNow,
} from "../utils/date.utility";
import { generateUUIV4 } from "../utils/ids.utility";

export const findAllLeave = async (
  company_id: string,
  employee_id?: string,
  from?: Date,
  to?: Date
) => {
  const where: Prisma.EmployeeLeaveWhereInput = {
    company_id,
  };

  if (employee_id) {
    where.employee_id = employee_id;
  }

  if (from && to) {
    where.leave_date = {
      gte: new Date(from),
      lte: new Date(to),
    };
  } else if (from) {
    where.leave_date = {
      gte: new Date(from),
    };
  }
  else if (to) {
    where.leave_date = {
      lte: new Date(to),
    };
  }

  return prisma.employeeLeave.findMany({
    where,
    orderBy: {
      leave_date: "asc",
    },
  });
};

export const addLeave = async (
  company_id: string,
  employeeLeaveData: EmployeeLeaveDto
) => {
  const { created_at, updated_at } = getCreatedUpdatedIsoUtcNow();

  const leave = await prisma.employeeLeave.findFirst({
    where: {
      employee_id: employeeLeaveData.employee_id,
      leave_date: employeeLeaveData.leave_date,
    }
  });

  if (leave) throw new Error("Record already existed");

  return await prisma.employeeLeave.create({
    data: {
      employee_leave_id: generateUUIV4(),
      company_id,
      ...employeeLeaveData,
      created_at,
      updated_at,
    },
  });
};

export const updateLeave = async (
  employee_leave_id: string,
  employeeLeaveData: EmployeeLeaveDto
) => {
  return await prisma.employeeLeave.update({
    where: { employee_leave_id },
    data: {
      ...employeeLeaveData,
      updated_at: getIsoUTCNow(),
    },
  });
};

export const deleteLeave = async (
  employee_leave_id: string
): Promise<EmployeeLeave> => {
  return await prisma.employeeLeave.delete({
    where: { employee_leave_id },
  });
};
