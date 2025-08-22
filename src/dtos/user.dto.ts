import { z } from "zod";

export const userSchema = z.object({
    user_id: z.string(),
    user_email: z.string().email(),
    first_name: z.string(),
    last_name: z.string(),
    user_pic: z.string().nullable(),
    contact_number: z.string().nullable(),
});

export type userDto = z.infer<typeof userSchema>;