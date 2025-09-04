import { Employee } from "@prisma/client";
import prisma from "../config/prisma";
import { EmployeeDto, EmployeeInfoDto, EmployeeSalaryDto, } from "../dtos/employee.dto";
import { getCreatedUpdatedIsoUtcNow, getIsoUTCNow } from "../utils/date.utility";
import { generateUUIV4 } from "../utils/ids.utility";



export const findAllEmployees = async (): Promise<Employee[]> => {
    return await prisma.employee.findMany();
};

//Give full detail including info, contribution, salary
export const findEmployeebyEmployeeId = async (employee_id: string) => {
    return await prisma.employee.findFirst({
        where: { employee_id },
        include: {
            employee_infos: true,
            employee_salaries: true,
            employee_designations: true
        }
    });
};

export const findEmployeesByCompanyId = async (company_id: string): Promise<Employee[]> => {
    return await prisma.employee.findMany({
        where: { company_id }
    });
};

export const findEmployeesByCompanyIdQuery = async (company_id: string, query: string) => {
    return await prisma.employee.findMany({
        where: {
            OR: [
                {
                    company_id: {
                        equals: company_id,
                    }
                },
                {
                    first_name: {
                        contains: query,
                    }
                },
                {
                    last_name: {
                        contains: query,
                    }
                },
                {
                    personal_email: {
                        contains: query,
                    }
                },
                {
                    work_email: {
                        contains: query,
                    }
                },
                {
                    job_title: {
                        contains: query,
                    }
                },
                {
                    department: {
                        contains: query,
                    }
                },
            ]
        }
    });
};

export const addOneEmployee = async (
    company_id: string,
    employeeData: EmployeeDto, employeeInfoData: EmployeeInfoDto, employeeSalaryData: EmployeeSalaryDto) => {

    const { created_at, updated_at } = getCreatedUpdatedIsoUtcNow();

    return await prisma.$transaction(async (tx) => {
        const employee = await tx.employee.create({
            data: {
                ...employeeData,
                company_id,
                created_at,
                updated_at,
            }
        });

        const employeeInfo = await tx.employeeInfo.create({
            data: {
                employee_info_id: generateUUIV4(),
                ...employeeInfoData,
                created_at,
                updated_at,
            }
        });

        const employeeSalary = await tx.employeeSalary.create({
            data: {
                employee_salary_id: generateUUIV4(),
                ...employeeSalaryData,
                company_id,
                created_at,
                updated_at,
            }
        });

        //create designation
        const designation = await tx.employeeDesignation.create({
            data: {
                employee_designation_id: generateUUIV4(),
                employee_id: employeeData.employee_id,
                company_id,
                created_at,
                updated_at,
            }
        });

        return { employee, employeeInfo, employeeSalary, designation };
    });
};

export const updateOneEmployee = async (employee_id: string, employeeData: EmployeeDto) => {
    return await prisma.employee.update({
        where: { employee_id },
        data: {
            ...employeeData,
            updated_at: getIsoUTCNow(),
        }
    });
};

export const updateOneEmployeeInfo = async (employee_id: string, employeeInfoData: EmployeeInfoDto) => {
    return await prisma.employeeInfo.update({
        where: { employee_id },
        data: {
            ...employeeInfoData,
            updated_at: getIsoUTCNow(),
        }
    });
};