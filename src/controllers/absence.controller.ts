import { Request, Response } from "express";
import { getErrorMessage } from "../utils/errors.utility";
import {
  addAbsence,
  deleteAbsence,
  findAllAbsence,
  updateAbsence,
} from "../services/absence.service";
import { employeeAbsenceSchema } from "../dtos/attendance.dto";

interface QueryParams {
  employee_id?: string;
  from?: Date;
  to?: Date;
}

interface RouteParams {
  company_id?: string;
  employee_absence_id?: string;
}

export const getAbsences = async (req: Request, res: Response) => {
  const { company_id } = req.params as RouteParams;
  const { employee_id, from, to } = req.query as QueryParams;

  if (!company_id)
    return res.status(400).json({
      message: "Failed to fetch absence",
      error: "Missing company_id",
    });

  try {
    const absences = await findAllAbsence(company_id, employee_id, from, to);
    return res
      .status(200)
      .json({ message: "Absences successfully fetched", absences });
  } catch (error) {
    return res.status(400).json({
      message: "Failed to fetch absences",
      error: getErrorMessage(error),
    });
  }
};

export const addOneAbsence = async (req: Request, res: Response) => {
  const { company_id } = req.params as RouteParams;
  const parsedAbsence = employeeAbsenceSchema.safeParse(req.body);

  if (!parsedAbsence.success)
    return res.status(400).json({
      message: "Failed to add absence. cat",
      error: parsedAbsence.error?.issues,
    });

  if (!company_id)
    return res.status(400).json({
      message: "Failed to fetch absence",
      error: "Missing company_id",
    });

  try {
    const absence = await addAbsence(company_id, parsedAbsence.data);
    return res
      .status(201)
      .json({ message: "Absence added successfully", absence });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to add absence",
      error: getErrorMessage(error),
    });
  }
};

export const updateOneAbsence = async (req: Request, res: Response) => {
  const { employee_absence_id } = req.params as RouteParams;

  if (!employee_absence_id)
    return res.status(400).json({
      message: "Failed to update absence",
      error: "Missing employee_absence_id",
    });

  const parsedAbsence = employeeAbsenceSchema.safeParse(req.body);

  if (!parsedAbsence.success)
    return res.status(400).json({
      message: "Failed to add absence. cat",
      error: parsedAbsence.error?.issues,
    });

  try {
    const absence = await updateAbsence(
      employee_absence_id,
      parsedAbsence.data
    );
    return res
      .status(201)
      .json({ message: "Absence updated successfully", absence });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update absence",
      error: getErrorMessage(error),
    });
  }
};

export const deleteOneAbsence = async (req: Request, res: Response) => {
  const { employee_absence_id } = req.params as RouteParams;

  if (!employee_absence_id)
    return res.status(400).json({
      message: "Failed to update absence",
      error: "Missing employee_absence_id",
    });

  try {
    const deletedAbsence = await deleteAbsence(employee_absence_id);
    return res.status(200).json({
      message: "Attendance deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to delete attendance",
      error: getErrorMessage(error),
    });
  }
};
