import "../PersonalInfoCard/personalInfo.styles.css";
import "../../Styles/commons.styles.css";
import * as React from "react";
import { Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";

const PersonalInfo = () => {
  const employeeRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const phoneRef = React.useRef(null);
  const positionRef = React.useRef(null);

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
          defaultValue="Amelia Earhearth"
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
            defaultValue="amelia.earhart@zendaya.com"
          />{" "}
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
            defaultValue="(31) 1234-9823"
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
            defaultValue="PM Cordinator Senior 3"
          />
        </div>
      </div>
    </main>
  );
};

export default PersonalInfo;
