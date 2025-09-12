import { Request, Response } from "express";


interface QueryParams {
    employee_id?: string,
    from?: Date,
    to?: Date
}

interface RouteParams {
    company_id?: string,
    employee_absence_id?: string,
};


export const getAbsences = (req: Request, res: Response) => {
    return;
};


export const addOneAbsence = (req: Request, res: Response) => {
    return;
};


export const updateOneAbsence = (req: Request, res: Response) => {
    return;
};


export const deleteOneAbsence = (req: Request, res: Response) => {
    return;
};

