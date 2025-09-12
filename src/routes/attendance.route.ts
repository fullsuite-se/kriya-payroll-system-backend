import * as attendanceController from "../controllers/attendance.controller";
import * as absenceController from "../controllers/absence.controller";
import * as leaveController from "../controllers/leave.controller";
import * as overtimeController from "../controllers/overtime.controller";
import * as restdayController from "../controllers/restday.controller";
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

export default router;

