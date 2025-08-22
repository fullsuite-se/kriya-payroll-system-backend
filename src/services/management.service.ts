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
    return await prisma.company.findMany({
        where: {
            managements: {
                some: { user_id },
            }
        }
    });
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
