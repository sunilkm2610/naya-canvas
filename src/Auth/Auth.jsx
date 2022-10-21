import React, { useState } from "react";
import "./auth.scss";
import { useDispatch } from "react-redux";
import { registerUser, loginUser } from "../actions/userAction";

const Auth = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [authType, setAuthType] = useState(false);
  const changeAuth = () => {
    setAuthType(!authType);
  };
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: `${inputs.fname} ${inputs.lname}`,
      email: inputs.email,
      password: inputs.password,
    };
    if (authType) {
      dispatch(registerUser(data));
    } else {
      dispatch(loginUser(data));
    }
  };
  return (
    <div>
      <div className="logo"></div>
      <div className="container">
        <div className="auth-wraper">
          <h2>{authType ? "Sign up" : "Log in"} to Continue</h2>
          <form action="submit" onSubmit={handleSubmit} className="input-form">
            {authType ? (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  name="fname"
                  onChange={handleChange}
                  required
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  name="lname"
                  onChange={handleChange}
                  required
                />
              </>
            ) : (
              <></>
            )}
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              required
            />
            <p>
              <span>{authType ? "" : "Forgot Password?"}</span>
            </p>
            <button type="submit">{authType ? "Signup" : "Login"}</button>
            <p>
              {!authType
                ? "Don't have an account? "
                : "Already account Please "}

              <span onClick={changeAuth}>{authType ? "Login" : "Signup"}</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
