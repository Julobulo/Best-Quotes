import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import Spinner from "../components/Spinner";
import axios from "axios";
import Cookies from "js-cookie";
import { vote, share, report, createQuoteButton } from "./quoteUtils";
import { CiShare2 } from "react-icons/ci";
import { MdReport } from "react-icons/md";
import { LiaRandomSolid } from "react-icons/lia";
import { FiHeart } from "react-icons/fi";
import { IoIosTrendingUp } from "react-icons/io";
const domainName = import.meta.env.VITE_API_BASE_URL;
// Set up axios to include cookies in requests
axios.defaults.withCredentials = true;

function Quotes() {
    const [votedQuotes, setVotedQuotes] = useState({});
    if (!(localStorage.getItem("activeTab") === 'Random' || localStorage.getItem("activeTab") === 'Best' || localStorage.getItem("activeTab") === 'New')) {
        localStorage.setItem('activeTab', 'Random');
    }
    const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab'));
    const [randomQuotes, setRandomQuotes] = useState([]);
    const [bestQuotes, setBestQuotes] = useState([]);
    const [newestQuotes, setNewestQuotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [session, setSession] = useState(null);
    const [reportedQuotes, setReportedQuotes] = useState(JSON.parse(localStorage.getItem('reportedQuotes')) || {});

    useEffect(() => {
        // Get the value of the "session" cookie
        const sessionCookie = Cookies.get('session');
        // console.log(`Retrieved session cookie on load: ${sessionCookie}`);
        if (sessionCookie) {
            setSession(sessionCookie);
        }
    }, []);

    useEffect(() => {
        setLoading(true);
        axios.all([
            axios.get(`${domainName}/quotes/random`),
            axios.get(`${domainName}/quotes/best`),
            axios.get(`${domainName}/quotes/newest`),
        ])
            .then(axios.spread((randomResponse, bestResponse, newResponse) => {
                setRandomQuotes(randomResponse.data.data);
                setBestQuotes(bestResponse.data.data);
                setNewestQuotes(newResponse.data.data);
                setLoading(false);
            }))
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem("activeTab", activeTab);
    }, [activeTab]);




    const renderQuotes = (quotesToRender) => {
        return quotesToRender.map((quote, index) => (
            <div>
                <div key={quote._id} className="relative card card-compact w-full bg-[#1D232A] shadow-lg mb-4 text-white">
                    <div className="card-body flex flex-row justify-start gap-4">
                        <div className="flex-1 flex flex-row justify-start items-start gap-2">
                            <span className="font-semibold text-base opacity-60">{index + 1}.</span>
                            <div className="flex flex-col justify-between h-full flex-1">
                                <a className="relative text-base mb-1 whitespace-pre-line cursor-pointer overflow-hidden h-full max-h-[192px] text-ellipsis" href={`/quotes/quote/${quote._id}`}>
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
                                    </span>) <span> | {formatDistanceToNow(new Date(quote.time), { addSuffix: true, })}</span> | <button className={`link hover:link-accent no-underline rounded ${(reportedQuotes[quote._id] === 1) ? 'bg-teal-500' : 'bg-transparent'}`} aria-label="Report this quote" onClick={() => { report(quote._id, setReportedQuotes) }}><MdReport className="inline" /> report{(reportedQuotes[quote._id] === 1) ? 'ed' : ''}</button> | <button className="link hover:link-accent no-underline" aria-label="Share this quote" onClick={() => share(`${window.location.href}quotes/quote/${quote._id}`)}><CiShare2 className='inline' /> share</button>
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-start">
                                <button className={`btn btn-sm text-xl btn-ghost group saturate-50 ${((JSON.parse(localStorage.getItem('votedQuotes')) || {})[quote._id] || 0) === 1 ? 'hover:bg-teal-500' : 'hover:saturate-100'} scale-110 -rotate-3 ${((JSON.parse(localStorage.getItem('votedQuotes')) || {})[quote._id] || 0) === 1 ? 'bg-teal-500' : ''}`} aria-label="Upvote this quote" onClick={() => vote(quote._id, 1, null, votedQuotes, randomQuotes, setRandomQuotes, bestQuotes, setBestQuotes, newestQuotes, setNewestQuotes)} id={('up-' + quote._id)}>👍</button>
                                {/* 🤩 💩 */}
                                <div className="font-bold fontSpecial text-center">{quote.upvotes - quote.downvotes}</div>
                                <button className={`btn btn-sm text-xl btn-ghost group saturate-50 ${((JSON.parse(localStorage.getItem('votedQuotes')) || {})[quote._id] || 0) === 1 ? 'hover:bg-teal-500' : 'hover:saturate-100'} saturate-0 ${((JSON.parse(localStorage.getItem('votedQuotes')) || {})[quote._id] || 0) === -1 ? 'bg-teal-500' : ''}`} aria-label="Downvote this quote" onClick={() => vote(quote._id, -1, null, votedQuotes, randomQuotes, setRandomQuotes, bestQuotes, setBestQuotes, newestQuotes, setNewestQuotes)} id={('down-' + quote._id)}>👎</button>
                            </div>
                        </div>
                    </div>
                </div>
                {createQuoteButton(index + 1, index + 1 === quotesToRender.length)}
            </div>
        ));
    };


    return (
        <div>
            {loading ? (<Spinner />) : (
                <Tabs value={activeTab} className="sm:px-0 md:px-5 lg:p-10 m-5">
                    <TabsHeader
                        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
                        indicatorProps={{
                            className:
                                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
                        }}
                    >
                        <Tab
                            key="Random"
                            value="Random"
                            onClick={() => setActiveTab("Random")}
                            className={activeTab === "Random" ? "text-gray-900" : "text-[#a6adbb]"}
                        >
                            <div className="flex items-center">
                                <LiaRandomSolid className="mr-2" />
                                {"Random"}
                            </div>
                        </Tab>
                        <Tab
                            key="Best"
                            value="Best"
                            onClick={() => setActiveTab("Best")}
                            className={activeTab === "Best" ? "text-gray-900" : "text-[#a6adbb]"}
                        >
                            <div className="flex items-center">
                                <FiHeart className="mr-2" />
                                {"Best"}
                            </div>
                        </Tab>
                        <Tab
                            key="New"
                            value="New"
                            onClick={() => setActiveTab("New")}
                            className={activeTab === "New" ? "text-gray-900" : "text-[#a6adbb]"}
                        >
                            <div className="flex items-center">
                                <IoIosTrendingUp className="mr-2" />
                                {"New"}
                            </div>
                        </Tab>
                    </TabsHeader>

                    <TabsBody
                        animate={{
                            initial: { y: 250 },
                            mount: { y: 0 },
                            unmount: { y: 250 },
                        }}>
                        <TabPanel key="Random" value="Random">
                            {renderQuotes(randomQuotes)}
                        </TabPanel>
                        <TabPanel key="Best" value="Best">
                            {renderQuotes(bestQuotes)}
                        </TabPanel>
                        <TabPanel key="New" value="New">
                            {renderQuotes(newestQuotes)}
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            )}
        </div>
    )
}

export default Quotes