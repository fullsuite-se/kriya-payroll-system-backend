import { z } from "zod";

export const employeeSchema = z.object({
    employee_id: z.string(),
    // company_id: z.string(),
    first_name: z.string().max(100),
    middle_name: z.string().max(100).nullable(),
    last_name: z.string().max(100),
    personal_email: z.string().email().max(100),
    work_email: z.string().email().max(100),
    job_title: z.string().max(100),
    department: z.string().max(100),
    employement_status: z.boolean().default(true),
}).strip();

export const employeeInfoSchema = z.object({
    // employee_info_id: z.string(),
    employee_id: z.string(),
    permanent_address: z.string(),
    current_address: z.string(),
    civil_status: z.string().max(50),
    date_hired: z.coerce.date(),
    date_end: z.coerce.date().nullable(),
    sex: z.string().max(50),
}).strip();

export const employeeDesignationSchema = z.object({
    // employee_designation_id: z.string(),
    employee_id: z.string(),
    // company_id: z.string(),
});

export const employeeContributionSchema = z.object({
    // employee_contribution_id: z.string(),
    employee_id: z.string(),
    // company_id: z.string(),
    contribution_name: z.enum(['SSS', 'PHIC', 'HDMF', 'TIN']),
    contribution_account_number: z.string().max(255),
}).strip();

export const employeeSalarySchema = z.object({
    // employee_salary_id: z.string().uuid(),
    // company_id: z.string().uuid(),
    employee_id: z.string(),
    base_pay: z.number().nullable(),
    date: z.coerce.date().nullable(),
    change_type: z.enum(['STARTING', 'INCREASE', 'CORRECTION']),
    is_active: z.boolean(),
}).strip();



export type EmployeeSalaryDto = z.infer<typeof employeeSalarySchema>;
export type EmployeeDto = z.infer<typeof employeeSchema>;
export type EmployeeDesignationDto = z.infer<typeof employeeDesignationSchema>;
export type EmployeeInfoDto = z.infer<typeof employeeInfoSchema>;
export type EmployeeContributionDto = z.infer<typeof employeeContributionSchema>;