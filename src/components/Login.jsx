import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const user = useSelector((store) => store.user);

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("hansa@ypmail.com");
  const [password, setPassword] = useState("VINAYb8878@");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "Something went wrong");
    }
  };
  const handleSignup= async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
  
      dispatch(addUser(res?.data?.data));
      return navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-12">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex justify-center">{isLoginForm ?"Login" :"Signup"}</h2>
          <div className="my-2">
          
            {!isLoginForm && <> <label className="form-control w-full max-w-xs mb-4">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e)=>{setFirstName(e.target.value)}}
                placeholder="Enter your first name"
                className="input input-bordered input-success w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs mb-4">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                onChange={(e)=>{setLastName(e.target.value)}}
                placeholder="Enter your last name"
                className="input input-bordered input-success w-full max-w-xs"
              />
            </label> </>}
              <label className="form-control w-full max-w-xs mb-4">
                <div className="label">
                  <span className="label-text">Email ID</span>
                </div>
                <input
                  type="text"
                  value={emailId}
                  onChange={(e) => {
                    setEmailId(e.target.value);
                  }}
                  placeholder="Enter your email"
                  className="input input-bordered input-success w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs ">
                <div className="label">
                  <span className="label-text">Password</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="input input-bordered input-success w-full max-w-xs"
                />
              </label>
          
          </div>
          <p className="text-red-400 ">{error}</p>
          <div className="card-actions justify-center mt-2">
            <button className="btn btn-primary w-full" onClick={isLoginForm?handleLogin:handleSignup}>
             {isLoginForm?"Login":"Signup"}
            </button>
          </div>
          <p className="m-auto cursor-pointer mt-3" onClick={()=>setIsLoginForm((value)=>!value)}>
            {isLoginForm ?"New user? Signup here":"Existing user? Login here."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
