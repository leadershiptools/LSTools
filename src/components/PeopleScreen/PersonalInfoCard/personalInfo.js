import "../PersonalInfoCard/personalInfo.styles.css";
import "../../Styles/commons.styles.css";
import * as React from "react";
import { Drawer, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { useRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const PersonalInfo = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  position,
  setPosition,
  imageUrl,
  setImageUrl,
  handleSaveInfo,
}) => {
  const employeeRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const positionRef = useRef(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const inputFocus = (ref) => {
    if (ref.current) ref.current.querySelector("input").focus();
  };

  return (
    <div className="personalInfoContainer">
      <button
        onClick={() => setIsSidebarOpen(true)}
        role="img"
        className="avatarContainer"
      >
        <Avatar
          className="iconAvatar"
          alt="Remy Sharp"
          src={imageUrl}
          style={{ height: "160px", width: "160px" }}
        />
        <CameraAltIcon
          className="iconCamera"
          style={{ height: "40px", width: "40px" }}
        />
      </button>
      <div className="ledInfos">
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
              onBlur={(e) =>
                handleSaveInfo("replace", "/email", e.target.value)
              }
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
              onBlur={(e) =>
                handleSaveInfo("replace", "/phone", e.target.value)
              }
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
      </div>
      <Drawer
        anchor={"right"}
        open={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      >
        <div className="personalInfoDetails">
          <Typography className="smallText" fontWeight={400} fontSize="12px">
            Link da imagem
          </Typography>
          <div className="input-group">
            <InputBase
              style={{
                fontWeight: "700",
                fontSize: "16px",
                color: "#1E1848",
                border: "none",
              }}
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              onBlur={(e) =>
                handleSaveInfo("replace", "/imageUrl", e.target.value)
              }
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default PersonalInfo;
