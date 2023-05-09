import "../SkillsPanel/skillsPanel.styles.css";
import * as React from "react";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MoreVert from "@mui/icons-material/MoreVert";
import { SkillsGraph } from "./skillsGraph";
import { useState } from "react";

const SkillsPanel = ({ skills, handleSaveInfo }) => {
  const [skillName, setSkillName] = useState("");

  const addSkill = () => {
    if (skillName === "") return;
    handleSaveInfo("add", `/skills/-`, {
      name: skillName,
      description: "",
      history: [
        {
          date: new Date(),
          score: 1,
        },
      ],
    });
    setSkillName("");
  };

  return (
    <main className="skillsPanel">
      <section className="skillsBoard">
        <h2>🧩 Skills</h2>
        <div className="skillsBoardForm">
          <div className="input-group">
            <InputBase
              inputProps={{ maxLength: 40 }}
              style={{
                fontWeight: "700",
                fontSize: "16px",
                color: "#1E1848",
                border: "none",
              }}
              placeholder="Ex: Inglês Fluente"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
            />
            <span>40 caracteres</span>
          </div>
          <Button
            className="skillsBoardFormButton"
            aria-label="adicionar"
            variant="outlined"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={addSkill}
          >
            <Typography fontWeight={700}>Adicionar</Typography>
          </Button>
        </div>
        <div className="skillsBoardList">
          {skills?.map((skill) => {
            const { name, score } = skill;
            return (
              <div className="skillsBoardListItem">
                <p>{name}</p>
                <span>{score}</span>
                <Button>
                  <MoreVert />
                </Button>
              </div>
            );
          })}
        </div>
      </section>
      <section className="graphicSkillsBoard">
        <SkillsGraph />
      </section>
    </main>
  );
};

export default SkillsPanel;
