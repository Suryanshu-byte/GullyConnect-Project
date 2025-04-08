import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import VanillaTilt from "vanilla-tilt";
import { Link } from "react-router-dom";
import axios from "axios";

const LoginCard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    VanillaTilt.init(document.querySelectorAll(".card"), {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.5,
    });
  }, []);

  // states n hooks
  let [username, setUsername] = useState();
  let [password, setPassword] = useState();
  let [msg, setMsg] = useState();

  // functions event

  function user(e) {
    setUsername(e.target.value);
  }

  function pass(e) {
    setPassword(e.target.value);
  }

  async function login() {
    try {
      let user = await axios.post("http://localhost:3000/app/v1/users/login", {
        username: username,
        password: password,
      });
      console.log(user);
      if (user.data.status) {
        navigate("/app", {
          state: user.data.token,
        });
      } else {
        setMsg("please enter valid email or password");
      }
    } catch (e) {
      setMsg("please enter valid email or password");
    }
  }

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
        body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(#f00, #f0f);
          clip-path: circle(30% at 99% 70%);
        }
        body::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, rgba(33,255,5,1) 0%, rgba(6,255,254,1) 100%);
          clip-path: circle(30% at 10% 10%);
        }
        .container {
          height: 100vh;
          width: 100%;
          background: #161623;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .card {
          position: relative;
          width: 360px;
          height: 520px;
          margin: 30px;
          box-shadow: 20px 20px 50px rgba(0,0,0,0.5);
          border-radius: 15px;
          background: rgba(255,255,255,0.1);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-top: 1px solid rgba(255,255,255,0.5);
          border-left: 1px solid rgba(255,255,255,0.5);
          backdrop-filter: blur(5px);
          z-index: 1;
        }
        .login-heading {
          color: white;
          margin-bottom: 350px;
          position: absolute;
          font-size: 40px;
          font-weight: 700;
          font-style: italic;
        }
        .input-wrapper {
          display: flex;
          justify-content: center;
          flex-direction: column;
          margin-bottom: 40px;
        }
        .container input {
          margin-top: 25px;
          padding: 10px;
          width: 230px;
          border: none;
          box-shadow: 20px 20px 50px rgba(0,0,0,0.5);
          border-radius: 10px;
          background: rgba(255,255,255,0.1);
          border-top: 1px solid rgba(255,255,255,0.5);
          border-left: 1px solid rgba(255,255,255,0.5);
          backdrop-filter: blur(5px);
          z-index: 1;
          color: white;
        }
        .container input::placeholder {
          color: white;
          opacity: .5;
        }
        .container input:focus {
          outline: none;
        }
        .container input:hover {
          transform: scale(1.1);
        }
        .extra-links {
          color: #fff;
          font-size: 14px;
          margin-top: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .extra-links a {
          color: #fff;
          text-decoration: underline;
          opacity: 0.8;
        }
        .extra-links a:hover {
          opacity: 1;
        }
        .container-button {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
          align-items: center;
          position: absolute;
          margin-top: 250px;
        }
        .btn {
          position: relative;
          display: inline-block;
          border: none;
          border-radius: 50px;
          background: none;
          padding: 25px 75px;
          margin: 30px;
        }
        .btn a {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, .05);
          box-shadow: 0 15px 35px rgba(0, 0, 0, .2);
          border-top: 1px solid rgba(255, 255, 255, .1);
          border-bottom: 1px solid rgba(255, 255, 255, .1);
          border-radius: 30px;
          color: #fff;
          z-index: 1;
          font-weight: 400;
          letter-spacing: 1px;
          text-decoration: none;
          overflow: hidden;
          text-transform: uppercase;
          transition: all .3s ease-in-out;
          backdrop-filter: blur(15px);
        }
        .btn:hover a {
          letter-spacing: 3px;
        }
        .btn a::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 50%;
          height: 100%;
          background: linear-gradient(to left, rgba(255, 255, 255, .15), transparent);
          transform: skewX(40deg) translateX(0);
          transition: all .5s ease-out;
        }
        .btn:hover a::before {
          transform: skewX(40deg) translateX(200%);
        }
        .btn::before,
        .btn::after {
          content: '';
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 0px;
          border-radius: 10px;
          background: #f00;
          transition: all .4s ease-in-out;
          transition-delay: 0s;
        }
        .btn::before {
          bottom: -5px;
        }
        .btn::after {
          top: -5px;
        }
        .btn:hover::before,
        .btn:hover::after {
          height: 50%;
          width: 80%;
          border-radius: 30px;
          transition-delay: .3s;
        }
        .btn:hover::before {
          bottom: 0;
        }
        .btn:hover::after {
          top: 0;
        }
        .btn:nth-child(1)::before,
        .btn:nth-child(1)::after {
          background: #ff7979;
          box-shadow: 0 0 5px #ff7979, 0 0 15px #ff7979, 0 0 30px #ff7979, 0 0 60px #ff7979;
        }
      `}</style>
      <div className="container">
        <div className="card">
          <h1 className="login-heading">Login</h1>
          <div className="input-wrapper">
            <input
              className="username-input"
              type="text"
              placeholder="Username"
              onChange={user}
              style={{ backgroundColor: "black" }} /// extra
            />
            <input
              className="password-input"
              type="password"
              placeholder="Password"
              onChange={pass}
            />
            <div className="extra-links">
              <a href="#">Forgot Password?</a>
              <Link to={"/Newaccount"}>Create New Account</Link>
            </div>
          </div>
          <div className="container-button">
            <button className="btn" onClick={login}>
              <a href="#">Login </a>
            </button>

            {msg ? `${msg}` : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginCard;
