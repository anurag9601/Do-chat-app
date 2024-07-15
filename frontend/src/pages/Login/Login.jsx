import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import "./Login.css";
import useLogin from "../../hooks/useLogin";
import { contextApi } from "../../context/Context";

const Login = () => {
  const navigate = useNavigate();

  const passwordRef = useRef("");

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    emailError: "",
    passwordError: "",
  });

  const { loading , login } = useLogin();

  const [eyeOpen, setEyeOpen] = useState(false);

  const handlePasswordShowHide = () => {
    if (passwordRef.current.type === "text") {
      passwordRef.current.type = "password";
      setEyeOpen(false);
    } else {
      passwordRef.current.type = "text";
      setEyeOpen(true);
    }
  };

  const handleLoginBtn = async () => {
    if (input.email.length === 0) {
      return setError({ ...error, emailError: "Email is required" });
    }
    error.emailError = "";

    if (input.password.length === 0) {
      return setError({ ...error, passwordError: "Password is required" });
    }
    error.passwordError = "";

    await login(input);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleLoginBtn();
  };
  return (
    <div className="login-container">
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <h1>Log in</h1>
        <div className="inputbox">
          <p>Email</p>
          <div className="password-inputbox">
          <input
            type="email"
            value={input.email}
            onChange={(e) => {
              setInput({ ...input, email: e.target.value });
            }}
          />
          </div>
          <div className="login-error">
            <span>{error.emailError.length > 0 && error.emailError}</span>
          </div>
        </div>
        <div className="inputbox">
          <p>Password</p>
          <div className="password-inputbox">
            <input
              type="password"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              ref={passwordRef}
            />
            <span onClick={() => handlePasswordShowHide()}>
              {eyeOpen === true ? <VscEye /> : <VscEyeClosed />}
            </span>
          </div>
          <div className="login-error">
            <span>{error.passwordError.length > 0 && error.passwordError}</span>
          </div>
        </div>
        <div className="login-btn">
          <button type="submit" onClick={() => handleLoginBtn}>
            Log in
          </button>
        </div>
        <div className="login-create-account">
          <p onClick={() => navigate("/signup")}>Do not have an account?</p>
        </div>
      </form>
    </div>
  );
};

export default Login;
