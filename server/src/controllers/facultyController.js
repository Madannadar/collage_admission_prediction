import { Facalty } from "../models/FacultyModal.js";
import { Subject } from "../models/SubjectModel.js"; // Import the Subject model
import { Department } from "../models/departmentModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import sendResponse from "../utils/apiResonse.js";

const saveFacalty = asyncHandler(async (req, res) => {
    const faculties = req.body;

    if (!Array.isArray(faculties)) {
        return sendResponse(res, "error", null, "Expected an array of faculties", 400);
    }

    try {
        const savedFaculties = await Promise.all(
            faculties.map(async (faculty) => {
                const { facultyName, subjectNames } = faculty;

                // Find all departments to match subjects
                const departments = await Department.find({});

                // Collect subject IDs by matching subject names
                const subjectIds = [];
                departments.forEach((dept) => {
                    dept.subjects.forEach((sub) => {
                        if (subjectNames.includes(sub.subjectName)) {
                            subjectIds.push(sub._id);
                        }
                    });
                });

                if (subjectIds.length === 0) {
                    throw new Error(`No matching subjects found for ${facultyName}`);
                }

                // Check if faculty already exists
                const existingFaculty = await Facalty.findOne({ facultyName });

                if (existingFaculty) {
                    existingFaculty.subjectIds = subjectIds;
                    await existingFaculty.save();
                    return existingFaculty;
                } else {
                    // Create new faculty
                    const newFaculty = await Facalty.create({
                        facultyName,
                        subjectIds,
                    });
                    return newFaculty;
                }
            })
        );

        return sendResponse(res, "success", savedFaculties, "Faculties saved/updated successfully", 200);
    } catch (error) {
        return sendResponse(res, "error", null, error.message, 500);
    }
});


const getFaculties = asyncHandler(async (req, res) => {
    try {
        // Fetch faculties and populate the subjectIds to get subject names
        const faculties = await Facalty.find().populate("subjectIds", "SubjectName -_id");

        // Transform the data to include subject names in an array form
        const transformedFaculties = faculties.map(faculty => {
            return {
                facultyName: faculty.facultyName,
                subjectNames: faculty.subjectIds.map(subject => subject.SubjectName)
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
};