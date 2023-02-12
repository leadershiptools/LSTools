import "../GoalsPanel/goalsPanel.styles.css";
import "../../Styles/commons.styles.css";
import { Button, ButtonBase, Typography } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/AddOutlined";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import { GraphicBar } from "./gaphicBar";
import InputBase from "@mui/material/InputBase";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import OneToOne from "./oneToOne";

const GoalsPanel = () => {
  const mockObjectiveOne = React.useRef(null);
  const mockObjectiveTwo = React.useRef(null);
  const mockObjectiveThree = React.useRef(null);
  const mockAchievimentOne = React.useRef(null);
  const mockAchievimentTwo = React.useRef(null);
  const mockAchievimentThree = React.useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleCloseSidebar = () => setIsSidebarOpen(false);

  const inputFocus = (ref) => {
    if (ref.current) ref.current.querySelector("input").focus();
  };
  const [percent, setPercent] = useState(75);

  const handlePercentChange = (updated) => {
    setPercent(updated);
  };

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
        <section className="goalsIndividual">
          <div
            className="goalsDetails"
            onClick={() => inputFocus(mockObjectiveOne)}
          >
            <Typography className="smallText" fontWeight={400} fontSize="12px">
              Objetivo 1
            </Typography>
            <InputBase
              ref={mockObjectiveOne}
              style={{
                height: "20px",
                width: "100%",
                fontWeight: "700",
                color: "#1E1848",
                overflow: "visible",
                border: "none",
              }}
              defaultValue="Deliver (new product) with 1000 users Deliver (new product) with 1000 users"
            />
          </div>
          <div
            className="percentDetails"
            onClick={() => inputFocus(mockAchievimentOne)}
          >
            <Typography className="smallText" fontWeight={400} fontSize="12px">
              Atingimento
            </Typography>
            <InputBase
              ref={mockAchievimentOne}
              style={{
                fontWeight: "700",
                fontSize: "16px",
                color: "#1E1848",
                border: "none",
              }}
              defaultValue="85%"
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
        <section className="goalsIndividual">
          <div
            className="goalsDetails"
            onClick={() => inputFocus(mockObjectiveTwo)}
          >
            <Typography className="smallText" fontWeight={400} fontSize="12px">
              Objetivo 2
            </Typography>
            <InputBase
              ref={mockObjectiveTwo}
              style={{
                height: "20px",
                width: "100%",
                fontStyle: "normal",
                fontWeight: "700",
                color: "#1E1848",
                border: "none",
              }}
              defaultValue="Improve sales conversion in 7% in Q3"
            />
          </div>
          <div
            className="percentDetails"
            onClick={() => inputFocus(mockAchievimentTwo)}
          >
            <Typography className="smallText" fontWeight={400} fontSize="12px">
              Atingimento
            </Typography>
            <InputBase
              ref={mockAchievimentTwo}
              style={{
                fontWeight: "700",
                width: "120%",
                fontSize: "16px",
                color: "#1E1848",
                border: "none",
              }}
              defaultValue="60%"
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
        <section className="goalsIndividual">
          <div
            className="goalsDetails"
            onClick={() => inputFocus(mockObjectiveThree)}
          >
            <Typography className="smallText" fontWeight={400} fontSize="12px">
              Objetivo 3
            </Typography>
            <InputBase
              ref={mockObjectiveThree}
              style={{
                height: "20px",
                fontStyle: "normal",
                fontWeight: "700",
                color: "#1E1848",
                border: "none",
              }}
              defaultValue="Hire & Structure Business Unit"
            />
          </div>
          <div
            className="percentDetails"
            onClick={() => inputFocus(mockAchievimentThree)}
          >
            <Typography className="smallText" fontWeight={400} fontSize="12px">
              Atingimento
            </Typography>
            <InputBase
              ref={mockAchievimentThree}
              style={{
                fontWeight: "700",
                fontSize: "16px",
                color: "#1E1848",
                border: "none",
              }}
              defaultValue={`${percent}%`}
              onChange={(event) => {
                handlePercentChange(event.target.value);
              }}
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
      </section>
      <Divider
        className="dividerVertical"
        orientation="vertical"
        variant="middle"
        flexItem
      />
      <section className="graphicBoard">
        <div className="graphicBoardGraphContainer">
          <GraphicBar percent={percent} />
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
        <OneToOne />
      </Drawer>
    </main>
  );
};

export default GoalsPanel;
