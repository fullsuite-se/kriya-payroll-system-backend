import * as attendanceController from "../controllers/attendance.controller";
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

export default router;

