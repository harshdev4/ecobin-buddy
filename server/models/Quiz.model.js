import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    id: Number,
    question: String,
    options: [
        {
            id: Number,
            text: String,
        },
    ],
    answer: {
        id: Number,
        text: String,
    },
    difficulty: String,
    isAttempted: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;