import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
import Quotes from "./components/Quotes";
import Home from "./components/Home";
import Test from "./components/Test.jsx";
import Quote from "../../backend/models/Quote.js";
import CreateQuote from "./components/CreateQuote.jsx";
import QuoteDetail from "./components/QuoteDetail.jsx";
import { getSession } from "./components/getSession.jsx";
// notifications
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
      <Navbar />
      <main className="flex-1 container mx-auto sm:px-0 md:w-2/3 lg:w-1/2">
        <Routes>
          <Route path="/" element={[<Home />, <Quotes />]} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/quotes/create" element={<CreateQuote />} />
          <Route path="/quotes/quote/:id" element={<QuoteDetail />} /> {/* New route for quote detail */}
        </Routes>
      </main>
      {/* <Test /> */}
      {/* <Quotes /> */}
      <Footer />
    </div>
  )
}

export default App
