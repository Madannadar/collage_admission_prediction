import { Facalty } from "../models/FacultyModal.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import sendResponse from "../utils/apiResonse.js";

const saveFacalty = asyncHandler(async (req, res) => {
    const faculties = req.body; // Array of faculty objects

    if (!Array.isArray(faculties)) {
        return sendResponse(res, "error", null, "Expected an array of faculties", 400);
    }

    try {
        const savedFaculties = await Promise.all(
            faculties.map(async (faculty) => {
                const { facultyName, departmentId, subjectIds } = faculty;

                // Check if faculty already exists
                const existingFaculty = await Facalty.findOne({ facultyName });

                if (existingFaculty) {
                    // Update existing faculty
                    existingFaculty.subjectIds = subjectIds;
                    await existingFaculty.save();
                    return existingFaculty;
                } else {
                    // Create new faculty
                    const newFaculty = await Facalty.create({
                        facultyName,
                        departmentId,
                        subjectIds,
                    });
                    return newFaculty;
                }
            })
        );

        return sendResponse(res, "success", savedFaculties, "Faculties saved/updated successfully", 200);
    } catch (error) {
        return sendResponse(res, "error", null, "Error saving/updating faculties", 500);
    }
});

const getFacultyLabels = asyncHandler(async (req, res) => {
    try {
        const facultyLabels = await Facalty.find({}, { facultyName: 1 });

        return sendResponse(res, "success", facultyLabels, "Faculty labels retrieved successfully", 200);
    } catch (error) {
        return sendResponse(res, "error", null, "Error retrieving faculty labels", 500);
    }
});

const getFaculties = asyncHandler(async (req, res) => {
    try {
        // Fetch faculties and populate the departmentId and subjectIds
        const faculties = await Facalty.find().populate("departmentId").populate("subjectIds");

        // Transform the data to include SubjectName in an array form
        const transformedFaculties = faculties.map(faculty => {
            return {
                ...faculty._doc, // Spread the existing faculty document
                SubjectName: faculty.SubjectName ? [faculty.SubjectName] : [] // Ensure SubjectName is an array
            };
        });

        // Send the transformed data in the response
        return sendResponse(res, "success", transformedFaculties, "Faculties retrieved successfully", 200);
    } catch (error) {
        return sendResponse(res, "error", null, "Error retrieving faculties", 500);
    }
});

export {
    saveFacalty,
    getFaculties,
    getFacultyLabels
};