import * as attendanceController from "../controllers/attendance.controller";
import * as absenceController from "../controllers/absence.controller";
import * as leaveController from "../controllers/leave.controller";
import * as overtimeController from "../controllers/overtime.controller";
import * as restdayController from "../controllers/restday.controller";
import * as holidayController from "../controllers/holiday.controller";
import * as validateDailyRecordController from "../controllers/validate-daily-record.controller";


import express from "express";
const router = express.Router();



//base path: /api/v1/companies/:company_id/attendances
/**
 * ?from
 * ?to
 * ?employee_id
 */
router.get('/companies/:company_id/attendances', attendanceController.getAttendances);
router.post('/companies/:company_id/attendances', attendanceController.addAttendance); //add one only
router.patch('/companies/:company_id/attendances/:employee_attendance_id', attendanceController.updateAttendance);
router.delete('/companies/:company_id/attendances/:employee_attendance_id', attendanceController.deleteAttendance);


//overtimes
//base path: /api/v1/companies/:company_id/attendances
/**
 * ?from
 * ?to
 * ?employee_id
 */
router.get('/companies/:company_id/overtimes', overtimeController.getOvertimes);
router.post('/companies/:company_id/overtimes', overtimeController.addOneOvertime); //add one only
router.patch('/companies/:company_id/overtimes/:employee_overtime_id', overtimeController.updateOneOvertime);
router.delete('/companies/:company_id/overtimes/:employee_overtime_id', overtimeController.deleteOneOvertime);

//absences
router.get('/companies/:company_id/absences', absenceController.getAbsences);
router.post('/companies/:company_id/absences', absenceController.addOneAbsence); //add one only
router.patch('/companies/:company_id/absences/:employee_absence_id', absenceController.updateOneAbsence);
router.delete('/companies/:company_id/absences/:employee_absence_id', absenceController.deleteOneAbsence);


//leaves
router.get('/companies/:company_id/leaves', leaveController.getLeaves);
router.post('/companies/:company_id/leaves', leaveController.addOneLeave); //add one only
router.patch('/companies/:company_id/leaves/:employee_leave_id', leaveController.updateOneLeave);
router.delete('/companies/:company_id/leaves/:employee_leave_id', leaveController.deleteOneLeave);

//restdays
router.get('/companies/:company_id/restdays', restdayController.getRestdays);
router.post('/companies/:company_id/restdays', restdayController.addOneRestday); //add one only
router.patch('/companies/:company_id/restdays/:employee_restday_id', restdayController.updateOneRestday);
router.delete('/companies/:company_id/restdays/:employee_restday_id', restdayController.deleteOneRestday);


//holidays
//base path: /api/v1/daily-records/companies/:company_id/holidays
router.get('/companies/:company_id/holidays', holidayController.getHolidays);
router.post('/companies/:company_id/holidays', holidayController.addHoliday); //add one only
router.patch('/companies/:company_id/holidays/:company_holiday_id', holidayController.updateHoliday);
router.delete('/companies/:company_id/holidays/:company_holiday_id', holidayController.deleteHoliday);
//fetch employees attended during holiday
router.get('/companies/:company_id/holidays/employee-attendances', holidayController.getEmployeesAttendanceOnHoliday); //date is after ?

//this endpoint validates if the record for a given employee
// is complete for the period of a payrun (from - to date)
//query param: 
// ?from=
// ?to=
router.get('/validate/:employee_id', validateDailyRecordController.validateDailyRecordOfOneEmployee);


export default router;
