import React from 'react';
import { Link } from 'react-router-dom';
import { LuPen } from "react-icons/lu";

const Home = () => {
    return (
        <div className="bg-white flex flex-col items-center justify-center my-5">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-[#a6adbb]">Best quotes ever, brought to you by the community</h1>
                <p className="text-xl my-3 text-[#a6adbb]">👍 Upvote your favorite quotes and
                    <Link to="/quotes/create">
                        <button className="btn btn-accent mx-2">
                            <LuPen /> Write your own!
                        </button>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Home;
