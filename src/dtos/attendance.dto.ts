import { z } from "zod";

// EmployeeAttendance Schema
export const employeeAttendanceSchema = z
  .object({
    // employee_attendance_id: z.string(),
    // company_id: z.string(),
    employee_id: z.string(),
    attendance_date: z.coerce.date(),
    time_in: z.coerce.date(),
    time_out: z.coerce.date(),
    hours_rendered: z.number(),
    hours_worked: z.number(),
    hours_logged: z.number().nullable(),
    undertime: z.number().nullable(),
    tardiness: z.number().nullable(),
    night_differential: z.number().nullable(),
    shift_type: z.enum(["REGULAR", "SLIDE"]).default("REGULAR"),
  })
  .strip();

// EmployeeOvertime Schema
export const employeeOvertimeSchema = z
  .object({
    // employee_overtime_id: z.string(),
    // company_id: z.string(),
    employee_id: z.string(),
    overtime_date: z.coerce.date(),
    overtime_type: z.enum([
      "REGULAR_DAY",
      "REST_DAY",
      "SPECIAL_HOLIDAY",
      "REGULAR_HOLIDAY",
      "REST_DAY_SPECIAL_HOLIDAY",
      "REST_DAY_REGULAR_HOLIDAY",
    ]),
    overtime_hours_rendered: z.number(),
    overtime_night_differential: z.number(),
    overtime_status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]),
  })
  .strip();

// EmployeeAbsence Schema
export const employeeAbsenceSchema = z
  .object({
    // employee_absence_id: z.string(),
    // company_id: z.string(),
    employee_id: z.string(),
    absence_date: z.coerce.date(),
    absence_type: z.string(),
    absence_status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]),
    is_paid: z.boolean(),
  })
  .strip();

// EmployeeLeave Schema
export const employeeLeaveSchema = z
  .object({
    // employee_leave_id: z.string(),
    // company_id: z.string(),
    employee_id: z.string(),
    leave_date: z.coerce.date(),
    leave_type: z.string(),
    leave_status: z.enum(["PENDING", "ACCEPTED", "REJECTED"]),
    is_paid: z.boolean(),
  })
  .strip();

// EmployeeRestday Schema
export const employeeRestdaySchema = z
  .object({
    // employee_restday_id: z.string(),
    // company_id: z.string(),
    employee_id: z.string(),
    restday_date: z.coerce.date(),
    time_in: z.coerce.date(),
    time_out: z.coerce.date(),
    hours_rendered: z.number(),
    hours_worked: z.number(),
    hours_logged: z.number().nullable(),
    undertime: z.number().nullable(),
    tardiness: z.number().nullable(),
    night_differential: z.number().nullable(),
    shift_type: z.enum(["REGULAR", "SLIDE"]).default("REGULAR"),
  })
  .strip();

// Type definitions
export type EmployeeAttendanceDto = z.infer<typeof employeeAttendanceSchema>;
export type EmployeeOvertimeDto = z.infer<typeof employeeOvertimeSchema>;
export type EmployeeAbsenceDto = z.infer<typeof employeeAbsenceSchema>;
export type EmployeeLeaveDto = z.infer<typeof employeeLeaveSchema>;
export type EmployeeRestdayDto = z.infer<typeof employeeRestdaySchema>;
