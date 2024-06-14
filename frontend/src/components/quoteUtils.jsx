import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { getSession } from "./getSession";
import dotenv from "dotenv";
dotenv.config();
const { domainName } = process.env;
axios.defaults.withCredentials = true;
// Gets session from function
export const fetchSession = async () => {
    const newSession = await getSession();
    if (newSession) {
        // setSession(newSession);
        Cookies.set('session', newSession);
        // Delete votedQuotes from local storage as it should be empty when first receiving a session
        try { localStorage.removeItem('votedQuotes'); localStorage.removeItem('reportedQuotes') } catch (err) { }
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
    axios.post(`${domainName}/quotes/${quoteId}/vote/${vote === 1 ? 'up' : 'down'}`)
        .then(() => {
            const updatedVotedQuotes = {
                ...votedQuotes,
                [quoteId]: vote === 1 ? 1 : -1,
            };
            if (localStorage.getItem('activeTab') === "QuoteDetail") {
                updateQuotes(quoteId, (vote === 1 ? true : false), setQuote, votedQuotes, null, null, null, null);
            }
            else {
                updateQuotes(quoteId, (vote === 1 ? true : false), null, votedQuotes, bestQuotes, setBestQuotes, newestQuotes, setNewestQuotes);
            }
            toast.info(`${vote === 1 ? 'Upvoted' : 'Downvoted'} quote!`);
        })
        .catch((error) => {
            console.log(`Couldn't vote, error: ${error.response.data}`);
            if (error.response.data === "Session not found") {
                console.log(`Fetching session`);
                fetchSession();
                // window.location.reload();
                if (localStorage.getItem('activeTab') === "QuoteDetail") {
                    updateQuotes(quoteId, (vote === 1 ? true : false), setQuote, votedQuotes, null, null, null, null);
                }
                else {
                    updateQuotes(quoteId, (vote === 1 ? true : false), null, votedQuotes, bestQuotes, setBestQuotes, newestQuotes, setNewestQuotes);
                }
                return
            }
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

export const share = async (quoteId) => {
    try {
        if (!quoteId) {
            await navigator.clipboard.writeText(window.location.href);
        }
        else {
            await navigator.clipboard.writeText(quoteId);
        }
        toast.success('Link copied to clipboard!');
    } catch (err) {
        console.error("Failed to copy link to clipboard: ", err);
        toast.error(`Failed to copy link to clipboard...: ${err}`);
    }
};

export const report = async (quoteId, setReportedQuotes) => {
        axios
            .post(`${domainName}/quotes/report/${quoteId}`)
            .then(() => {
                const updatedReportedQuotes = {
                    ...JSON.parse(localStorage.getItem('reportedQuotes')),
                    [quoteId]: 1,
                };
                localStorage.setItem('reportedQuotes', JSON.stringify(updatedReportedQuotes));
                setReportedQuotes(updatedReportedQuotes);
                console.info('Reported quote.');
                toast.info(`Thanks for your feedback!`);
            })
            .catch((error) => {
                    if (error.response.data === "Quote already reported") {
                        console.error(`Error: Quote already reported...`);
                        toast.error(`Error: Quote already reported...`);
                    }
                    else {
                        console.error(`Failed to report quote. Error: ${error}`);
                        toast.error(`Failed to report quote. Error: ${error}`);
                    }
            })
}

export const createQuoteButton = (index, isLast) => {
    // Index is passed +1, otherwise the button would appear after the 4th quote, 11th, ...
    if (index === 3 || index === 10 || index === 25 || index === 50 || isLast) {
        return (
            <Link to="/quotes/create" className="text-black">
                <div className="card card-compact w-full bg-accent shadow-lg text-accent-content cursor-pointer hover:bg-accent-focus duration-200 my-5">
                    <div className="card-body flex flex-row justify-start gap-2">
                        <div className="flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </div>
                        <div>
                            <div className="text-base font-semibold">Add your best quote?</div>
                            <div className="opacity-80">No account needed!</div>
                        </div>
                    </div>
                </div>
            </Link>
        );
    }
    return null;
};