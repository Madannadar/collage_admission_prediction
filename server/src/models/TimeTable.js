import mongoose from "mongoose";

const timeSlotSchema = new mongoose.Schema({
    day: { type: String, required: true },
    time: { type: String, required: true },
    faculty: { type: String, required: true }
});

const subjectTimetableSchema = new mongoose.Schema({
    subjectName: { type: String, required: true },
    year: { type: Number, required: true },
    faculty: [{ type: String, required: true }],
    timeSlots: [timeSlotSchema]
});

const departmentTimetableSchema = new mongoose.Schema({
    departmentName: { type: String, required: true },
    subjects: [subjectTimetableSchema]
});

const timetableSchema = new mongoose.Schema({
    collegeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    timetable: [departmentTimetableSchema],
    createdAt: { type: Date, default: Date.now }
});

const Timetable = mongoose.model("Timetable", timetableSchema);

export default Timetable;