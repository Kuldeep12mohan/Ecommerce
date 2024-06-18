import React, { useState } from "react";
import logo from "../assets/logo.webp";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OtpInput from "otp-input-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase.config.jsx";

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ph, setPh] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");

  //otp sending and verification logic
  const sendOtp = async () => {
    try {
      const formatPh = "+91" + ph;
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(
        auth,
        formatPh,
        recaptcha
      );
      setUser(confirmation);
    } catch (error) {
      console.log(error);
    }
  };
  const verifyOtp = async () => {
    try {
      const data = await user.confirm(otp);
      console.log(data);
      const response = await axios.post("http://localhost:3001/api/v1/users/register",{username,email,phone:ph,password})
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!user ? (
        <div className="flex justify-center items-center h-screen">
          <div className="border-4 p-5 shadow-md flex justify-around rounded-lg items-center">
            <div className="w-full md:w-1/2">
              <div className="text-3xl mb-4 font-bold">SignUp</div>
              <div className="py-3">
                Already have account?
                <a
                  onClick={() => {
                    navigate("/signin");
                  }}
                  className="text-purple-600 font-bold underline"
                >
                  Sign in
                </a>
              </div>
              <label htmlFor="username" className="block py-3">
                Username
              </label>
              <input
                type="text"
                name="email"
                placeholder="harrydoe"
                className="w-full md:w-3/4 border py-2 px-2 rounded-lg"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <label htmlFor="email" className="block py-3">
                Email Address
              </label>
              <input
                type="text"
                name="email"
                placeholder="you@example.com"
                className="w-full md:w-3/4 border py-2 px-2 rounded-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="phoneNumber" className="block py-3">
                phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="enter your phone number"
                className="w-full md:w-3/4 border py-2 px-2 rounded-lg"
                value={ph}
                onChange={(e) => setPh(e.target.value)}
              />
              <div className="flex justify-between w-full md:w-3/4">
                <label htmlFor="password" className="py-2">
                  Password
                </label>
              </div>
              <div className="flex justify-between mb-3">
                <input
                  type="password"
                  placeholder="Enter 6 characters or more"
                  className="w-full md:w-3/4 border py-2 px-2 rounded-lg"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <input type="checkbox" name="remember" id="rem" className="m-2" />
              <label htmlFor="remember" className="py-2 px-3 mt-5">
                Remember me
              </label>
              <br />
              <button
                className="w-full md:w-3/4 py-2 mt-5  border-2 bg-purple-500 text-white font-bold hover:bg-purple-300 transition ease-linear duration-30"
                onClick={sendOtp}
              >
                Signup
              </button>
              <div id="recaptcha" className="mt-2 w-2"></div>
            </div>
            <div className="hidden md:block">
              <img src={logo} alt="" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <OtpInput
            value={otp}
            onChange={setOtp}
            OTPLength={6}
            otpType="number"
            disabled={false}
            autoFocus
            className="opt-container border bg-emerald-300"
          ></OtpInput>
          <button
            className="border py-2 px-5 bg-purple-500 m-2"
            onClick={verifyOtp}
          >
            Verify otp
          </button>
        </div>
      )}
    </>
  );
};

export default Signup;
