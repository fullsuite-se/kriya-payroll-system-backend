import express from "express";
const router = express.Router();
import * as employeeController from "../controllers/employee.controller";

/**
 * ?company_id
 * ?company_id&page=&max=
 * ?company_id=&query=
 */
router.get('/', employeeController.getEmployees);
router.get('/:employee_id', employeeController.getEmployeeById);
router.post('/companies/:company_id', employeeController.addEmployee);
router.patch('/:employee_id', employeeController.updateEmployee);
router.patch('/:employee_id/info', employeeController.updateEmployeeInfo);

//salary
router.post('/:employee_id/companies/:company_id/salaries', employeeController.addEmployeeSalary);
router.patch('/:employee_id/companies/:company_id/employment-status', employeeController.updateEmploymentStatus);


export default router;