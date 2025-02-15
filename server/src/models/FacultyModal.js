// models/News.js
import mongoose, { Schema } from "mongoose";

const facultySchema = new Schema({
    facultyName: {
        type: String,
        required: true,
    },
    departmentId: {
        type: String,
        required: true,
    },
    // owner: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // },
    departmentName: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Facalty = mongoose.model('Facalty', facultySchema);