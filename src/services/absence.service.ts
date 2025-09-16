import prisma from "../config/prisma";
import { EmployeeAbsence, Prisma } from "@prisma/client";
import { EmployeeAbsenceDto } from "../dtos/attendance.dto";
import {
  getCreatedUpdatedIsoUtcNow,
  getIsoUTCNow,
} from "../utils/date.utility";
import { generateUUIV4 } from "../utils/ids.utility";

export const findAllAbsence = async (
  company_id: string,
  employee_id?: string,
  from?: Date,
  to?: Date
) => {
  const where: Prisma.EmployeeAbsenceWhereInput = {
    company_id,
  };

  if (employee_id) {
    where.employee_id = employee_id;
  }

  if (from && to) {
    where.absence_date = {
      gte: from,
      lte: to,
    };
  } else if (from) {
    // if only one date is passed, fetch absence for that exact date
    where.absence_date = from;
  }

  return prisma.employeeAbsence.findMany({
    where,
    orderBy: {
      absence_date: "asc",
    },
  });
};

export const addAbsence = async (
  company_id: string,
  employeeAbsenceData: EmployeeAbsenceDto
) => {
  const { created_at, updated_at } = getCreatedUpdatedIsoUtcNow();


  const absence = await prisma.employeeAbsence.findFirst({
    where: {
      employee_id: employeeAbsenceData.employee_id,
      absence_date: employeeAbsenceData.absence_date,
    }
  });

  if (absence) throw new Error("Record already existed");

  return await prisma.employeeAbsence.create({
    data: {
      employee_absence_id: generateUUIV4(),
      company_id,
      ...employeeAbsenceData,
      created_at,
      updated_at,
    },
  });
};

export const updateAbsence = async (
  employee_absence_id: string,
  employeeAbsenceData: EmployeeAbsenceDto
) => {
  return await prisma.employeeAbsence.update({
    where: { employee_absence_id },
    data: {
      ...employeeAbsenceData,
      updated_at: getIsoUTCNow(),
    },
  });
};

export const deleteAbsence = async (
  employee_absence_id: string
): Promise<EmployeeAbsence> => {
  return await prisma.employeeAbsence.delete({
    where: { employee_absence_id },
  });
};
