import React, { useEffect, useState } from "react";
import teamErrorImage from "../../images/teams-error-image.png";
import "./index.styles.css";
import { get, patch, post, sendDelete } from "../../modules/request";
import { Button } from "@mui/material";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";

function TeamScreen({ user }) {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const defaultOrganization = user?.organizations?.[0]?.id;

  const getTeams = async () => {
    const response = await get(`/organization/${defaultOrganization}/teams`);
    if (response?.teams?.length > 0) setTeams(response.teams);
  };

  const editPeople = (peopleId) => navigate(`/LSTools/people/${peopleId}`);

  const addPeople = async (organizationId, teamId) => {
    const people = await post(`/organization/${organizationId}/people`);
    await post(`/organization/${organizationId}/team/${teamId}/people`, {
      peopleIds: [people.id],
    });
    await getTeams();
  };

  const deletePeople = async (organizationId, teamId, peopleId) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to do this?")) {
      await sendDelete(
        `/organization/${organizationId}/team/${teamId}/people`,
        {
          peopleIds: [peopleId],
        }
      );
      await getTeams();
    }
  };

  const updateTeam = async (action, path, value, organizationId, teamId) => {
    await patch(`/organization/${organizationId}/team/${teamId}`, [
      {
        op: action,
        path,
        value,
      },
    ]);

    await getTeams();
  };

  useEffect(() => {
    getTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="team-screen-container">
      {teams?.length ? (
        <div className="team-screen-teams">
          {teams.map((team, index) => {
            const { name, people } = team;
            if (teamName === "") setTeamName(name);
            return (
              <div key={index} className="team-screen-teams-item">
                <input
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  onBlur={(e) => {
                    updateTeam(
                      "replace",
                      `/name`,
                      e.target.value,
                      defaultOrganization,
                      team?.id
                    );
                  }}
                />
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
                      <div key={p.id} className="team-screen-peoples-item">
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
                              onClick={() =>
                                deletePeople(
                                  defaultOrganization,
                                  team?.id,
                                  p.id
                                )
                              }
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
