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
    }
});

const Session = mongoose.model('Session', sessionSchema);

export default Session;
