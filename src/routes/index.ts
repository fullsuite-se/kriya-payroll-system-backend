import express from "express";
import companyRoutes from "./company.route";
import employeeRoutes from "./employee.route";
import attendanceRoutes from "./attendance.route";
import payitemRoutes from "./payitems.route";

const router = express.Router();

router.use('/companies', companyRoutes);
router.use('/employees', employeeRoutes);
router.use('/daily-records', attendanceRoutes);
router.use('/payitems', payitemRoutes);
export default router;