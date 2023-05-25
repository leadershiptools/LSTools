import React, { useEffect, useState } from "react";
import teamErrorImage from "../../images/teams-error-image.png";
import "./index.styles.css";
import { get, post } from "../../modules/request";
import { Button, Typography } from "@mui/material";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function TeamScreen({ user }) {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const defaultOrganization = user?.organizations?.[0]?.id;

  const getTeams = async () => {
    const response = await get(`/organization/${defaultOrganization}/teams`);
    if (response?.teams?.length > 0) setTeams(response.teams);
  };

  const editPeople = (peopleId) => navigate(`/LSTools/people/${peopleId}`);

  const addPeople = (organizationId, teamId) => {
    post(`/organization/${organizationId}/team/${teamId}/people`, {
      peopleIds: [uuidv4()],
    });
  };

  useEffect(() => {
    getTeams();
  }, [user]);

  return (
    <div className="team-screen-container">
      {teams?.length ? (
        <div className="team-screen-teams">
          {teams.map((team) => {
            const { name, people } = team;
            return (
              <div className="team-screen-teams-item">
                <Typography variant="h2">{name}</Typography>
                <Button
                  className="team-screen-container-button"
                  style={{
                    width: "200px",
                  }}
                  variant="outlined"
                  onClick={() => addPeople(defaultOrganization, team?.id)}
                >
                  <PeopleOutlineOutlinedIcon />
                  Adicionar integrante
                </Button>
                <div className="team-screen-peoples">
                  {people?.map((p) => {
                    return (
                      <div className="team-screen-peoples-item">
                        <div className="team-screen-peoples-item-image">
                          <img
                            alt="Avatar"
                            src={p.imageUrl}
                            style={{
                              maxHeight: "150px",
                              width: "auto",
                              borderRadius: "none",
                            }}
                          />
                        </div>
                        <div className="team-screen-peoples-item-content">
                          <p>{p.name}</p>
                          <span>{p?.job?.name}</span>
                          <div className="team-screen-peoples-item-content-actions">
                            <Button
                              className="team-screen-container-button"
                              variant="outlined"
                              style={{ fontWeight: 700 }}
                              onClick={() => editPeople(p.id)}
                            >
                              EDITAR
                            </Button>
                            <Button
                              className="team-screen-container-button"
                              variant="outlined"
                            >
                              <DeleteOutlineIcon style={{ margin: 0 }} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="team-screen-container-error">
          <img src={teamErrorImage} alt="Teams" />
          <p>You need to create a team to add people</p>
          <Button className="team-screen-container-button" variant="outlined">
            <WorkspacesOutlinedIcon />
            Criar time
          </Button>
        </div>
      )}
    </div>
  );
}

export default TeamScreen;
