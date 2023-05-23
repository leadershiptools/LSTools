import React from "react";
import "../LeftMenu/leftMenu.styles.css";
import "../Styles/commons.styles.css";
import Typography from "@mui/material/Typography";
import Team from "@mui/icons-material/WorkspacesOutlined";
import People from "@mui/icons-material/PeopleAltOutlined";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const LeftMenu = ({ user }) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <aside>
      <div role="menu" className="container">
        <header>
          <Typography className="headerName" fontWeight={700} fontSize="20px">
            {user?.name}
          </Typography>
          <Typography className="headerEmail" fontSize="14px" fontWeight={400}>
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
                disabled={true}
              >
                <Typography>People</Typography>
              </Button>
            </li>
          </ol>
        </main>
      </div>
      <div role="separator">
        <hr className="line" />
      </div>
    </aside>
  );
};
export default LeftMenu;
