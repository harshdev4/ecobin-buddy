import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    profileImage: {
        type: String,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
    },
    level: {
        type: String
    },
    tips: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Tip'
    }
},
    { timestamps: true })

export default  mongoose.model('User', userSchema);