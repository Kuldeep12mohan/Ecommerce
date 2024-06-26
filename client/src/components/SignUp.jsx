import React, { useState } from "react";
import logo from "../assets/GirlCart.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OtpInput from "otp-input-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase.config.jsx";
import toast,{Toaster} from "react-hot-toast";
const Signup = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ph, setPh] = useState("");
  const [user, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [loader,setLoader] = useState(false);
  //otp sending and verification logic
  const sendOtp = async () => {
    try {
      setLoader(true);
      const formatPh = "+91" + ph;
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {});
      const confirmation = await signInWithPhoneNumber(
        auth,
        formatPh,
        recaptcha
      );
      setLoader(false);
      setUser(confirmation);
    } catch (error) {
      console.log(error);
    }
  };
  const verifyOtp = async () => {
    try {
      setLoader(true);
      const data = await user.confirm(otp);
      console.log(data);
      const response = await axios.post(
        "http://localhost:3001/api/v1/users/register",
        { username, email, phone: ph, password }
      );
      console.log(response);
      toast.success("registration successful")
      setLoader(false);
      setTimeout(()=>
      {
        navigate("/login");
      },1500)
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {!user ? (
        <div className="flex justify-center items-center h-screen">
          <div className="border-4 p-4 shadow-md flex justify-around rounded-lg items-center">
            <div className="w-full md:w-1/2">
              <div className="text-3xl mb-4 font-bold">
                Welcome to{" "}
                <span className="bg-gradient-to-r from-orange-400 to-yellow-500 text-transparent bg-clip-text">
                EcomHaven
                </span>
              </div>
              <div className="py-3">
                Already have account?
                <a
                  onClick={() => {
                    navigate("/signin");
                  }}
                  className="text-purple-600 font-bold underline hover:cursor-pointer"
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
              <button
                className="w-full md:w-3/4 py-2 mt-5  border-2 bg-purple-500 text-white font-bold hover:bg-purple-300 transition ease-linear duration-30"
                onClick={sendOtp}
              >
                {!loader?"Signup":"Loading..."}
                
              </button>
              <div id="recaptcha" className="mt-2 w-2"></div>
            </div>
            <div className="hidden md:block w-2/5">
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
            {!loader?"veryify otp":"loading..."}
          </button>
        </div>
      )}
      <Toaster/>
    </>
  );
};

export default Signup;
