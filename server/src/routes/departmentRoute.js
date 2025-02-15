import express from "express";
import { saveDepartment, getAllDepartmentsByCollegeId } from "../controllers/departmentController.js";

const router = express.Router();

// Route to save a new department
router.post("/save", saveDepartment);

// Route to get all departments by college ID
router.get("/get/:collegeId", getAllDepartmentsByCollegeId);

export default router;