import React, { useEffect, useState } from "react";
import teamErrorImage from "../../images/teams-error-image.png";
import "./index.styles.css";
import { get } from "../../modules/request";
import { Button } from "@mui/material";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
function TeamScreen({ user }) {
  const [teams, setTeams] = useState([]);

  const getTeams = async () => {
    const defaultOrganization = user?.organizations?.[0]?.id;

    const teams = await get(`/organization/${defaultOrganization}/teams`);
    console.log(teams);
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div className="team-screen-container">
      {teams?.length ? (
        "oi"
      ) : (
        <div className="team-screen-container-error">
          <img src={teamErrorImage} alt="Teams" />
          <p>You need to create a team to add people</p>
          <Button
            className="team-screen-container-error-button"
            variant="outlined"
          >
            <WorkspacesOutlinedIcon />
            Criar time
          </Button>
        </div>
      )}
    </div>
  );
}

export default TeamScreen;
