import { Request, Response } from "express";


interface QueryParams {
    employee_id?: string,
    from?: Date,
    to?: Date
}

interface RouteParams {
    company_id?: string,
    employee_leave_id?: string,
};


export const getLeaves = (req: Request, res: Response) => {
    return;
};


export const addOneLeave = (req: Request, res: Response) => {
    return;
};


export const updateOneLeave = (req: Request, res: Response) => {
    return;
};


export const deleteOneLeave = (req: Request, res: Response) => {
    return;
};

