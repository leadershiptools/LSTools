import React from "react";
import "../LeftMenu/leftMenu.styles.css";
import "../Styles/commons.styles.css";
import Typography from "@mui/material/Typography";
import Business from "@mui/icons-material/BusinessOutlined";
import Team from "@mui/icons-material/WorkspacesOutlined";
import People from "@mui/icons-material/PeopleAltOutlined";
import Setup from "@mui/icons-material/HexagonOutlined";
import { Button } from "@mui/material";

const LeftMenu = () => (
  <aside>
    <div role="menu" className="container">
      <header>
        <Typography className="headerName" fontWeight={700} fontSize="20px">
          Dan Zendaya
        </Typography>
        <Typography className="headerEmail" fontSize="14px" fontWeight={400}>
          dan@zendaya.com
        </Typography>
      </header>
      <main>
        <ol>
          <li className="menuitem">
            <Button
              className="navigationBtn"
              startIcon={<Business />}
              disabled={true}
            >
              <Typography>Company</Typography>
            </Button>
          </li>
          <li className="menuitem">
            <Button
              className="navigationBtn"
              startIcon={<Team />}
              disabled={true}
            >
              <Typography>Team</Typography>
            </Button>
          </li>
          <li className="menuitem">
            <Button className="navigationBtn active" startIcon={<People />}>
              <Typography>People</Typography>
            </Button>
          </li>
          <li className="menuitem">
            <Button
              className="navigationBtn"
              startIcon={<Setup />}
              disabled={true}
            >
              <Typography>Setup</Typography>
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
export default LeftMenu;
