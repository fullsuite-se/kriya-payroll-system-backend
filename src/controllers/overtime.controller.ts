import { Request, Response } from "express";

interface QueryParams {
  employee_id?: string;
  from?: Date;
  to?: Date;
}

interface RouteParams {
  company_id?: string;
  employee_overtime_id?: string;
}

export const getOvertimes = async (req: Request, res: Response) => {
  return;
};

export const addOneOvertime = async (req: Request, res: Response) => {
  return;
};

export const updateOneOvertime = (req: Request, res: Response) => {
  return;
};

export const deleteOneOvertime = (req: Request, res: Response) => {
  return;
};
