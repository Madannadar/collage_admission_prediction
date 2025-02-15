import express from "express";
import { saveSubjects, getAllSubjects } from "../controllers/subjectController.js";

const router = express.Router();

router.post("/save", saveSubjects);
router.get("/get", getAllSubjects);

export default router;