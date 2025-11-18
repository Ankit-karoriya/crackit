import mongoose from "mongoose";

const paperSchema = new mongoose.Schema({
    paperfile: {
        type: String,  // cloudinary
        required: true
    },
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
        type: String,
        required: true
    },
    examyear: {
        type: Number,
        required: true
    },
    examtype: {
        type: String,
        enum: ["Midterm", "Final", "Quiz", "Assignment", "Practice"],
        required: true
    },
    professor: {
        type: String
    },
    subjectcode: {
        type: String
    },
    status: {
        type: String,
        enum: ["Approved", "Pending", "Rejected"],
        required: true
    },
    tags: [
        {
            type: String
        }
    ]
}, {timestamps: true})

export const Paper = mongoose.model("Paper", paperSchema);