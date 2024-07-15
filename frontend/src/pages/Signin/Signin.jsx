import React, { useContext, useRef, useState } from "react";
import "./Signin.css";
import { useNavigate } from "react-router-dom";
import GenderCheckbox from "../../components/GenderCheckbox/GenderCheckbox";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import useSignup from "../../hooks/useSignup";
import { contextApi } from "../../context/Context";

const Signin = () => {
  const navigate = useNavigate();

  const { loading, signup } = useSignup();

  const { authUser } = useContext(contextApi);

  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const [errorMessage, setErrorMessage] = useState({
    fullNameError: "",
    emailError: "",
    passwordError: "",
    confirmPasswordError: "",
    genderError: "",
    existEmailError: "",
  });

  const lengthOfPassword = 6;

  const passwordRef = useRef(null);
  const confirmPassswordRef = useRef(null);

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  function handleGenderCheckbox(gender) {
    setInput({ ...input, gender });
  }

  async function handleSubmitBtn() {
    if (input.fullName.length === 0) {
      setErrorMessage({
        ...errorMessage,
        fullNameError: "fullName is required",
      });
      return false;
    }
    errorMessage.fullNameError = "";

    if (!input.email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)) {
      setErrorMessage({ ...errorMessage, emailError: "Invalid email" });
      return false;
    }
    errorMessage.emailError = "";

    if (
      input.password.length === 0 ||
      input.password.length > lengthOfPassword
    ) {
      setErrorMessage({
        ...errorMessage,
        passwordError: "Length of password must me 6 or less than 6",
      });
      return false;
    }
    errorMessage.passwordError = "";

    if (input.password !== input.confirmPassword) {
      setErrorMessage({
        ...errorMessage,
        confirmPasswordError: "Passwords are not matched",
      });
      return false;
    }
    errorMessage.confirmPasswordError = "";

    if (input.gender === "") {
      setErrorMessage({
        ...errorMessage,
        genderError: "gender*",
      });
      return false;
    }

    await signup(input);
    if (authUser) {
      navigate("/login");
    } else {
      setErrorMessage({
        ...errorMessage,
        existEmailError: "User email address already exist",
      });
    }
  }

  let [eyeOpen, setEyeOpen] = useState({
    password: false,
    confirmPassword: false,
  });

  const handlePasswordShowHide = () => {
    if (passwordRef.current.type == "text") {
      passwordRef.current.type = "password";
      setEyeOpen({ ...eyeOpen, password: false });
    } else if (passwordRef.current.type == "password") {
      passwordRef.current.type = "text";
      setEyeOpen({ ...eyeOpen, password: true });
    }
  };

  const handleConfirmPasswordShowHide = () => {
    if (confirmPassswordRef.current.type == "text") {
      confirmPassswordRef.current.type = "password";
      setEyeOpen({ ...eyeOpen, confirmPassword: false });
    } else if (confirmPassswordRef.current.type == "password") {
      confirmPassswordRef.current.type = "text";
      setEyeOpen({ ...eyeOpen, confirmPassword: true });
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <div className="form-head">
          <h1>Sign Up</h1>
          <p>
            {errorMessage.existEmailError.length > 0 &&
              errorMessage.existEmailError}
          </p>
        </div>
        <div className="inputbox">
          <p>Full Name</p>
          <input
            type="text"
            name="fullName"
            value={input.fullName}
            onChange={(e) => setInput({ ...input, fullName: e.target.value })}
          />
          <p className="signup-error">
            {errorMessage.fullNameError.length > 0 &&
              errorMessage.fullNameError}
          </p>
        </div>
        <div className="inputbox">
          <p>Email</p>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={(e) => setInput({ ...input, email: e.target.value })}
          />
          <p className="signup-error">
            {errorMessage.emailError.length > 0 && errorMessage.emailError}
          </p>
        </div>
        <div className="inputbox">
          <p>Password</p>
          <div className="password-inputbox">
            <input
              type="password"
              name="passsword"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              ref={passwordRef}
            />
            <span onClick={() => handlePasswordShowHide()}>
              {eyeOpen.password === true ? <VscEye /> : <VscEyeClosed />}
            </span>
          </div>
          <p className="signup-error">
            {errorMessage.passwordError.length > 0 &&
              errorMessage.passwordError}
          </p>
        </div>
        <div className="inputbox">
          <p>Confirm password</p>
          <div className="password-inputbox">
            <input
              type="password"
              name="confirmPasssword"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
              ref={confirmPassswordRef}
            />
            <span onClick={() => handleConfirmPasswordShowHide()}>
              {eyeOpen.confirmPassword === true ? <VscEye /> : <VscEyeClosed />}
            </span>
          </div>
          <p className="signup-error">
            {errorMessage.confirmPasswordError.length > 0 &&
              errorMessage.confirmPasswordError}
          </p>
        </div>
        <GenderCheckbox
          setGenderFunction={handleGenderCheckbox}
          selectedGender={input.gender}
          genderError={errorMessage.genderError}
        />
        <div className="signup-btn">
          <button type="submit" onClick={() => handleSubmitBtn()}>
            Sign in
          </button>
          <p
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account?
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signin;
