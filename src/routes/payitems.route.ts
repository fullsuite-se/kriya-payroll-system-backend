import * as payitemController from "../controllers/payitem.controller";
import express from "express";
const router = express.Router();

//fetches all payitems
router.get("/", payitemController.getPayitems);

export default router;
