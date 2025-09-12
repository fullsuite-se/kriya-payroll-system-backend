import { Request, Response } from "express";
import {
  addLeave,
  deleteLeave,
  findAllLeave,
  updateLeave,
} from "../services/leave.service";
import { getErrorMessage } from "../utils/errors.utility";
import { employeeLeaveSchema } from "../dtos/attendance.dto";

interface QueryParams {
  employee_id?: string;
  from?: Date;
  to?: Date;
}

interface RouteParams {
  company_id?: string;
  employee_leave_id?: string;
}

export const getLeaves = async (req: Request, res: Response) => {
  const { company_id } = req.params as RouteParams;
  const { employee_id, from, to } = req.query as QueryParams;

  if (!company_id)
    return res.status(400).json({
      message: "Failed to fetch leave",
      error: "Missing company_id",
    });

  try {
    const leaves = await findAllLeave(company_id, employee_id, from, to);
    return res
      .status(200)
      .json({ message: "Leave successfully fetched", leaves });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to fetch leave",
      error: getErrorMessage(error),
    });
  }
};

export const addOneLeave = async (req: Request, res: Response) => {
  const { company_id } = req.params as RouteParams;
  const parsedLeave = employeeLeaveSchema.safeParse(req.body);

  if (!parsedLeave.success)
    return res.status(400).json({
      message: "Failed to add leave. cat",
      error: parsedLeave.error?.issues,
    });

  if (!company_id)
    return res.status(400).json({
      message: "Failed to fetch leave",
      error: "Missing company_id",
    });

  try {
    const leave = await addLeave(company_id, parsedLeave.data);
    return res.status(201).json({ message: "Leave added successfully", leave });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add leave",
      error: getErrorMessage(error),
    });
  }
};

export const updateOneLeave = async (req: Request, res: Response) => {
  const { employee_leave_id } = req.params as RouteParams;

  if (!employee_leave_id)
    return res.status(400).json({
      message: "Failed to update leave",
      error: "Missing employee_leave_id",
    });

  const parsedLeave = employeeLeaveSchema.safeParse(req.body);

  if (!parsedLeave.success)
    return res.status(400).json({
      message: "Failed to add leave. cat",
      error: parsedLeave.error?.issues,
    });

  try {
    const leave = await updateLeave(employee_leave_id, parsedLeave.data);
    return res
      .status(201)
      .json({ message: "Leave updated successfully", leave });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update leave",
      error: getErrorMessage(error),
    });
  }
};

export const deleteOneLeave = async (req: Request, res: Response) => {
  const { employee_leave_id } = req.params as RouteParams;

  if (!employee_leave_id)
    return res.status(400).json({
      message: "Failed to update leave",
      error: "Missing employee_leave_id",
    });

  try {
    const deletedLeave = await deleteLeave(employee_leave_id);
    return res.status(200).json({
      message: "Leave deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete leave",
      error: getErrorMessage(error),
    });
  }
};
