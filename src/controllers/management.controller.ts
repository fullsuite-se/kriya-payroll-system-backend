import { Request, Response } from "express";
import { canBeSplitByComma } from "../utils/strings.utility";
import { getErrorMessage } from "../utils/errors.utility";
import { createUserToManageCompany, deleteUserAccessToCompany, findCompaniesUserHasAccess, findUsersWithCompanyAccess } from "../services/management.service";
import { AttachUserInfoToManagement } from "../services/user.service";

export const addUserToManage = async (req: Request, res: Response) => {
    console.log(req.body);

    const company_id = req.params.company_id as string;
    const { user_ids } = req.body as { user_ids: string };

    if (!company_id || !user_ids) return res.status(500).json({
        message: "Failed to add users", error: " The client sent a malformed or incomplete request"
    });

    if (!canBeSplitByComma(user_ids)) return res.status(500).json({
        message: "Failed to add users", error: " The user_ids is invalid"
    });

    try {
        const managements = await createUserToManageCompany(company_id, user_ids);
        return res.status(201).json({ message: "Users addedd successfully", managements });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch companies", error: getErrorMessage(error) });
    }

};

export const getCompaniesUserHasAccess = async (req: Request, res: Response) => {
    // const user_id = req.params.user_id as string;
    const user_id = req.user?.system_user_id;

    if (!user_id) return res.status(500).json({
        message: "Failed to fetch companies", error: " The client sent a malformed or incomplete request"
    });

    try {
        const companies = await findCompaniesUserHasAccess(user_id);
        return res.status(200).json({ message: "Companies fetched successfully", companies });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch companies", error: getErrorMessage(error) });
    }
};

export const getUsersWithCompanyAccess = async (req: Request, res: Response) => {
    const company_id = req.params.company_id as string;

    if (!company_id) return res.status(500).json({
        message: "Failed to fetch users", error: " The client sent a malformed or incomplete request"
    });

    try {
        const managements = await findUsersWithCompanyAccess(company_id);

        const users = await AttachUserInfoToManagement(managements);
        return res.status(200).json({ message: "Users fetched successfully", users });
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch users", error: getErrorMessage(error) });
    }
};

export const deleteUserAccess = async (req: Request, res: Response) => {
    const management_id = req.params.management_id as string;

    if (!management_id) return res.status(500).json({
        message: "Failed to fetch companies", error: " The client sent a malformed or incomplete request"
    });

    try {
        const management = await deleteUserAccessToCompany(management_id);
        return res.status(200).json({ message: "Users fetched successfully", management });
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete access", error: getErrorMessage(error) });
    }
};