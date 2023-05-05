import "../GoalsPanel/goalsPanel.styles.css";
import "../../Styles/commons.styles.css";
import { Button, ButtonBase, Typography } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { GraphicBar } from "./gaphicBar";
import InputBase from "@mui/material/InputBase";
import React, { createRef, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import GoalsSidebar from "./goalsSidebar";

const GoalsPanel = ({ goals, handleSaveInfo }) => {
  const [objectiveInputs, setObjectiveInputs] = useState([]);
  const [achievementInputs, setAchievementInputs] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCloseSidebar = () => setIsSidebarOpen(false);

  const inputFocus = (ref) => {
    if (ref.current) ref.current.querySelector("input").focus();
  };

  useEffect(() => {
    setObjectiveInputs((prevState) =>
      Array(goals?.length)
        .fill(null)
        .map((_, i) => prevState[i] || createRef())
    );
  }, [goals]);

  useEffect(() => {
    setAchievementInputs((prevState) =>
      Array(goals?.length)
        .fill(null)
        .map((_, i) => prevState[i] || createRef())
    );
  }, [goals]);

  return (
    <main className="goalsPanel">
      <section className="goalsBoard">
        <div className="addGoals">
          <Typography className="midText" fontWeight={700} fontSize="24px">
            🎯 Metas
          </Typography>
          <Button
            className="addGoalBtn"
            style={{ marginRight: "5px" }}
            aria-label="adicionar meta"
            variant="outlined"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => setIsSidebarOpen(true)}
          >
            <Typography fontWeight={700}>Adicionar meta</Typography>
          </Button>
        </div>
        <div className="goalsItemsContainer">
          {goals?.map((goal, index) => {
            const { id, name, achievement } = goal;
            return (
              <>
                <section key={id} className="goalsIndividual">
                  <div
                    className="goalsDetails"
                    onClick={() => inputFocus(objectiveInputs[index])}
                  >
                    <Typography
                      className="smallText"
                      fontWeight={400}
                      fontSize="12px"
                    >
                      Assunto
                    </Typography>
                    <InputBase
                      ref={objectiveInputs[index]}
                      style={{
                        height: "20px",
                        width: "100%",
                        fontWeight: "700",
                        color: "#1E1848",
                        overflow: "visible",
                        border: "none",
                      }}
                      defaultValue={name}
                      onBlur={(e) =>
                        handleSaveInfo(
                          "replace",
                          `/goals/${index}/name`,
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div
                    className="percentDetails"
                    onClick={() => inputFocus(achievementInputs[index])}
                  >
                    <Typography
                      className="smallText"
                      fontWeight={400}
                      fontSize="12px"
                    >
                      Atingimento
                    </Typography>
                    <InputBase
                      ref={achievementInputs[index]}
                      style={{
                        fontWeight: "700",
                        fontSize: "16px",
                        color: "#1E1848",
                        border: "none",
                      }}
                      defaultValue={achievement}
                      onBlur={(e) =>
                        handleSaveInfo("add", `/goals/${index}/history/-`, {
                          date: new Date(),
                          achievement: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="moreDetailsContainer">
                    <IconButton
                      className="moreDetailsBtn"
                      aria-label="mais detalhes"
                      onClick={() => setIsSidebarOpen(true)}
                    >
                      <MoreVert />
                    </IconButton>
                  </div>
                </section>
                <Divider className="dividerHorizontal" variant="middle" />
              </>
            );
          })}
        </div>
      </section>
      <Divider
        className="dividerVertical"
        orientation="vertical"
        variant="middle"
        flexItem
      />
      <section className="graphicBoard">
        <div className="graphicBoardGraphContainer">
          <GraphicBar goals={goals} />
        </div>
        <ButtonBase
          className="graphicBoardBtn"
          onClick={() => setIsSidebarOpen(true)}
        >
          Ver histórico completo de metas
        </ButtonBase>
      </section>
      <Drawer
        anchor={"right"}
        open={isSidebarOpen}
        onClose={handleCloseSidebar}
      >
        <GoalsSidebar goals={goals} handleSaveInfo={handleSaveInfo} />
      </Drawer>
    </main>
  );
};

export default GoalsPanel;
