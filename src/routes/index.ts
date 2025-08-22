import express from "express";
import companyRoutes from "./company.route";
const router = express.Router();

router.use('/companies', companyRoutes);

export default router;