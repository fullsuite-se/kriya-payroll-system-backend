import axios from "axios";
import env from "./env";

export const hris_api = axios.create({
    baseURL: env.HRIS_BACKEND_URL || "http://localhost:3000",
    withCredentials: true,
    headers: {
        'x-api-key': env.SHARED_API_KEY,
    }
});

