import express from "express";
import Quote from "../models/Quote.js";
import Session from "../models/Session.js";
import jwt from "jsonwebtoken";
import { JWTsecret } from "../config.js";

const router = express.Router();

// Route to get top 50 most loved quotes
router.get('/best', async (request, response) => {
    try {
        const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        await delay(1000);
        const bestQuotes = await Quote.aggregate([
            {
                $addFields: {
                    netVotes: { $subtract: ["$upvotes", "$downvotes"] }
                }
            },
            {
                $sort: { netVotes: -1 }
            },
            {
                $limit: 50
            }
        ]).limit(50);
        return response.status(200).json({
            count: bestQuotes.length,
            data: bestQuotes
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to get top 50 newest quotes
router.get('/newest', async (request, response) => {
    try {
        const newestQuotes = await Quote.find({}).sort({ time: -1 }).limit(50);
        return response.status(200).json({
            count: newestQuotes.length,
            data: newestQuotes
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to create a quote
router.post('/create', async (request, response) => {
    try {
        if (
            !request.body.text
            // || !request.body.author ||
            // !request.body.twitter
        ) {
            return response.status(400).send({message: 'Send all required fields: text'})
        }
        if (request.body.text.length < 15 || request.body.text.length > 300) {
            return response.status(400).send({message: 'The quote is either less than 15 characters or more than 300!'})
        }
        const newQuote = {
            text: request.body.text,
            author: request.body.author,
            twitter: request.body.twitter,
            time: new Date().toISOString(),
        }
        const quote = await Quote.create(newQuote);
        return response.status(200).send(quote);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to upvote quote
router.post('/:id/upvote', async (request, response) => {
    try {
        const {id} = request.params;
        const quote = await Quote.findById(id);
        if (!quote) {
            return response.status(404).send('Quote not found');
        }
        // Increment the upvotes count
        quote.upvotes += 1;
        // Save the updated quote
        await quote.save();
        return response.status(200).send("Upvoted successfully");
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to downvote quote
router.post('/:id/downvote', async (request, response) => {
    try {
        const {id} = request.params;
        const quote = await Quote.findById(id);
        if (!quote) {
            return response.status(404).send('Quote not found');
        }
        // Increment the upvotes count
        quote.downvotes += 1;
        // Save the updated quote
        await quote.save();
        return response.status(200).send("Upvoted successfully");
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to get a session
router.get('/session', async (request, response) => {
    try {
        const randomSession = { session: (new Date().toISOString()) }; // Maybe use a more complex sessionID if needed
        const token = jwt.sign(randomSession, JWTsecret, { expiresIn: '24h' }); // Token expires in 24 hour
        // console.log(`Here is the generated sessionID: ${sessionID.sessionID}, time: ${new Date().toISOString()}
        console.log(`Here is the generated token: ${token}`)
    
        const newSession = {
            session: token,
        }
        // votes: {
        //     '665beee77a029255afbfa7c8': 1,
        // }
        console.log(`Here is the generated newSession: ${newSession.session}`);
    
        const sessionCreated = await Session.create(newSession);
        console.log(`sessionCreated: ${sessionCreated}`);
    
        response.cookie('session', token, { httpOnly: true, secure: false }); // Set the cookie with the token
        response.status(200).json({ token });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route to get ALL quotes from database
router.get('/', async (request, response) => {
    try {
        const quotes = await Quote.find({});
        return response.status(200).json({
            count: quotes.length,
            data: quotes
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

export default router