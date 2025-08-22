import express from "express";
import * as companyController from "../controllers/company.controller";
import * as managementController from "../controllers/management.controller";
const router = express.Router();

/**
 * ?query - search company
 */

router.get("/", companyController.getCompanies);
router.get("/:company_id", companyController.getCompany);
router.post("/", companyController.addCompany);
router.patch("/:company_id", companyController.updateCompany);
router.patch("/:company_id/info", companyController.updateCompanyInfo);

router.post("/:company_id/access", managementController.addUserToManage); //add users to manage the company
router.get("/access/:user_id", managementController.getCompaniesUserHasAccess); //fetch company a user has access
router.get("/:company_id/access", managementController.getUsersWithCompanyAccess); //fetch users that has access to company
router.delete("/access/management_id", managementController.deleteUserAccess);

export default router;