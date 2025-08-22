import express from "express";
import path from "path";
import cors, { CorsOptions } from "cors";
import env from "./config/env";
import routes from "./routes";
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, "..", "public")));

const corsOptions: CorsOptions = {
  origin: [
    env.FRONTEND_URL_DEV || "http://localhost:5173",
    env.FRONTEND_URL_PROD || "http://localhost:5173"
  ],
  credentials: false,
};

app.use(cors(corsOptions));
app.use('/api/v1', routes);



app.get('/', (_req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});


export default app;