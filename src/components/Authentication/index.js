import React from "react";
import "./index.styles.css";

import homepageRightImage from "../../images/homepage-right-image.png";
import homepageRightText from "../../images/homepage-right-text.png";
import LoginForm from "./components/LoginForm";

const Authentication = ({ type }) => {
  return (
    <div className="authentication-container">
      <div className="authentication-container-left">
        <div className="authentication-container-left-wrapper">
          {type === "login" && <LoginForm />}
        </div>
      </div>
      <div className="authentication-container-right">
        <div className="authentication-container-right-text">
          <img src={homepageRightText} alt="homepage" />
        </div>
        <img src={homepageRightImage} alt="homepage" />
      </div>
    </div>
  );
};
export default Authentication;
