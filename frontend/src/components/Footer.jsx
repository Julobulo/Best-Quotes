import React from "react";

const Footer = () => {
    return (
        <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4 mx-auto sm:px-0 md:w-2/3 lg:w-1/2">
            <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <a href="" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src="/icon.svg" class="h-8" alt="Best Quotes logo" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Best Quotes</span>
                    </a>
                    <ul class="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        <li>
                            <a href="https://github.com/Julobulo/Best-Quotes/blob/main/LICENSE" class="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="https://twitter.com/JulesTheDev" class="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
                <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="" class="hover:underline">Best Quotes</a>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer