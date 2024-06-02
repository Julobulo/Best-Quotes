import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: "anonymous"},
  twitter: { type: String, required: false},
  time: { type: Date, required: true},
  upvotes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
});

const Quote = mongoose.model("Quote", quoteSchema);

export default Quote;