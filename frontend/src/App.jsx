import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Quotes from "./components/Quotes";
import Home from "./components/Home";
import Test from "./components/Test.jsx";
import Quote from "../../backend/models/Quote.js";
import CreateQuote from "./components/CreateQuote.jsx";
import { getSession } from "./components/getSession.jsx";
// notifications
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from "js-cookie";

const App = () => {
  // console.log(`Session cookie: ${Cookies.set('session', 'abal')}`);
  return (
    <div className="min-h-screen bg-white">
      <div>
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
      </div>
      <Navbar />
      <div className="container mx-auto sm:px-0 md:w-2/3 lg:w-1/2">
        <Routes>
          <Route path="/" element={[<Home />, <Quotes />]} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/quotes/create" element={<CreateQuote />} /> {/* Assuming Quotes component handles quote creation */}
        </Routes>
        {/* <Test /> */}
        {/* <Quotes /> */}
      </div>
    </div>
  )
}

export default App
