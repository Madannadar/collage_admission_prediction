import express from "express";
import { generateTimeTable, getAllTimeTable } from "../controllers/timeTable.controller.js";

const router = express.Router();

router.post("/generate/:userId", generateTimeTable);
router.get("/all/:userId", getAllTimeTable);

export default router;