import { Subject } from "../models/SubjectModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import sendResponse from "../utils/apiResonse.js";

const saveSubjects = asyncHandler(async (req, res) => {
    const subjectsData = req.body; // Expecting an array of subjects

    if (!Array.isArray(subjectsData) || subjectsData.length === 0) {
        return sendResponse(res, "error", null, "An array of subjects is required", 400);
    }

    const results = [];

    for (const subjectData of subjectsData) {
        const { SubjectName, departmentId, Year } = subjectData;

        // Check if required fields are provided
        if (!SubjectName || !departmentId || !Year) {
            results.push({ error: "Subject name, department ID, and year are required", data: subjectData });
            continue;
        }

        // Check if the subject already exists
        const existingSubject = await Subject.findOne({ SubjectName, departmentId, Year });

        if (existingSubject) {
            // Update the existing subject
            const updatedSubject = await Subject.findByIdAndUpdate(
                existingSubject._id,
                { $set: subjectData },
                { new: true }
            );

            results.push({ status: "updated", data: updatedSubject });
        } else {
            // Create a new subject
            const newSubject = await Subject.create(subjectData);

            if (!newSubject) {
                results.push({ error: "Failed to create subject", data: subjectData });
            } else {
                results.push({ status: "created", data: newSubject });
            }
        }
    }

    return sendResponse(res, "success", results, "Subjects processed successfully", 200);
});

const getAllSubjects = asyncHandler(async (req, res) => {
    const { departmentId, Year } = req.query;

    // Build the filter object based on provided query parameters
    const filter = {};
    if (departmentId) filter.departmentId = departmentId;
    if (Year) filter.Year = Year;

    // Fetch subjects based on the filter
    const subjects = await Subject.find(filter).populate('departmentId');

    if (!subjects || subjects.length === 0) {
        return sendResponse(res, "error", null, "No subjects found", 404);
    }

    return sendResponse(res, "success", subjects, "Subjects fetched successfully", 200);
});


export { saveSubjects, getAllSubjects };