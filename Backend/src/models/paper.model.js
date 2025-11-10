import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
    paper: {
        type: string,  // cloudinary
        required: true
    },
    papertitle: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    university: {
        type: string,
        required: true
    },
    examyear: {
        type: Number,
        required: true
    },
    examtype: {
        type: string,
        enum: ["Midterm", "Final", "Quiz", "Assignment", "Practice"],
        required: true
    },
    professor: {
        type: String
    },
    subjectcode: {
        type: String
    },
    semester: {
        type: Number
    },
}, {timestamps: true})