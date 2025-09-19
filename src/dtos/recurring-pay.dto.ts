import { z } from "zod";

export const recurringPaySchema = z.object({
    // recurring_pay_id: z.string(),
    employee_id: z.string(),
    // company_id: z.string(),
    payitem_id: z.string(),
    amount: z.number(),
    date_start: z.coerce.date(),
    date_end: z.coerce.date().nullable(),
}).strip();


export type RecurringPayDto = z.infer<typeof recurringPaySchema>;