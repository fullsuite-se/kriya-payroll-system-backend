import { v4 as uuidv4 } from "uuid";
import crypto from "crypto";
import env from "../config/env";

export const generateUUIV4 = () => {
    return uuidv4();
};

export const generateAlphaNumericId = (
    prefix: string = env.ID_PREFIX ?? "ID",
    num_length: number = parseInt(env.ID_LENGTH ?? "6", 10)
): string => {
    const max = Math.pow(10, num_length);
    const randomNumber = crypto.randomInt(0, max)
        .toString()
        .padStart(num_length, "0");

    return `${prefix}-${randomNumber}`;
};