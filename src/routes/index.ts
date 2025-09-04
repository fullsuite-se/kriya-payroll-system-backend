import express from "express";
import companyRoutes from "./company.route";
import employeeRoutes from "./employee.route";
const router = express.Router();

router.use('/companies', companyRoutes);
router.use('/employees', employeeRoutes);
export default router;