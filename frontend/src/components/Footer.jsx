import React from "react";

const Footer = () => {
    return (
        <footer className="rounded-t-lg shadow bg-gray-900 mx-auto sm:px-0 md:w-2/3 lg:w-1/2">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="/icon.svg" className="h-8" alt="Best Quotes logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">Best Quotes</span>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-[#a6adbb] sm:mb-0">
                        <li>
                            <a href="https://github.com/Julobulo/Best-Quotes/blob/main/LICENSE" className="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="https://twitter.com/JulesTheDev" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
                <span className="block text-sm sm:text-center text-[#a6adbb]">© 2024 <a href="" className="hover:underline">Best Quotes</a>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer