import "../PersonalInfoCard/personalInfo.styles.css";
import "../../Styles/commons.styles.css";
import * as React from "react";
import { Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { useRef } from "react";

const PersonalInfo = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  position,
  setPosition,
  handleSaveInfo,
}) => {
  const employeeRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const positionRef = useRef(null);

  const inputFocus = (ref) => {
    if (ref.current) ref.current.querySelector("input").focus();
  };

  return (
    <main className="ledInfos">
      <div
        role="contentinfo"
        className="colaboratorInfo"
        onClick={() => inputFocus(employeeRef)}
      >
        <Typography className="smallText" fontWeight={400} fontSize="12px">
          Colaborador
        </Typography>
        <InputBase
          ref={employeeRef}
          style={{
            fontWeight: "700",
            fontSize: "32px",
            border: "none",
          }}
          onChange={(e) => setName(e.target.value)}
          value={name}
          onBlur={(e) => handleSaveInfo("replace", "/name", e.target.value)}
        />
      </div>
      <div className="colaboratorDetails">
        <div
          role="contentinfo"
          className="colaboratorInfo"
          onClick={() => inputFocus(emailRef)}
        >
          <Typography className="smallText" fontWeight={400} fontSize="12px">
            E-mail
          </Typography>
          <InputBase
            ref={emailRef}
            style={{
              fontWeight: "700",
              fontSize: "16px",
              display: "inline",
              width: "250px",
              border: "none",
            }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onBlur={(e) => handleSaveInfo("replace", "/email", e.target.value)}
          />
        </div>
        <div
          role="contentinfo"
          className="colaboratorInfo"
          onClick={() => inputFocus(phoneRef)}
        >
          <Typography className="smallText" fontWeight={400} fontSize="12px">
            Telefone
          </Typography>
          <InputBase
            ref={phoneRef}
            style={{
              fontWeight: "700",
              fontSize: "16px",
              display: "inline",
              width: "150px",
              border: "none",
            }}
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
            onBlur={(e) => handleSaveInfo("replace", "/phone", e.target.value)}
          />
        </div>
        <div
          role="contentinfo"
          className="colaboratorInfo"
          onClick={() => inputFocus(positionRef)}
        >
          <Typography className="smallText" fontWeight={400} fontSize="12px">
            Posição
          </Typography>
          <InputBase
            ref={positionRef}
            style={{
              fontWeight: "700",
              fontSize: "16px",
              display: "inline",
              width: "225px",
              border: "none",
            }}
            onChange={(e) => setPosition(e.target.value)}
            value={position}
            onBlur={(e) =>
              handleSaveInfo("replace", "/job/name", e.target.value)
            }
          />
        </div>
      </div>
    </main>
  );
};

export default PersonalInfo;
