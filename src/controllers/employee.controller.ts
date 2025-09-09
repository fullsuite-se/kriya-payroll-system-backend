import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.utility";
import { addNewEmployeeSalary, addOneEmployee, findAllEmployees, findEmployeebyEmployeeId, findEmployeesByCompanyId, findEmployeesByCompanyIdQuery, updateOneEmployee, updateOneEmployeeInfo, updateStatus } from "../services/employee.service";
import { employeeInfoSchema, employeeSalarySchema, employeeSchema } from "../dtos/employee.dto";

interface QueryParams {
    query?: string,
    company_id?: string,
};

interface RouteParams {
    employee_id?: string,
    company_id?: string,

}

export const getEmployees = async (req: Request, res: Response) => {
    const { query, company_id } = req.query as QueryParams;

    try {
        if (company_id) {
            if (query) {
                const employees = await findEmployeesByCompanyIdQuery(company_id, query);
                return res.status(200).json({ message: "Successfully fetched employees", employees });
            }
            const employees = await findEmployeesByCompanyId(company_id);
            return res.status(200).json({ message: "Successfully fetched employees", employees });
        }
        const employees = await findAllEmployees();
        return res.status(200).json({ message: "Successfully fetched employees", employees });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch employees.", error: getErrorMessage(error) });
    }
};

export const getEmployeeById = async (req: Request, res: Response) => {
    const { employee_id } = req.params as RouteParams;

    if (!employee_id) return res.status(500).json({ message: "Failed to fetch employees.", error: "Missing employee_id" });

    try {
        const employee = await findEmployeebyEmployeeId(employee_id);
        return res.status(200).json({ message: "Successfully fetched employees", employee });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch employees.", error: getErrorMessage(error) });
    }
};


export const addEmployee = async (req: Request, res: Response) => {
    const { company_id } = req.params as RouteParams;
    const parsedEmployee = employeeSchema.safeParse(req.body);
    const parsedEmployeeInfo = employeeInfoSchema.safeParse(req.body);
    const parsedEmployeeSalary = employeeSalarySchema.safeParse(req.body);



    if (!parsedEmployee.success || !parsedEmployeeInfo.success || !parsedEmployeeSalary.success) {
        return res.status(400).json({
            message: "Failed adding employees", error: {
                employee: parsedEmployee.error?.issues,
                info: parsedEmployeeInfo.error?.issues,
                salary: parsedEmployeeSalary.error?.issues,
            }
        });
    }

    if (!company_id) return res.status(400).json({ message: "Failed to add employee", error: "Mising company_id" });

    try {
        const { employee, employeeInfo, employeeSalary, designation } = await addOneEmployee(company_id, parsedEmployee.data, parsedEmployeeInfo.data, parsedEmployeeSalary.data);
        return res.status(201).json({ message: "Employee added successfully", employee, employeeInfo, employeeSalary, designation });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add employees.", error: getErrorMessage(error) });
    }
};

export const updateEmployee = async (req: Request, res: Response) => {
    const parsedEmployee = employeeSchema.safeParse(req.body);
    const { employee_id } = req.params as RouteParams;

    if (!parsedEmployee.success) {
        return res.status(400).json({
            message: "Failed updating employees", error: parsedEmployee.error?.issues,
        });
    }

    if (!employee_id) return res.status(400).json({ message: "Failed to update employee", error: "Mising employee_id" });

    try {
        const employee = await updateOneEmployee(employee_id, parsedEmployee.data);
        return res.status(201).json({ message: "Employee updated successfully", employee });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add employees.", error: getErrorMessage(error) });
    }
};

export const updateEmployeeInfo = async (req: Request, res: Response) => {
    const parsedEmployeeInfo = employeeInfoSchema.safeParse(req.body);
    const { employee_id } = req.params as RouteParams;

    if (!parsedEmployeeInfo.success) {
        return res.status(400).json({
            message: "Failed updating employees", error: parsedEmployeeInfo.error?.issues,
        });
    }

    if (!employee_id) return res.status(400).json({ message: "Failed to update employee", error: "Mising employee_id" });

    try {
        const employee = await updateOneEmployeeInfo(employee_id, parsedEmployeeInfo.data);
        return res.status(201).json({ message: "Employee updated successfully", employee });
    } catch (error) {
        return res.status(500).json({ message: "Failed to add employees.", error: getErrorMessage(error) });
    }
};

//this adds new salary to the employee
//workflow: find emp salary -> active status = 0 -> add salary with active=1
export const addEmployeeSalary = async (req: Request, res: Response) => {
    const { employee_id, company_id } = req.params as RouteParams;

    if (!employee_id || !company_id) return res.status(500).json({ message: "Failed adding salary.", error: "Missing company id or employee id" });


    const parsedEmployeeSalary = employeeSalarySchema.safeParse(req.body);

    if (!parsedEmployeeSalary.success) return res.status(400).json({ message: "Failed adding employees", error: parsedEmployeeSalary.error?.issues });

    try {
        const salary = await addNewEmployeeSalary(company_id, employee_id, parsedEmployeeSalary.data);
        return res.status(201).json({ message: "Salary addedd successfully", salary });

    } catch (error) {
        return res.status(500).json({ message: "Failed adding salary.", error: getErrorMessage(error) });
    }

};

export const updateEmploymentStatus = async (req: Request, res: Response) => {
    const { employee_id } = req.params as RouteParams;
    const { employement_status } = req.body as { employement_status: boolean };
    if (!employee_id) return res.status(500).json({ message: "Failed update status.", error: "Missing employee id" });


    try {
        const status = await updateStatus(employee_id, employement_status);
        return res.status(201).json({ message: "Employment status updated successfully", status });
    } catch (error) {
        return res.status(500).json({ message: "Failed update employment status.", error: getErrorMessage(error) });
    }
};