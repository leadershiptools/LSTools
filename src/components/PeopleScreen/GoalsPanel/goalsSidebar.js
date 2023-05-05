import * as React from "react";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/AddOutlined";
import "./goalsSidebar.styles.css";
import { useState } from "react";

export default function GoalsSidebar({ goals, handleSaveInfo }) {
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const addGoal = () => {
    if (subject === "" || description === "") return;
    handleSaveInfo("add", `/goals/-`, {
      name: subject,
      description: description,
      history: [
        {
          date: new Date(),
          achievement: 0.0,
        },
      ],
    });
    setSubject("");
    setDescription("");
  };
  return (
    <div className="goalsSidebar">
      <div className="header">
        <h3>🎯 Metas</h3>
        <div className="input-group">
          <InputBase
            inputProps={{ maxLength: 80 }}
            style={{
              fontWeight: "700",
              fontSize: "16px",
              color: "#1E1848",
              border: "none",
            }}
            placeholder="Assunto"
            onChange={(e) => setSubject(e.target.value)}
            value={subject}
          />
          <span>80 caracteres</span>
        </div>
        <div className="input-group">
          <InputBase
            inputProps={{ maxLength: 320 }}
            style={{
              fontWeight: "700",
              fontSize: "16px",
              color: "#1E1848",
              border: "none",
            }}
            placeholder="Descrição"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
          <span>320 caracteres</span>
        </div>
        <div className="header-buttons">
          <Button
            className="addGoalSidebarButton"
            aria-label="adicionar meta"
            variant="outlined"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={addGoal}
          >
            <Typography fontWeight={700}>Adicionar meta</Typography>
          </Button>
        </div>
      </div>
      <div className="sidebar-list">
        {goals?.map((goal) => {
          const { name, description, achievement } = goal;
          return (
            <div className="sidebar-list-item">
              <div className="sidebar-list-item-middle">
                <p>{name}</p>
                <span>{description}</span>
              </div>
              <div className="sidebar-list-item-right">
                <p>%</p>
                <label>{achievement}</label>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
