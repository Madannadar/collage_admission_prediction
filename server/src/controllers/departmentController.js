import { Department } from "../models/departmentModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import sendResponse from "../utils/apiResonse.js";

const saveDepartment = asyncHandler(async (req, res) => {
    const { departments } = req.body; // Expect an array of department objects

    // Check if departments array is provided
    if (!departments || !Array.isArray(departments)) {
        return sendResponse(res, "error", null, "Departments array is required", 400);
    }

    const results = [];
    const errors = [];

    // Loop through each department in the array
    for (const dept of departments) {
        const { departmentName, collegeId } = dept;

        // Validate required fields
        if (!departmentName || !collegeId) {
            errors.push({ departmentName, collegeId, error: "Department name and college ID are required" });
            continue;
        }

        try {
            // Check if the department already exists
            const existingDepartment = await Department.findOne({ departmentName, collegeId });

            if (existingDepartment) {
                // Update the existing department
                existingDepartment.departmentName = departmentName; // Update fields if needed
                await existingDepartment.save();
                results.push({ departmentName, collegeId, action: "updated", department: existingDepartment });
            } else {
                // Create a new department
                const newDepartment = await Department.create({ departmentName, collegeId });
                results.push({ departmentName, collegeId, action: "created", department: newDepartment });
            }
        } catch (error) {
            errors.push({ departmentName, collegeId, error: error.message });
        }
    }

    // Check if there were any errors
    if (errors.length > 0) {
        return sendResponse(res, "partial_success", { results, errors }, "Some departments could not be processed", 207);
    }

    return sendResponse(res, "success", results, "All departments processed successfully", 200);
});

const getAllDepartmentsByCollegeId = asyncHandler(async (req, res) => {
    const { collegeId } = req.params;

    // Check if collegeId is provided
    if (!collegeId) {
        return sendResponse(res, "error", null, "College ID is required", 400);
    }

    // Find all departments associated with the collegeId
    const departments = await Department.find({ collegeId });

    if (!departments || departments.length === 0) {
        return sendResponse(res, "error", null, "No departments found for this college", 404);
    }

    return sendResponse(res, "success", departments, "Departments retrieved successfully", 200);
});

export {
    saveDepartment,
    getAllDepartmentsByCollegeId
};