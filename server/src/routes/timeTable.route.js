import express from "express";
import { generateTimetable,getTimetable } from "../controllers/timeTable.controller.js";

const router = express.Router();

router.post("/generate/:collegeId", generateTimetable);

// GET Timetable by College ID
router.get("/:collegeId",getTimetable);


export default router;