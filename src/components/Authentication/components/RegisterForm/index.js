import React, { useState } from "react";
import "./index.styles.css";
import homepageLogoImage from "../../../../images/homepage-logo.png";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { post } from "../../../../modules/request";
import { Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const RegisterForm = () => {
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorType, setErrorType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setIsLoading(true);
    console.log(typeof password);
    if (password.length === 0 || password !== passwordConfirmation) {
      setErrorType("password");
      setShowError(true);
      setIsLoading(false);
      return;
    }
    setShowError(false);
    const result = await post("/user/signup", {
      name: "teste",
      email,
      password,
    });
    if (result.uid) {
      navigate("/");
    }
    setErrorType("register");
    setShowError(true);
    setIsLoading(false);
  };

  return (
    <div className="register-form-container">
      <img src={homepageLogoImage} alt="homepage logo" />
      <h1>Create an Account</h1>
      <InputBase
        className="register-form-input"
        style={{
          fontWeight: "700",
          fontSize: "32px",
          border: "none",
        }}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="register-form-input-container">
        <InputBase
          className="register-form-input"
          style={{
            fontWeight: "700",
            fontSize: "32px",
            border: "none",
          }}
          placeholder="Password"
          type={passwordInputType}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="register-form-input-icon">
          {passwordInputType === "password" ? (
            <VisibilityIcon onClick={() => setPasswordInputType("text")} />
          ) : (
            <VisibilityOffIcon
              onClick={() => setPasswordInputType("password")}
            />
          )}
        </div>
      </div>
      <div className="register-form-input-container">
        <InputBase
          className="register-form-input"
          style={{
            fontWeight: "700",
            fontSize: "32px",
            border: "none",
          }}
          placeholder="Password"
          type={passwordInputType}
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <div className="register-form-input-icon">
          {passwordInputType === "password" ? (
            <VisibilityIcon onClick={() => setPasswordInputType("text")} />
          ) : (
            <VisibilityOffIcon
              onClick={() => setPasswordInputType("password")}
            />
          )}
        </div>
      </div>
      <Button onClick={() => handleRegister()} className="register-form-submit-button">
        {isLoading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          <Typography>CREATE MY ACCOUNT</Typography>
        )}
      </Button>
      {showError && (
        <Alert sx={{ mb: 2 }} severity="error">
          {errorType === "password" && "Passwords do not match"}
          {errorType === "register" && "Something went wrong, please try again"}
        </Alert>
      )}
      <Button
        onClick={() => navigate("/")}
        className="register-form-forgot-password-button"
      >
        I have an account, bring me to login
      </Button>
    </div>
  );
};
export default RegisterForm;
