// QuoteDetail.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
// To get a nice date format
import { formatDistanceToNow } from "date-fns";
// Import important functions from 
import { vote, share } from "./quoteUtils";
import Spinner from './Spinner';
import { CiShare2 } from "react-icons/ci";
import { MdReport } from "react-icons/md";


const QuoteDetail = () => {
    const { id } = useParams();
    const [quote, setQuote] = useState(null);
    const [loading, setLoading] = useState(true);
    
    localStorage.setItem('activeTab', 'QuoteDetail');
    
    
    useEffect(() => {
        setLoading(true);
        axios.get(`http://localhost:5555/quotes/quote/${id}`)
            .then((response) => {
                setQuote(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            }
            )
    }, [id]);

    return (
        <div>
            {loading ? (<Spinner />) : (
                <div>
                    <Link to='/' className='m-5'>
                        <button type="button" class="w-full flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto dark:hover:bg-gray-800 dark:bg-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:border-gray-700">
                            <svg class="w-5 h-5 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                            </svg>
                            <span>Back</span>
                        </button>
                    </Link>
                    <div key={quote._id} className="relative card card-compact w-full bg-base-100 shadow-lg mb-4 text-white">
                        <div className="card-body flex flex-row justify-start gap-4">
                            <div className="flex-1 flex flex-row justify-start items-start gap-2">
                                {/* <span className="font-semibold text-base opacity-60">{index + 1}.</span> */}
                                <div className="flex flex-col justify-between h-full flex-1">
                                    <a className="relative text-base mb-1 whitespace-pre-line cursor-pointer overflow-hidden h-full max-h-[192px] text-ellipsis">
                                        <h2 className="hover:opacity-60 duration-200">{quote.text}</h2>
                                    </a>
                                    <div className="text-xs opacity-60">
                                        By {quote.author} (<span>
                                            {quote.twitter ? (
                                                <a href={`https://twitter.com/${quote.twitter}`} className="hover:link hover:link-accent" target="_blank" rel="noreferrer">
                                                    <span>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" className="fill-current inline opacity-70 mr-0.5">
                                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                                        </svg>
                                                        {quote.twitter}
                                                    </span>
                                                </a>
                                            ) : (
                                                quote.author
                                            )}
                                        </span>) <span> | {formatDistanceToNow(new Date(quote.time), { addSuffix: true, })}</span> | <button className="link hover:link-accent no-underline bg-teal-500 rounded" aria-label="Report this quote"><MdReport className="inline" /> report</button> | <button className="link hover:link-accent no-underline" aria-label="Share this quote" onClick={() => share(null)}><CiShare2 className='inline' /> share</button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-start">
                                    <button className={`btn btn-sm text-xl btn-ghost group saturate-50 hover:saturate-100 scale-110 -rotate-3 ${((JSON.parse(localStorage.getItem('votedQuotes')) || {})[quote._id] || 0) === 1 ? 'bg-teal-500' : ''}`} aria-label="Upvote this quote" onClick={() => vote(quote._id, 1, JSON.parse(localStorage.getItem('votedQuotes')), setQuote, null, null, null, null)} id={('up-' + quote._id)}>👍</button>
                                    {/* 🤩 💩 */}
                                    <div className="font-bold fontSpecial text-center">{quote.upvotes - quote.downvotes}</div>
                                    <button className={`btn btn-sm text-xl btn-ghost group saturate-50 hover:saturate-100 saturate-0 ${((JSON.parse(localStorage.getItem('votedQuotes')) || {})[quote._id] || 0) === -1 ? 'bg-teal-500' : ''}`} aria-label="Downvote this quote" onClick={() => vote(quote._id, -1, JSON.parse(localStorage.getItem('votedQuotes')), setQuote, null, null, null, null)} id={('down-' + quote._id)}>👎</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    );
};

export default QuoteDetail;
