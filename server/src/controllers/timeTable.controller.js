import { Timetable } from "../models/TimeTable.js";
import { Department } from "../models/departmentModel.js";
import { Subject } from "../models/SubjectModel.js";
import { Facalty } from "../models/FacultyModal.js";
import { User } from "../models/userModal.js";

// Helper function to check time overlaps
const parseTime = (timeStr) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
};

const checkTimeOverlap = (existingSlots, newDay, newStart, newEnd) => {
    return existingSlots.some(slot => {
        if (slot.day !== newDay) return false;
        const slotStart = parseTime(slot.startTime);
        const slotEnd = parseTime(slot.endTime);
        return (
            (newStart >= slotStart && newStart < slotEnd) ||
            (newEnd > slotStart && newEnd <= slotEnd) ||
            (newStart <= slotStart && newEnd >= slotEnd)
        );
    });
};

// Generate timetable
const generateTimeTable = async (req, res) => {
    try {
        const { userId } = req.params;
        const { days, timeSlots } = req.body;

        if (!days || !timeSlots) {
            return res.status(400).json({ message: "Days and timeSlots are required" });
        }

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const departments = await Department.find({ collegeId: userId });
        if (!departments.length) return res.status(404).json({ message: "No departments found" });

        // Delete existing timetables for these departments
        const departmentIds = departments.map(dept => dept._id);
        await Timetable.deleteMany({ departmentId: { $in: departmentIds } });

        for (const department of departments) {
            const subjects = await Subject.find({ departmentId: department._id });
            if (!subjects.length) continue;

            const subjectIds = subjects.map(subj => subj._id);
            const faculties = await Facalty.find({ subjectIds: { $in: subjectIds } });
            if (!faculties.length) continue;

            const entries = [];
            for (const day of days) {
                for (const timeSlot of timeSlots) {
                    const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];
                    const subjectFaculties = faculties.filter(faculty => 
                        faculty.subjectIds.some(subjId => subjId.equals(randomSubject._id))
                    );
                    if (!subjectFaculties.length) continue;

                    const randomFaculty = subjectFaculties[Math.floor(Math.random() * subjectFaculties.length)];
                    const isFacultyBooked = entries.some(entry => 
                        entry.day === day &&
                        entry.startTime === timeSlot.startTime &&
                        entry.endTime === timeSlot.endTime &&
                        entry.facultyId.equals(randomFaculty._id)
                    );

                    if (!isFacultyBooked) {
                        entries.push({
                            day,
                            ...timeSlot,
                            subjectId: randomSubject._id,
                            facultyId: randomFaculty._id,
                        });
                    }
                }
            }

            const timetable = new Timetable({ departmentId: department._id, entries });
            await timetable.save();
        }

        res.status(201).json({ message: "Timetables generated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

// Get all timetables
const getAllTimeTable = async (req, res) => {
    try {
        const { userId } = req.params;

        const departments = await Department.find({ collegeId: userId });
        const departmentIds = departments.map(dept => dept._id);

        const timetables = await Timetable.find({ departmentId: { $in: departmentIds } })
            .populate('departmentId')
            .populate('entries.subjectId')
            .populate('entries.facultyId');

        res.status(200).json(timetables);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }

};

export { generateTimeTable, getAllTimeTable };