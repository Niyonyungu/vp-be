import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    image: {
        type: String,
        default: '/placeholder.svg'
    },
    tags: {
        type: [String],
        required: true
    },
    demoUrl: {
        type: String
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
        enum: ['Web App', 'UI Design', 'Branding', 'Other']
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Project = mongoose.model('Projects', ProjectSchema);

export default Project;