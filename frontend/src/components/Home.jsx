import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="bg-white flex flex-col items-center justify-center my-5">
            <div className="text-center max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold">Best quotes ever, brought to you by the community</h1>
                <p className="text-xl my-3">Upvote your favorite quotes and
                    {/* <span className="font-bold">write your own!</span></p> */}
                    <Link to="/quotes/create">
                        <button className="btn btn-accent mx-2">
                            Write your own!
                        </button>
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Home;
