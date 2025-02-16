// models/Timetable.js
import mongoose, { Schema } from "mongoose";

const timetableSchema = new Schema({
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    entries: [{
        day: {
            type: String,
            required: true,
        },
        startTime: {
            type: String,
            required: true,
        },
        endTime: {
            type: String,
            required: true,
        },
        subjectId: {
            type: Schema.Types.ObjectId,
            ref: 'Subject',
            required: true,
        },
        facultyId: {
            type: Schema.Types.ObjectId,
            ref: 'Facalty',
            required: true,
        },
        room: {
            type: String,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Timetable = mongoose.model('Timetable', timetableSchema);