import React, { useEffect, useState } from "react";
import "./index.styles.css";
import { get, patch, post, sendDelete } from "../../modules/request";
import { Button } from "@mui/material";
import WorkspacesOutlinedIcon from "@mui/icons-material/WorkspacesOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useNavigate } from "react-router-dom";
import { triggerBlurOnEnter } from "../../modules/utils";
import CircularProgress from "@mui/material/CircularProgress";

function TeamScreen({ user }) {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState({});
  const [minimizedTeams, setMinimizedTeams] = useState({});

  const defaultOrganization = user?.organizations?.[0]?.id;

  const handleMinimizeTeams = (teamId) =>
    setMinimizedTeams((prevState) => ({
      ...prevState,
      [teamId]: prevState[teamId] ? !prevState[teamId] : true,
    }));

  const getTeams = async () => {
    const response = await get(`/organization/${defaultOrganization}/teams`);
    if (response?.teams?.length > 0) {
      setTeams(response.teams);
      response.teams.forEach((team) => {
        setTeamName((prevState) => ({ ...prevState, [team?.id]: team.name }));
      });
    }
  };

  const editPeople = (peopleId, teamId) =>
    navigate(`/LSTools/people/${peopleId}`, { state: { teamName: teamId } });

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

  const createTeam = async (organizationId) => {
    await post(`/team?organizationId=${organizationId}`, {
      name: "Team name",
    });
    await getTeams();
  };

  const deleteTeam = async (organizationId, teamId) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to do this?")) {
      await sendDelete(
        `/team/${teamId}?teamId=${teamId}&organizationId=${organizationId}`
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
      <div className="team-screen-header">
        <Button
          className="team-screen-header-button"
          variant="outlined"
          onClick={() => createTeam(defaultOrganization)}
        >
          <WorkspacesOutlinedIcon />
          Add team
        </Button>
      </div>
      {teams?.length ? (
        <div className="team-screen-teams">
          {teams.map((team, index) => {
            const { people } = team;
            return (
              <div key={index} className="team-screen-teams-item">
                <div className="team-screen-teams-item-header">
                  <input
                    value={teamName?.[team?.id]}
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
                    onKeyDown={triggerBlurOnEnter}
                  />
                  <div className="team-screen-teams-item-header-actions">
                    <Button
                      className="team-screen-header-button"
                      onClick={() => handleMinimizeTeams(team?.id)}
                    >
                      Minimizar
                      {minimizedTeams?.[team?.id] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </Button>
                    <Button
                      className="team-screen-header-button"
                      variant="outlined"
                      onClick={() => deleteTeam(defaultOrganization, team?.id)}
                    >
                      <DeleteOutlineIcon style={{ margin: 0 }} />
                    </Button>
                  </div>
                </div>
                <Button
                  className={`${
                    minimizedTeams?.[team?.id] && "minimized"
                  } team-screen-container-button`}
                  style={{
                    width: "200px",
                  }}
                  variant="outlined"
                  onClick={() => addPeople(defaultOrganization, team?.id)}
                >
                  <PeopleOutlineOutlinedIcon />
                  Adicionar integrante
                </Button>
                <div
                  className={`${
                    minimizedTeams?.[team?.id] && "minimized"
                  } team-screen-peoples`}
                >
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
                            onClick={() => editPeople(p.id, team.name)}
                          />
                        </div>
                        <div className="team-screen-peoples-item-content">
                          <p onClick={() => editPeople(p.id, team.name)}>
                            {p.name}
                          </p>
                          <span onClick={() => editPeople(p.id, team.name)}>
                            {p?.job?.name}
                          </span>
                          <div className="team-screen-peoples-item-content-actions">
                            <Button
                              className="team-screen-container-button"
                              variant="outlined"
                              style={{ fontWeight: 700 }}
                              onClick={() => editPeople(p.id, team.name)}
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
          <CircularProgress sx={{ color: "#000" }} />
        </div>
      )}
    </div>
  );
}

export default TeamScreen;
