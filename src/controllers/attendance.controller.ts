import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.utility";
import {
  addOneAttendance,
  deleteOneAttendance,
  findAllAttendances,
  updateOneAttendance,
} from "../services/attendance.service";
import { employeeAttendanceSchema } from "../dtos/attendance.dto";

interface QueryParams {
  employee_id?: string;
  from?: Date;
  to?: Date;
}

interface RouteParams {
  company_id?: string;
  employee_attendance_id?: string;
}

export const getAttendances = async (req: Request, res: Response) => {
  const { company_id } = req.params as RouteParams;
  const { employee_id, from, to } = req.query as QueryParams;

  if (!company_id)
    return res
      .status(400)
      .json({
        message: "Failed to fetch attendance",
        error: "Missing company_id",
      });

  try {
    const attendances = await findAllAttendances(
      company_id,
      employee_id,
      from,
      to
    );
    return res
      .status(200)
      .json({ message: "Attendance successfully fetched", attendances });
  } catch (error) {
    return res
      .status(400)
      .json({
        message: "Failed to fetch attendance",
        error: getErrorMessage(error),
      });
  }
};

export const addAttendance = async (req: Request, res: Response) => {
  const { company_id } = req.params as RouteParams;
  const parsedAttendance = employeeAttendanceSchema.safeParse(req.body);

  if (!parsedAttendance.success)
    return res
      .status(400)
      .json({
        message: "Failed to add attendance. cat",
        error: parsedAttendance.error?.issues,
      });

  if (!company_id)
    return res
      .status(400)
      .json({
        message: "Failed to fetch attendance",
        error: "Missing company_id",
      });

  try {
    const attendance = await addOneAttendance(
      company_id,
      parsedAttendance.data
    );
    return res
      .status(201)
      .json({ message: "Attendance added successfully", attendance });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Failed to add attendance",
        error: getErrorMessage(error),
      });
  }
};

export const updateAttendance = async (req: Request, res: Response) => {
  const { employee_attendance_id } = req.params as RouteParams;

  if (!employee_attendance_id)
    return res
      .status(400)
      .json({
        message: "Failed to update attendance",
        error: "Missing employee_attendance_id",
      });

  const parsedAttendance = employeeAttendanceSchema.safeParse(req.body);

  if (!parsedAttendance.success)
    return res
      .status(400)
      .json({
        message: "Failed to add attendance. cat",
        error: parsedAttendance.error?.issues,
      });

  try {
    const attendance = await updateOneAttendance(
      employee_attendance_id,
      parsedAttendance.data
    );
    return res
      .status(201)
      .json({ message: "Attendance updated successfully", attendance });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Failed to update attendance",
        error: getErrorMessage(error),
      });
  }
};

export const deleteAttendance = async (req: Request, res: Response) => {
  const { employee_attendance_id } = req.params as RouteParams;

  if (!employee_attendance_id)
    return res
      .status(400)
      .json({
        message: "Failed to update attendance",
        error: "Missing employee_attendance_id",
      });

  try {
    const deletedAttendance = await deleteOneAttendance(employee_attendance_id);
    return res.status(200).json({
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Failed to delete attendance",
        error: getErrorMessage(error),
      });
  }
};
