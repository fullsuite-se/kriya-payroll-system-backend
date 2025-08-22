import { Company } from "@prisma/client";
import prisma from "../config/prisma";
import { CompanyDto, CompanyInfoDto, CompanyInfoUpdateDto, CompanyUpdateDto } from "../dtos/company.dto";
import { getCreatedUpdatedIsoUtcNow, getIsoUTCNow } from "../utils/date.utility";
import { generateUUIV4 } from "../utils/ids.utility";

export const findAllCompanies = async (): Promise<Company[]> => {
    return await prisma.company.findMany();
};

export const findCompanies = async (query: string): Promise<Company[]> => {
    return await prisma.company.findMany({
        where: {
            OR: [
                {
                    company_name: {
                        contains: query,
                    },
                },
                {
                    company_trade_name: {
                        contains: query,
                    }
                },
                {
                    company_email: {
                        contains: query,
                    }
                },
            ]
        }
    });
};

export const findOneCompany = async (company_id: string) => {
    return await prisma.company.findFirst({
        where: { company_id },
        include: { companies_info: true }
    });
};

export const createOneCompany = async (companyData: CompanyDto, companyInfoData: CompanyInfoDto) => {
    const { created_at, updated_at } = getCreatedUpdatedIsoUtcNow();

    return await prisma.$transaction(async (tx) => {
        const company = await tx.company.create({
            data: {
                ...companyData,
                created_at,
                updated_at,
            }
        });

        const companyInfo = await tx.companyInfo.create({
            data: {
                company_info_id: generateUUIV4(),
                ...companyInfoData,
                created_at,
                updated_at,
            }
        });

        return { company, companyInfo };
    });

};

export const updateOneCompany = async (company_id: string, companyData: CompanyUpdateDto) => {
    return await prisma.company.update({
        where: { company_id },
        data: {
            ...companyData,
            updated_at: getIsoUTCNow(),
        }
    });
};

export const updateOneCompanyInfo = async (company_id: string, companyInfoData: CompanyInfoUpdateDto) => {
    return await prisma.companyInfo.update({
        where: { company_id },
        data: {
            ...companyInfoData,
            updated_at: getIsoUTCNow(),
        }
    });
};