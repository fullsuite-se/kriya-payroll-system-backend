import { Request, Response } from "express";


interface QueryParams {
    employee_id?: string,
    from?: Date,
    to?: Date
}

interface RouteParams {
    company_id?: string,
    employee_restday_id?: string,
};


export const getRestdays = (req: Request, res: Response) => {
    return;
};


export const addOneRestday = (req: Request, res: Response) => {
    return;
};


export const updateOneRestday = (req: Request, res: Response) => {
    return;
};


export const deleteOneRestday = (req: Request, res: Response) => {
    return;
};

