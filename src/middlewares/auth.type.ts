import { JwtPayload } from "jsonwebtoken";

export interface AuthPayload extends JwtPayload {
    system_user_id: string,
    system_user_email: string,
    system_company_id: string,
    // servicePermissions: array of objects
    // accessPermissions: array of object
};