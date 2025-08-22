import { Request, Response } from "express";
import { createOneCompany, findAllCompanies, findCompanies, findOneCompany, updateOneCompany, updateOneCompanyInfo } from "../services/company.service";
import { getErrorMessage } from "../utils/errors.utility";
import { CompanyDto, CompanyInfoDto, companyInfoSchema, CompanyInfoUpdateDto, companyInfoUpdateSchema, companySchema, CompanyUpdateDto, companyUpdateSchema } from "../dtos/company.dto";

export const getCompanies = async (req: Request, res: Response) => {
    const query = req.query.query as string;

    try {
        if (query) {
            const companies = await findCompanies(query);
            return res.status(200).json({ message: "Fetched successfully", companies });
        }

        const companies = await findAllCompanies();
        return res.status(200).json({ message: "Fetched successfully", companies });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch companies", error: getErrorMessage(error) });
    }
};

export const getCompany = async (req: Request, res: Response) => {

    const company_id = req.params.company_id as string;

    if (!company_id) return res.status(500).json({
        message: "Failed to fetch companies", error: " The client sent a malformed or incomplete request"
    });

    try {
        const company = await findOneCompany(company_id);
        return res.status(200).json({ message: "Fetched successfully", company });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch companies", error: getErrorMessage(error) });
    }
};

export const addCompany = async (req: Request, res: Response) => {
    const parsedCompany = companySchema.safeParse(req.body);
    const parsedCompanyInfo = companyInfoSchema.safeParse(req.body);

    if (!parsedCompany.success) return res.status(400).json({ message: "Faild to add company", error: parsedCompany.error.issues });
    if (!parsedCompanyInfo.success) return res.status(400).json({ message: "Faild to add company", error: parsedCompanyInfo.error.issues });

    const companyData: CompanyDto = parsedCompany.data;
    const companyInfoData: CompanyInfoDto = parsedCompanyInfo.data;

    try {
        const { company, companyInfo } = await createOneCompany(companyData, companyInfoData);
        return res.status(201).json({ message: "Company created successfully", company, companyInfo });
    } catch (error) {
        return res.status(500).json({ message: "Failed to create company", error: getErrorMessage(error) });
    }
};

export const updateCompany = async (req: Request, res: Response) => {
    const parsedCompany = companyUpdateSchema.safeParse(req.body);
    const company_id = req.params.company_id as string;

    if (!parsedCompany.success) return res.status(400).json({ message: "Faild to add company", error: parsedCompany.error.issues });

    const companyData: CompanyUpdateDto = parsedCompany.data;

    try {
        const company = await updateOneCompany(company_id, companyData);
        return res.status(200).json({ message: "Company updated successfully", company });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update company", error: getErrorMessage(error) });
    }
};

export const updateCompanyInfo = async (req: Request, res: Response) => {
    const parsedCompanyInfo = companyInfoUpdateSchema.safeParse(req.body);
    const company_id = req.params.company_id as string;

    if (!parsedCompanyInfo.success) return res.status(400).json({ message: "Failed to update company info", error: parsedCompanyInfo.error.issues });

    const companyInfoData: CompanyInfoUpdateDto = parsedCompanyInfo.data;

    try {
        const companyInfo = await updateOneCompanyInfo(company_id, companyInfoData);
        return res.status(200).json({ message: "Company info updated successfully", companyInfo });
    } catch (error) {
        return res.status(500).json({ message: "Failed to update company info", error: getErrorMessage(error) });
    }
};

