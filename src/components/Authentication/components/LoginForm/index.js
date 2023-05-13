import React, { useState } from "react";
import "./index.styles.css";
import homepageLogoImage from "../../../../images/homepage-logo.png";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
const LoginForm = () => {
  const [passwordInputType, setPasswordInputType] = useState("password");
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
      <Button className="login-form-submit-button">
        <Typography>LOGIN</Typography>
      </Button>
      <Button className="login-form-forgot-password-button">
        FORGOT MY PASSWORD
      </Button>
    </div>
  );
};
export default LoginForm;
