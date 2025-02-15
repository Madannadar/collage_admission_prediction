// models/News.js
import mongoose, { Schema } from "mongoose";

const facultySchema = new Schema({
    facultyName: {
        type: String,
        required: true,
    },
    subjectIds: [{
        type: Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Facalty = mongoose.model('Facalty', facultySchema);