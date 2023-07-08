import React, { useEffect, useState } from "react";
import teamErrorImage from "../../images/teams-error-image.png";
import "./index.styles.css";
import { get, sendDelete } from "../../modules/request";
import { Button, CircularProgress } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";

function PeopleListScreen({ user }) {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");

  const defaultOrganization = user?.organizations?.[0]?.id;

  const getTeams = async () => {
    const response = await get(`/organization/${defaultOrganization}/teams`);
    if (response?.teams?.length > 0) setTeams(response.teams);
  };

  const editPeople = (peopleId, teamId) =>
    navigate(`/LSTools/people/${peopleId}`, { state: { teamName: teamId } });

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

  useEffect(() => {
    getTeams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="peoples-screen-container">
      {teams?.length ? (
        <div className="peoples-screen-peoples-container">
          {teams.map((team) => {
            const { name, people } = team;
            if (teamName === "") setTeamName(name);
            return people?.map((p) => {
              return (
                <div key={p.id} className="peoples-screen-peoples-item">
                  <div className="peoples-screen-peoples-item-image">
                    <img
                      alt="Avatar"
                      src={p.imageUrl}
                      style={{
                        maxHeight: "150px",
                        width: "auto",
                        borderRadius: "none",
                      }}
                      onClick={() => editPeople(p.id, team.name)}
                    />
                  </div>
                  <div className="peoples-screen-peoples-item-content">
                    <p onClick={() => editPeople(p.id, team.name)}>{p.name}</p>
                    <span onClick={() => editPeople(p.id, team.name)}>
                      {p?.job?.name}
                    </span>
                    <div className="peoples-screen-peoples-item-content-actions">
                      <Button
                        className="peoples-screen-container-button"
                        variant="outlined"
                        style={{ fontWeight: 700 }}
                        onClick={() => editPeople(p.id, team.name)}
                      >
                        EDITAR
                      </Button>
                      <Button
                        className="peoples-screen-container-button"
                        variant="outlined"
                        onClick={() =>
                          deletePeople(defaultOrganization, team?.id, p.id)
                        }
                      >
                        <DeleteOutlineIcon style={{ margin: 0 }} />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            });
          })}
        </div>
      ) : (
        <div className="team-screen-container-error">
          <CircularProgress sx={{ color: "#000" }} />
        </div>
      )}
    </div>
  );
}

export default PeopleListScreen;
