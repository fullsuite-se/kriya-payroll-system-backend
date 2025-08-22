import dotenv from "dotenv";
dotenv.config();


const env = {
    PORT: process.env.PORT,
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL_PROD: process.env.FRONTEND_URL_PROD,
    FRONTEND_URL_DEV: process.env.FRONTEND_URL_DEV,
    ID_PREFIX: process.env.ID_PREFIX,
    ID_LENGTH: process.env.ID_LENGTH,
    HRIS_BACKEND_URL: process.env.HRIS_BACKEND_URL,
    SHARED_API_KEY: process.env.SHARED_API_KEY,
};

export default env;