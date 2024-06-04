import React from 'react';
import { Link } from "react-router-dom";
import { LuPen } from "react-icons/lu";

function Navbar() {
  return (
    <nav className="bg-white p-4 rounded-xl mx-auto max-w-4xl flex justify-between items-center mx-auto sm:px-0 md:w-2/3 lg:w-1/2">
      <div className="navbar bg-base-100 rounded-box shadow-lg mx-auto max-w-xl">
        <div className="navbar-start">
          <Link to="/quotes/create">
            <button className="btn btn-accent px-1.5" aria-label="Add a hack">
              <div className="flex flex-row justify-center items-center gap-0.5"><svg xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"></path>
              </svg>
                <div className="text-left leading-4">New<br />Quote</div>
              </div>
            </button>
          </Link>
        </div>
        <div className="navbar-center"><a className="btn btn-ghost normal-case text-xl indicator group" href="/"><span
          className="indicator-item indicator-start top-3 left-1 -rotate-12 scale-110 group-hover:scale-75 duration-200"><img src='/icon.svg' height={25} width={25}></img></span><span
            className="indicator-item indicator-bottom bottom-3.5 right-1.5 rotate-6 scale-90 group-hover:scale-125 duration-200"><img src='/icon.svg' height={20} width={20}></img></span><span
              className="font-bold tracking-tight fontSpecial">Best quotes</span></a></div>
        <div className="navbar-end"><a className="btn btn-ghost px-1" href="https://twitter.com/JulesTheDev" target="_blank"
          rel="noreferrer">
          <div className="flex flex-row justify-center items-center gap-1 text-xs">
            <div className="avatar">
              <div className="relative w-7 rounded-full"><span
                style={{
                  boxSizing: 'border-box',
                  display: 'block',
                  overflow: 'hidden',
                  width: 'initial',
                  height: 'initial',
                  background: 'none',
                  opacity: 1,
                  border: 0,
                  margin: 0,
                  padding: 0,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                }}><img
                  alt="Jules Fagard"
                  src="https://pbs.twimg.com/profile_images/1514863683574599681/9k7PqDTA_400x400.jpg"
                  decoding="async" data-nimg="fill"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    boxSizing: 'border-box',
                    padding: 0,
                    border: 'medium',
                    margin: 'auto',
                    display: 'block',
                    width: 0,
                    height: 0,
                    minWidth: '100%',
                    maxWidth: '100%',
                    minHeight: '100%',
                    maxHeight: '100%',
                  }}
                  sizes="100vw"
                  srcSet="/icon.svg" /><noscript><img
                    alt="Icon" sizes="100vw"
                    srcSet="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmarc.5471857d.png&amp;w=640&amp;q=75 640w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmarc.5471857d.png&amp;w=750&amp;q=75 750w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmarc.5471857d.png&amp;w=828&amp;q=75 828w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmarc.5471857d.png&amp;w=1080&amp;q=75 1080w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmarc.5471857d.png&amp;w=1200&amp;q=75 1200w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmarc.5471857d.png&amp;w=1920&amp;q=75 1920w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmarc.5471857d.png&amp;w=2048&amp;q=75 2048w, /_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmarc.5471857d.png&amp;w=3840&amp;q=75 3840w"
                    src="/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fmarc.5471857d.png&amp;w=3840&amp;q=75"
                    decoding="async" data-nimg="fill"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      boxSizing: 'border-box',
                      padding: 0,
                      border: 'none',
                      margin: 'auto',
                      display: 'block',
                      width: 0,
                      height: 0,
                      minWidth: '100%',
                      maxWidth: '100%',
                      minHeight: '100%',
                      maxHeight: '100%',
                    }}
                    loading="me!" /></noscript></span></div>
            </div>
            <div className="text-left leading-3">By <br /><span className="underline text-accent">Jules</span></div>
          </div>
        </a></div>
      </div>
    </nav>
  );
}

export default Navbar;
