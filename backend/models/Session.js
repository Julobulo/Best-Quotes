import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    session: {
        type: String,
        required: true,
    },
    // unique: true
    votes: {
        type: Map,
        of: Number,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 2592000 // 30 * 24h (86400)
    }
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
