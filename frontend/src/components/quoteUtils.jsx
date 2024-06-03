import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { getSession } from "./getSession";
axios.defaults.withCredentials = true;
// Gets session from function
export const fetchSession = async () => {
    const newSession = await getSession();
    if (newSession) {
        // setSession(newSession);
        Cookies.set('session', newSession);
    }
};

export const updateQuotes = (quoteId, isUpvote, setQuote, votedQuotes, bestQuotes, setBestQuotes, newestQuotes, setNewestQuotes) => {
    const updateVotes = (quotes) => {
        return quotes.map((quote) => {
            if (quote._id === quoteId) {
                let upvotes = quote.upvotes;
                let downvotes = quote.downvotes;
                const votedQuotes = JSON.parse(localStorage.getItem('votedQuotes')) || {};
                const previousVote = votedQuotes[quoteId] || 0;

                if (isUpvote) {
                    if (previousVote === -1) {
                        // if it's the user's second different consecutive vote, add 1 to upvotes and -1 to downvotes
                        upvotes += 1;
                        downvotes -= 1;
                    }
                    else {
                        // else, just add 1 to upvotes
                        upvotes += 1;
                    }
                    votedQuotes[quoteId] = 1;
                }
                else {
                    if (previousVote === 1) {
                        // if the user had previously voted up but now votes down, then -1 upvotes +1 downvotes
                        upvotes -= 1;
                        downvotes += 1;
                    }
                    else {
                        // else, +1 downvotes
                        downvotes += 1;
                    }
                    votedQuotes[quoteId] = -1;
                }

                // Update the local storage with the new voted quotes
                localStorage.setItem('votedQuotes', JSON.stringify(votedQuotes));

                return {
                    ...quote,
                    upvotes,
                    downvotes,
                    voted: isUpvote ? 1 : -1, // Store the user's current vote
                };
            }
            return quote;
        });
    };

    const activeTab = localStorage.getItem('activeTab');
    if (activeTab === "Best") {
        setBestQuotes(updateVotes(bestQuotes));
    } else if (activeTab === "New") {
        setNewestQuotes(updateVotes(newestQuotes));
    } else if (activeTab === "QuoteDetail") {
        setQuote((quote) => ({
            ...quote,
            ...updateVotes([quote])[0], // Update only the single quote
        }));
    }
};

export const vote = async (quoteId, vote, votedQuotes, setQuote, bestQuotes, setBestQuotes, newestQuotes, setNewestQuotes) => {

    if (!(Cookies.get('session'))) {
        console.log(`Don't have a session... Getting a session!`);
        await fetchSession();
    }
    else {
        // toast.success('got a session!');
    }
    axios.post(`http://localhost:5555/quotes/${quoteId}/vote/${vote === 1 ? 'up' : 'down'}`)
        .then(() => {
            const updatedVotedQuotes = {
                ...votedQuotes,
                [quoteId]: vote === 1 ? 1 : -1,
            };
            console.log(`Debugging: updatedVotedQuotes`);
            if (localStorage.getItem('activeTab') === "QuoteDetail") {
                updateQuotes(quoteId, (vote === 1 ? true : false), setQuote, votedQuotes, null, null, null, null);
            }
            else {
                updateQuotes(quoteId, (vote === 1 ? true : false), null, votedQuotes, bestQuotes, setBestQuotes, newestQuotes, setNewestQuotes);
            }
            console.log(`Debugging: updated Quotes`);
            toast.info(`${vote === 1 ? 'Upvoted' : 'Downvoted'} quote!`);
        })
        .catch((error) => {
            if ((JSON.parse(localStorage.getItem('votedQuotes')) || {})[quoteId] || 0) {
                toast.error(`Error: You already voted this quote!`);
            }
            else {
                toast.error(`Error: Couldn\'t ${vote === 1 ? 'upvote' : 'downvote'} quote!`);
            }
            console.log(error);
            // setLoading(false);
        });
};