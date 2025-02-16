import mongoose, { Schema } from "mongoose";

const departmentSchema = new Schema({
    departmentName: {
        type: String,
        required: true,
        unique: true,
    },
    collegeId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    subjects: [{
        subjectName: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Department = mongoose.model('Department', departmentSchema);