import mongoose from "mongoose";
import { User } from "../models/userModal.js";
import { Department } from "../models/departmentModel.js";
import { Facalty } from "../models/FacultyModal.js";
import Timetable from "../models/TimeTable.js";

const generateTimetable = async (req, res) => {
    const { collegeId } = req.params;

    try {
        // Step 1: Fetch the College Details
        const college = await User.findById(collegeId);
        if (!college) {
            return res.status(404).json({ message: "College not found" });
        }

        // Step 2: Fetch all departments associated with the college
        const departments = await Department.find({ collegeId: collegeId });
        if (!departments.length) {
            return res.status(404).json({ message: "No departments found for this college" });
        }

        // Step 3: Initialize the timetable structure
        const timetable = [];

        // Step 4: Iterate through each department to generate its timetable
        for (const department of departments) {
            console.log(`Processing department: ${department.departmentName}`);

            const departmentTimetable = {
                departmentName: department.departmentName,
                subjects: []
            };

            // Step 5: Access subjects directly from the department document
            const subjects = department.subjects;
            console.log(`Subjects found for department ${department.departmentName}:`, subjects);

            if (!subjects.length) {
                console.log(`No subjects found for department: ${department.departmentName}`);
                continue; // Skip to the next department if no subjects are found
            }

            // Step 6: Generate timetable for each subject
            for (const subject of subjects) {
                console.log(`Processing subject: ${subject.subjectName}`);

                // Step 7: Fetch faculty for the subject
                const faculty = await Facalty.find({ subjectIds: subject._id });
                console.log(`Faculty found for subject ${subject.subjectName}:`, faculty);

                if (!faculty.length) {
                    console.log(`No faculty found for subject: ${subject.subjectName}`);
                    continue; // Skip to the next subject if no faculty are found
                }

                // Step 8: Generate time slots for the subject
                const timeSlots = generateTimeSlots();

                // Step 9: Assign faculty to time slots without clashes
                const subjectTimetable = {
                    subjectName: subject.subjectName,
                    year: subject.year,
                    faculty: faculty.map(f => f.facultyName),
                    timeSlots: assignTimeSlotsWithoutClash(timeSlots, faculty, subject)
                };

                departmentTimetable.subjects.push(subjectTimetable);
            }

            timetable.push(departmentTimetable);
        }

        const newTimetable = new Timetable({
            collegeId: collegeId,
            timetable: timetable
        });

        await newTimetable.save();

        // Step 12: Send the generated timetable as response
        res.status(200).json({ timetable });
    } catch (error) {
        console.error("Error generating timetable:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Helper function to generate time slots
const generateTimeSlots = () => {
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const timeSlots = ["9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM"];

    const slots = [];
    for (const day of days) {
        for (const time of timeSlots) {
            slots.push({ day, time, isBooked: false });
        }
    }

    return slots;
};

// Helper function to assign time slots without clashes
const assignTimeSlotsWithoutClash = (timeSlots, faculty, subject) => {
    const assignedSlots = [];
    let slotIndex = 0;

    // Determine the number of slots needed for the subject
    const slotsNeeded = 3; // Example: Assign 3 slots per subject

    for (let i = 0; i < slotsNeeded; i++) {
        while (slotIndex < timeSlots.length && timeSlots[slotIndex].isBooked) {
            slotIndex++;
        }

        if (slotIndex < timeSlots.length) {
            timeSlots[slotIndex].isBooked = true;
            assignedSlots.push({
                day: timeSlots[slotIndex].day,
                time: timeSlots[slotIndex].time,
                faculty: faculty[i % faculty.length].facultyName // Rotate through faculty members
            });
        }
    }

    return assignedSlots;
};

const getTimetable = async (req, res) => {
    const { collegeId } = req.params;

    try {
        // Step 1: Find the timetable for the given collegeId
        const timetable = await Timetable.findOne({ collegeId: collegeId });

        // Step 2: Check if the timetable exists
        if (!timetable) {
            return res.status(404).json({ message: "Timetable not found for this college" });
        }

        // Step 3: Send the timetable as a response
        res.status(200).json({ timetable });
    } catch (error) {
        console.error("Error fetching timetable:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export { generateTimetable,getTimetable };