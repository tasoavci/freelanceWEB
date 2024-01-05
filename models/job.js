// models/job.js
import mongoose, { models, Schema } from "mongoose";

const JobSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    
}, { timestamps: true })

const Job = models.Job || mongoose.model("Job", JobSchema)

export default Job;