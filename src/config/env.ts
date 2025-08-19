import dotenv from "dotenv";
dotenv.config();


 const env = {  
    PORT: process.env.PORT,
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL_PROD: process.env.FRONTEND_URL_PROD,
    FRONTEND_URL_DEV: process.env.FRONTEND_URL_DEV,

};

export default env;