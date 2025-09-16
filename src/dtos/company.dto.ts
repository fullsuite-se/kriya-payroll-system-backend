import { z } from 'zod';

/**
 * strip() removes extra key-value that are not defined in the corresponding zod object. 
 * passthrough() retains the exra key-value pair after required fields are validated. 
 */
export const companySchema = z.object({
    company_id: z.string().trim(),
    company_name: z.string().trim(),
    company_trade_name: z.string().trim(),
    company_email: z.string().trim().email(),
    company_logo: z.string().url("Invalid url for company logo"),
}).strip();

export const companyInfoSchema = z.object({
    company_id: z.string().trim(),
    company_address: z.string().trim().max(200),
    company_phone: z.string().trim(),
    company_tin: z.string().trim().max(20),
    business_type: z.enum([
        "SOLE_PROPRIETORSHIP",
        "PARTNERSHIP",
        "LIMITED_LIABILITY_COMPANY",
        "CORPORATION",
        "COOPERATIVE",
        "NON_PROFIT_ORGANIZATION",
    ]),
}).strip();

//partial makes the fields optional
export const companyUpdateSchema = companySchema.omit({ company_id: true }).strip();
export const companyInfoUpdateSchema = companyInfoSchema.omit({ company_id: true }).strip();

export const companyHolidaySchema = z.object({
    holiday_date: z.coerce.date(),
    holiday_name: z.string(),
    holiday_type: z.enum(['REGULAR', 'SPECIAL', 'CUSTOM']),
    holiday_rate: z.number(),
});


export type CompanyDto = z.infer<typeof companySchema>;
export type CompanyInfoDto = z.infer<typeof companyInfoSchema>;
export type CompanyUpdateDto = z.infer<typeof companyUpdateSchema>;
export type CompanyInfoUpdateDto = z.infer<typeof companyInfoUpdateSchema>;
export type CompanyHolidayDto = z.infer<typeof companyHolidaySchema>;