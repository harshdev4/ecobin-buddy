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
        default: 0,
    }, 
    level: {
        type: String,
        default: "easy"
    },
    tips: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Tip'
    }
},
    { timestamps: true })

export default  mongoose.model('User', userSchema);