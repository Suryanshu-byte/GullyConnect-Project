import React, { useState } from "react";
import { FaGoogle, FaFacebookF, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import picture from "../assets/ENV.jpg";
import axios from "axios";

export default function SignUpPage() {
  //states
  const [darkMode, setDarkMode] = useState(false);
  let [username, setUsername] = useState();
  let [password, setPassword] = useState();
  let [msg, setMsg] = useState(false);
  // event Listners
  function email(e) {
    setUsername(e.target.value);
  }

  function pass(e) {
    setPassword(e.target.value);
  }

  const toggleDarkMode = () => setDarkMode(!darkMode);
  // ---------------------->

  // backend connectivity

  async function register() {
    try {
      let data = await axios.post(
        "http://localhost:3000/app/v1/users/register",
        {
          username: username,
          password: password,
        }
      );
      console.log(data.data.status);
      if (data.data.status) {
        setMsg("registered");
      }
    } catch (e) {
      setMsg("please enter a unique email");
    }
  }

  // -------------------------->

  const slideVariants = {
    initial: { x: 100 },
    animate: { x: 0 },
    exit: { x: -100 },
  };

  return (
    <motion.div
      key={darkMode ? "dark" : "light"}
      variants={slideVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
      className={`flex h-screen font-sans transition-all duration-500 ${
        darkMode
          ? "bg-[#0f172a] text-white"
          : "bg-gradient-to-br from-[#ffe7d9] via-[#fff2cc] to-[#d4fc79] text-gray-900"
      }`}
    >
      <div
        className="w-1/2 bg-cover bg-center flex flex-col justify-center items-center p-10 relative overflow-hidden"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?fit=crop&w=800&q=80')",
        }}
      >
        <motion.h1
          className="text-6xl font-extrabold mb-4 drop-shadow-lg text-[#fcd34d]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          WELCOME
        </motion.h1>
        <p className="text-xl text-white font-medium">to our vibrant space</p>
        <button
          onClick={toggleDarkMode}
          className="absolute top-5 right-5 bg-white text-gray-900 px-4 py-1 rounded-full shadow hover:bg-gray-100 transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div
        className={`w-1/2 flex items-center justify-center ${
          darkMode
            ? "bg-[#1e293b]"
            : "bg-gradient-to-br from-[#f9fafb] via-[#fce7f3] to-[#e0f2fe]"
        }`}
      >
        <div
          className={`w-full max-w-md rounded-3xl shadow-2xl ${
            darkMode ? "bg-[#334155] text-white" : "bg-white text-gray-800"
          } p-10`}
        >
          <div className="space-y-6">
            <motion.h2
              className="text-3xl font-bold text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              Hello! We are glad to see you :)
            </motion.h2>

            <div className="flex justify-center gap-3">
              <button className="flex items-center gap-2 bg-gradient-to-r from-[#fb923c] to-[#facc15] hover:from-[#fdba74] hover:to-[#fde68a] text-white font-semibold rounded-full px-4 py-2 shadow">
                <FaGoogle /> Google
              </button>
              <button className="p-2 bg-[#3b5998] hover:bg-[#4c70ba] text-white rounded-full shadow">
                <FaFacebookF />
              </button>
              <button className="p-2 bg-[#1da1f2] hover:bg-[#60c5f9] text-white rounded-full shadow">
                <FaTwitter />
              </button>
            </div>

            <div className="text-center text-gray-400 font-semibold">Or</div>

            <div className="grid grid-cols-2 gap-4">
              {/* <input
                placeholder="Name"
                className="rounded-full px-4 py-2 bg-gray-100 text-gray-800 placeholder-gray-500 shadow-inner"
              /> */}
              <input
                placeholder="Email Address"
                className="rounded-full px-4 py-2 bg-gray-100 text-gray-800 placeholder-gray-500 shadow-inner"
                onChange={email}
              />
              <input
                placeholder="Password"
                type="password"
                className="rounded-full px-4 py-2 bg-gray-100 text-gray-800 placeholder-gray-500 shadow-inner"
                onChange={pass}
              />
              {/* <input placeholder="Repeat Password" type="password" className="rounded-full px-4 py-2 bg-gray-100 text-gray-800 placeholder-gray-500 shadow-inner" /> */}
            </div>

            {/* <div className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" id="terms" className="accent-pink-500" />
              <label htmlFor="terms">
                I agree{" "}
                <a href="#" className="underline text-pink-400">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="underline text-pink-400">
                  Privacy Policy
                </a>
              </label>
            </div> */}

            <button
              className="w-full bg-gradient-to-r from-[#14b8a6] to-[#3b82f6] text-white font-bold rounded-full py-3 shadow-lg hover:scale-105 transition-transform"
              onClick={register}
            >
              Sign Up
            </button>
            {msg ? `${msg}` : ""}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
