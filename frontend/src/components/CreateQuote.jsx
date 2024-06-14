import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const domainName = import.meta.env.VITE_API_BASE_URL;

function CreateQuote() {
    const navigate = useNavigate();
    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");
    const [twitter, setTwitter] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!quote || quote.length < 15 || quote.length > 300) {
            setError("Quote must be between 15 and 300 characters long.");
            return;
        }
        setError("");

        try {
            await axios.post(`${domainName}/quotes/create`, {
                text: quote,
                author: author || "Anonymous",
                twitter: '@' + (twitter ||  "Anonymous"),
            });
            toast.success("Thanks for sharing your knowledge and wisdom with our community!");
            navigate("/");
        } catch (error) {
            console.error(error);
            setError("Failed to create quote. Please try again later.");
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-semibold mb-4">Create New Quote</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="quote" className="block font-semibold mb-2">Quote:</label>
                    <textarea
                        id="quote"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        rows="5"
                        value={quote}
                        placeholder="Your inspiring quote here..."
                        onChange={(e) => setQuote(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block font-semibold mb-2">Author:</label>
                    <input
                        type="text"
                        id="author"
                        className="border border-gray-300 rounded-md p-2 w-full"
                        value={author}
                        placeholder="Quote's author"
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="twitter" className="block font-semibold mb-2">Twitter Handle:</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">@</span>
                        <input
                            type="text"
                            id="twitter"
                            className="pl-8 border border-gray-300 rounded-md p-2 w-full"
                            value={twitter}
                            placeholder="Author's twitter handle"
                            onChange={(e) => setTwitter(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default CreateQuote;
