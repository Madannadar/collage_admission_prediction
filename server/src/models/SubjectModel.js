// models/News.js
import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema({
    SubjectName: {
        type: String,
        required: true,
        unique:true,
    },
    departmentId: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    Year :{
        type : String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Subject = mongoose.model('Subject', subjectSchema);