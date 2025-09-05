import { Management } from "@prisma/client";
import prisma from "../config/prisma";
import { getCreatedUpdatedIsoUtcNow } from "../utils/date.utility";
import { generateUUIV4 } from "../utils/ids.utility";
import { splitByComma } from "../utils/strings.utility";

export const createUserToManageCompany = async (company_id: string, user_ids_str: string) => {
    const { created_at, updated_at } = getCreatedUpdatedIsoUtcNow();

    const user_ids = splitByComma(user_ids_str);

    const managementsData = user_ids.map(id => ({
        management_id: generateUUIV4(),
        user_id: id,
        company_id,
        created_at,
        updated_at,
    }));

    const managements = await prisma.management.createMany({
        data: managementsData,
    });

    return managements;
};

export const findCompaniesUserHasAccess = async (user_id: string) => {
    const companiesRaw = await prisma.company.findMany({
        where: {
            managements: {
                some: { user_id },
            }
        },
        include: {
            companies_info: true
        }
    });

    const companies = companiesRaw.map(c => ({
        company_id: c.company_id,
        company_name: c.company_name,
        company_trade_name: c.company_trade_name,
        company_email: c.company_email,
        company_logo: c.company_logo,

        company_address: c.companies_info?.company_address,
        company_phone: c.companies_info?.company_phone,
        company_tin: c.companies_info?.company_tin,
        business_type: c.companies_info?.business_type,
    }));

    return companies;
};


export const findUsersWithCompanyAccess = async (company_id: string): Promise<Management[]> => {
    return await prisma.management.findMany({
        where: { company_id },
    });
};


export const deleteUserAccessToCompany = async (management_id: string) => {
    return await prisma.management.delete({
        where: { management_id },
    });
};
