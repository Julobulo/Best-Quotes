import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import quotesRoute from "./routes/quotesRoute.js";
import dotenv from "dotenv";
dotenv.config();
const { PORT, mongoDBURL } = process.env;

const app = express();

// Middleware for handling CORS POLICY
// Option 1: Allow ALL Origins with Default of cors(*)
// app.use(cors());
// Option 2:
app.use(cors({
    origin: ['https://best-quotes.vercel.app', 'http://bestquotes.jules.tf', 'https://bestquotes.jules.tf', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-type'],
}));

app.use(express.json()); // Middleware to parse JSON bodies

app.get('/', (request, response) => {
    console.log("there was a get request on /");
    return response
        .status(200)
        .send("Welcome to my webpage!")
})

// // Route to add a new quote
// app.post('/quotes', async (request, response) => {
//     try {
//         const { text } = request.body;
//         if (!text) {
//             return response.status(400).send("Quote text is required");
//         }
//         const newQuote = new Quote({ text });
//         await newQuote.save();
//         return response.status(201).json(newQuote);
//     } catch (error) {
//         console.error(error);
//         return response.status(500).send("Internal Server Error");
//     }
// });

app.use('/quotes', quotesRoute);
app.post('/game/result', (request, response) => {
    console.log(`request looks like this: ${JSON.stringify(request.body)}`);
    return response.status(200).json({ message: "successfully got request" });
})

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log("App connected to database");
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error)
    })