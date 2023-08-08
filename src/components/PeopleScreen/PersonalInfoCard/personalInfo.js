import "../PersonalInfoCard/personalInfo.styles.css";
import "../../Styles/commons.styles.css";
import * as React from "react";
import { Drawer, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { triggerBlurOnEnter } from "../../../modules/utils";
import { get } from "../../../modules/request";

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
  skillSet,
  setSkillSet,
  handleSaveInfo,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [skillsSet, setSkillsSet] = useState([]);

  const getSkillSets = async () => {
    const response = await get("/skills-groups");
    setSkillsSet(response.content);
  };

  useEffect(() => {
    getSkillSets();
  }, []);

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
      <div className="colaboratorDetails">
        <div className="colaboratorInfo">
          <InputBase
            style={{
              fontWeight: "700",
              fontSize: "40px",
              border: "none",
              color: "#493D8A",
            }}
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Name"
            onBlur={(e) => handleSaveInfo("replace", "/name", e.target.value)}
            inputProps={{
              onKeyDown: triggerBlurOnEnter,
            }}
          />
        </div>
        <div className="colaboratorDetailsRow">
          <div className="colaboratorInfo">
            <InputBase
              style={{
                fontWeight: "400",
                fontSize: "12px",
                display: "inline",
                border: "none",
                color: "#493D8A",
              }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              onBlur={(e) =>
                handleSaveInfo("replace", "/email", e.target.value)
              }
              placeholder="Email"
              inputProps={{
                onKeyDown: triggerBlurOnEnter,
              }}
            />
          </div>
          <div className="colaboratorInfo">
            <InputBase
              style={{
                fontWeight: "400",
                fontSize: "12px",
                display: "inline",
                border: "none",
                color: "#493D8A",
              }}
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              onBlur={(e) =>
                handleSaveInfo("replace", "/phone", e.target.value)
              }
              inputProps={{
                onKeyDown: triggerBlurOnEnter,
              }}
            />
          </div>
        </div>
        <div className="colaboratorDetailsRow marginTop">
          <div className="colaboratorInfo">
            <InputBase
              style={{
                fontWeight: "700",
                fontSize: "20px",
                display: "inline",
                border: "none",
                color: "#493D8A",
                width: "100px",
              }}
              onChange={(e) => setPosition(e.target.value)}
              value={position}
              onBlur={(e) =>
                handleSaveInfo("replace", "/job/name", e.target.value)
              }
              inputProps={{
                onKeyDown: triggerBlurOnEnter,
              }}
            />
          </div>

          <div>
            <select
              value={skillSet}
              onChange={setSkillSet}
              className="skillSetSelect"
            >
              {skillsSet?.map((s) => {
                return <option value={s.id}>{s.name}</option>;
              })}
            </select>
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
              inputProps={{
                onKeyDown: triggerBlurOnEnter,
              }}
            />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default PersonalInfo;
