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
        type: String,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Department = mongoose.model('Department', departmentSchema);