import React, { useState, useEffect } from "react";
import "../LeftMenu/leftMenu.styles.css";
import "../Styles/commons.styles.css";
import Typography from "@mui/material/Typography";
import Team from "@mui/icons-material/WorkspacesOutlined";
import People from "@mui/icons-material/PeopleAltOutlined";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { getAuth, updateProfile } from "firebase/auth";
const LeftMenu = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const auth = getAuth();

  useEffect(() => {
    if (window.innerWidth <= 1024) setIsMobile(true);
    setName(auth.currentUser?.displayName);
  }, [auth.currentUser?.displayName, user]);

  const updateUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  return (
    <>
      {isMobile && (
        <MenuIcon className="menu-icon" onClick={() => setIsOpen(true)} />
      )}
      <aside className={`${isOpen && "isOpen"}`}>
        <div role="menu" className="container">
          <header>
            <input
              onChange={(e) => setName(e.target.value)}
              onBlur={updateUserName}
              className="headerName"
              value={name}
            />
            <Typography
              className="headerEmail"
              fontSize="14px"
              fontWeight={400}
            >
              {user?.email}
            </Typography>
          </header>
          <main>
            <ol>
              <li className="menuitem">
                <Button
                  className={`navigationBtn ${
                    location.pathname.includes("team") && "active"
                  }`}
                  startIcon={<Team />}
                  onClick={() => navigate("/LSTools/team")}
                >
                  <Typography>Team</Typography>
                </Button>
              </li>
              <li className="menuitem">
                <Button
                  className={`navigationBtn ${
                    location.pathname.includes("people") && "active"
                  }`}
                  startIcon={<People />}
                  onClick={() => navigate("/LSTools/people")}
                >
                  <Typography>People</Typography>
                </Button>
              </li>
            </ol>
          </main>
        </div>
        {!isMobile ? (
          <div role="separator">
            <hr className="line" />
          </div>
        ) : (
          <div
            onClick={() => setIsOpen(false)}
            className={`menu-overlay ${isOpen && "isOpen"}`}
          />
        )}
      </aside>
    </>
  );
};
export default LeftMenu;
