import React from "react";

function Quote() {
    return (
        <div className="relative card card-compact w-full bg-base-100 shadow-lg">
            <div className="card-body flex flex-row justify-start gap-4">
                <div className="flex-1 flex flex-row justify-start items-start gap-2"><span
                    className="font-semibold text-base opacity-60">1.</span>
                    <div className="flex flex-col justify-between h-full flex-1"><a
                        className="relative text-base mb-1 whitespace-pre-line cursor-pointer overflow-hidden h-full max-h-[192px] text-ellipsis"
                        href="/hack/don't-start-your-day-looking-at-your-phone-rjdy1">
                        <h2 className="hover:opacity-60 duration-200">Don’t start your day looking at your phone </h2>
                    </a>
                        <div className="text-xs opacity-60">By <span className=""><a href="https://twitter.com/must_be_ash"
                            className="hover:link hover:link-accent" target="_blank" rel="noreferrer"><span><svg
                                xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                                className="fill-current inline opacity-70 mr-0.5">
                                <path
                                    d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z">
                                </path>
                            </svg>ash</span></a></span> <span>2 days ago</span> | <a
                                className="hover:link hover:link-accent"
                                href="/hack/don't-start-your-day-looking-at-your-phone-rjdy1">1 comment</a> | <button
                                    className="link hover:link-accent no-underline " aria-label="Report this hack">report</button> |
                            <button className="link hover:link-accent no-underline" aria-label="Share this hack">share</button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-start"><button
                        className="btn btn-sm text-xl btn-ghost group saturate-50 hover:saturate-100 saturate-100 scale-110 btn-active -rotate-3 "
                        aria-label="Upvote this hack">🤩</button>
                        <div className="font-bold fontSpecial text-center">10</div><button
                            className="btn btn-sm text-xl btn-ghost group saturate-50 hover:saturate-100  saturate-0"
                            aria-label="Downvote this hack">💩</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Quote