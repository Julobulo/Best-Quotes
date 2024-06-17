import express from "express";
import Quote from "../models/Quote.js";
import Session from "../models/Session.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { JWTsecret } = process.env;
import Cookies from "cookies";

const router = express.Router();

// Route to get top 25 most loved quotes
router.get('/best', async (request, response) => {
    try {
        // const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
        // await delay(1000);
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
                $limit: 25
            }
        ]).limit(25);
        return response.status(200).json({
            count: bestQuotes.length,
            data: bestQuotes
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get top 25 newest quotes
router.get('/newest', async (request, response) => {
    try {
        const newestQuotes = await Quote.find({}).sort({ time: -1 }).limit(25);
        return response.status(200).json({
            count: newestQuotes.length,
            data: newestQuotes
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get 25 random quotes
router.get('/random', async (request, response) => {
    try {
        const randomQuotes = await Quote.aggregate([{ $sample: { size: 25 } }]);
        return response.status(200).json({
            count: randomQuotes.length,
            data: randomQuotes
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
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
            return response.status(400).send({ message: 'Send all required fields: text' })
        }
        if (request.body.text.length < 15 || request.body.text.length > 300) {
            return response.status(400).send({ message: 'The quote is either less than 15 characters or more than 300!' })
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
        response.status(500).send({ message: error.message });
    }
});

async function checkVote(sessionID, quoteID, newVote) {
    try {
        const session = await Session.findOne({ session: sessionID });

        if (!session) {
            return { allowed: false, message: "Session not found" };
        }

        const currentVote = session.votes.get(quoteID);

        if (currentVote === undefined) {
            // No previous vote, so it's allowed
            session.votes.set(quoteID, newVote);
            await session.save();
            return { allowed: true, message: "Vote accepted (no current vote)" };
        } else if (currentVote === newVote) {
            // Same vote, reject
            return { allowed: false, message: "You can't vote the same way twice on the same quote" };
        } else {
            // Different vote, update
            session.votes.set(quoteID, newVote);
            await session.save();
            return { allowed: true, message: "Vote updated", oldVote: currentVote };
        }
    } catch (error) {
        return { allowed: false, message: error.message, oldVote: null };
    }
}

async function checkReport(sessionID, quoteID) {
    try {
        const session = await Session.findOne({ session: sessionID });

        if (!session) {
            return { allowed: false, message: "Session not found" };
        }

        const currentReport = session.reports.get(quoteID);

        if (!currentReport) {
            // User didn't report the quote already
            session.reports.set(quoteID, 1);
            await session.save();
            console.log(`Wrote report to session document`);
            return { allowed: true, message: "Report accepted" };
        } else {
            // User already reported the quote, can't do it anymore
            return { allowed: false, message: "Quote already reported" };
        }
    } catch (error) {
        return { allowed: false, message: error.message };
    }
}

// Route to upvote quote
router.post('/:id/vote/:up_or_down', async (request, response) => {
    try {
        const { id, up_or_down } = request.params;
        // Create a cookies object
        var cookies = new Cookies(request, response);
        if (!cookies.get('session')) {
            return response.status(400).send(`You need to include your session cookie in the request!!`);
        }
        console.log(`Cookies: ${cookies.get('session')}`);
        const quote = await Quote.findById(id);
        if (!quote) {
            return response.status(404).send('Quote not found');
        }
        const ret = checkVote(cookies.get('session'), id, (up_or_down === 'up' ? 1 : -1));
        if ((await ret).allowed) {
            console.log('vote is accepted!');
            console.log(`message: ${(await ret).message}`);
            // return response.status(200).send("vote (1) is accepted!");
        }
        else {
            console.log('vote was not accepted...');
            console.log(`error: ${(await ret).message}`);
            return response.status(400).send(`${(await ret).message}`);
        }
        // Increment the upvotes count
        if (up_or_down === 'up') {
            if ((await ret).oldVote === -1) {
                quote.upvotes += 2;
            }
            else {
                quote.upvotes += 1;
            }
            console.log(`OldVote: ${(await ret).oldVote}`);
        }
        else {
            console.log(`OldVote: ${(await ret).oldVote}`);
            if ((await ret).oldVote === 1) {
                console.log(`2 downvotes because previous was two votes up`);
                quote.downvotes += 2;
            }
            else {
                quote.downvotes += 1;
            }
        }
        // Save the updated quote
        await quote.save();
        return response.status(200).send(`Voted ${up_or_down} successfully`);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get a single quote
router.get('/quote/:id', async (request, response) => {
    // const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    // await delay(1000);
    try {
        const { id } = request.params;
        const quote = await Quote.findById(id);
        if (!quote) {
            return response.status(404).send(`Couldn't find the quote...`);
        }

        return response.status(200).json(quote);
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route to report a quote
router.post('/report/:id', async (request, response) => {
    try {
        const { id } = request.params;
        // Create a cookies object
        var cookies = new Cookies(request, response);
        if (!cookies.get('session')) {
            return response.status(400).send(`You need to include your session cookie in the request!!`);
        }
        console.log(`Cookies: ${cookies.get('session')}`);
        const quote = await Quote.findById(id);
        if (!quote) {
            return response.status(404).send('Quote not found');
        }

        const ret = checkReport(cookies.get('session'), id);
        if ((await ret).allowed === true) {
            quote.reports += 1;
            console.log('Quote reported.');
            quote.save();
        }
        else {
            console.log(`Quote couldn't be reported...`);
            console.log(`error: ${(await ret).message}`);
            return response.status(400).send(`${(await ret).message}`);
        }
        return response.status(200).send('Quote reported.');
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

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
        // expireAfterSeconds: 3600,
        // votes: {
        //     '665beee77a029255afbfa7c8': 1,
        // }
        console.log(`Here is the generated newSession: ${newSession.session}`);

        const sessionCreated = await Session.create(newSession);
        console.log(`sessionCreated: ${sessionCreated}`);

        response.cookie('session', token, {
            httpOnly: false,
            secure: true, // Ensure this is true if using HTTPS
            sameSite: 'None',
            domain: '.jules.tf'
        }); // Set the cookie with the token
        response.status(200).json({ token });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
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
        response.status(500).send({ message: error.message });
    }
});

export default router