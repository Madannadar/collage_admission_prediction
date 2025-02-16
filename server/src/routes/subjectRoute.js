import express from "express";
import { getSubjects } from "../controllers/subjectController.js";

const router = express.Router();

// router.post("/save", saveSubjects);
router.get("/get", getSubjects);

export default router;