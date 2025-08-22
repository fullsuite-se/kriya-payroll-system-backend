import { z } from "zod";


export const managementSchema = z.object({
    management_id: z.string(),
    user_id: z.string(),
    company_id: z.string(),
    created_at: z.union([z.string().datetime(), z.date()]),
    updated_at: z.union([z.string().datetime(), z.date()])
}).strip();


export type ManagementDto = z.infer<typeof managementSchema>;
