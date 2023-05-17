import React, { useState } from "react";
import "./index.styles.css";
import homepageLogoImage from "../../../../images/homepage-logo.png";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookie";
import { Alert } from "@mui/material";

const LoginForm = () => {
  const [passwordInputType, setPasswordInputType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Cookies.set("user", JSON.stringify(user));
        navigate('/LSTools/team')
      })
      .catch(() => {
        setShowError(true);
      });
  };

  return (
    <div className="login-form-container">
      <img src={homepageLogoImage} alt="homepage logo" />
      <h1>Welcome back!</h1>
      <InputBase
        className="login-form-input"
        style={{
          fontWeight: "700",
          fontSize: "32px",
          border: "none",
        }}
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="login-form-input-container">
        <InputBase
          className="login-form-input"
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
        <div className="login-form-input-icon">
          {passwordInputType === "password" ? (
            <VisibilityIcon onClick={() => setPasswordInputType("text")} />
          ) : (
            <VisibilityOffIcon
              onClick={() => setPasswordInputType("password")}
            />
          )}
        </div>
      </div>
      <Button onClick={handleLogin} className="login-form-submit-button">
        <Typography>LOGIN</Typography>
      </Button>
      {showError && (
        <Alert sx={{ mb: 2 }} severity="error">
          Something went wrong, please try again
        </Alert>
      )}
      <Button className="login-form-forgot-password-button">
        Forgot my password
      </Button>
      <Button
        onClick={() => navigate("/register")}
        className="login-form-forgot-password-button"
      >
        Create an account
      </Button>
    </div>
  );
};
export default LoginForm;
