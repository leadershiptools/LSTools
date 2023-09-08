import React, { useState, useEffect } from "react";
import "../LeftMenu/leftMenu.styles.css";
import "../Styles/commons.styles.css";
import Typography from "@mui/material/Typography";
import Team from "@mui/icons-material/WorkspacesOutlined";
import People from "@mui/icons-material/PeopleAltOutlined";
import { Avatar, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { getAuth, updateProfile } from "firebase/auth";
import lsToolsLogo from "../../images/homepage-logo.png";

const LeftMenu = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const auth = getAuth();
  const defaultOrganization = user?.organizations?.[0]?.name;

  useEffect(() => {
    if (window.innerWidth <= 1024) setIsMobile(true);
    setName(auth.currentUser?.displayName);
  }, [auth.currentUser?.displayName, user]);

  const updateUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  const handleOpenMenu = () => {
    setIsOpen(true);
    document.querySelector("body").style.overflow = "hidden";
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
    document.querySelector("body").style.overflow = "";
  };

  return (
    <>
      {isMobile && <MenuIcon className="menu-icon" onClick={handleOpenMenu} />}
      <aside className={`${isOpen && "isOpen"}`}>
        <div role="menu" className="container">
          <h2 className="containerOrganization">{defaultOrganization}</h2>
          <div className="header">
            <Avatar
              className="iconAvatar"
              alt={name}
              src={"src"}
              style={{ height: "32px", width: "32px" }}
            />
            <div>
              <input
                onChange={(e) => setName(e.target.value)}
                onBlur={updateUserName}
                className="headerName"
                value={name}
              />
              <Typography
                className="headerEmail"
                fontSize="12px"
                fontWeight={400}
              >
                {user?.email}
              </Typography>
            </div>
          </div>
          <ul className="menu">
            <li
              className={`menuItem  ${
                location.pathname.includes("team") && "active"
              }`}
            >
              <Button
                className="navigationBtn"
                startIcon={<Team sx={{ fontSize: 24 }} />}
                onClick={() => {
                  navigate("/LSTools/team");
                  handleCloseMenu();
                }}
              >
                <Typography>Teams</Typography>
              </Button>
            </li>
            <li
              className={`menuItem  ${
                location.pathname.includes("people") && "active"
              }`}
            >
              <Button
                className={"navigationBtn"}
                startIcon={<People sx={{ fontSize: 24 }} />}
                onClick={() => {
                  navigate("/LSTools/people");
                  handleCloseMenu();
                }}
              >
                <Typography>People</Typography>
              </Button>
            </li>
          </ul>
          <div className="footer">
            <p>Powered by</p>
            <img className="containerLogo" src={lsToolsLogo} alt="LSTools" />
          </div>
        </div>
        {!isMobile ? (
          <div role="separator">
            <hr className="line" />
          </div>
        ) : (
          <div
            onClick={handleCloseMenu}
            className={`menu-overlay ${isOpen && "isOpen"}`}
          />
        )}
      </aside>
    </>
  );
};
export default LeftMenu;
