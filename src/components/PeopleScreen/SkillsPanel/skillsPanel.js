import "../SkillsPanel/skillsPanel.styles.css";
import * as React from "react";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MoreVert from "@mui/icons-material/MoreVert";
import { SkillsGraph } from "./skillsGraph";

const SkillsPanel = () => (
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
            defaultValue="Ex: Inglês Fluente"
          />
          <span>40 caracteres</span>
        </div>
        <Button
          className="skillsBoardFormButton"
          aria-label="adicionar"
          variant="outlined"
          color="secondary"
          startIcon={<AddIcon />}
        >
          <Typography fontWeight={700}>Adicionar meta</Typography>
        </Button>
      </div>
      <div className="skillsBoardList">
        <div className="skillsBoardListItem">
          <p>Competitor Analysis</p>
          <span>2</span>
          <Button>
            <MoreVert />
          </Button>
        </div>
        <div className="skillsBoardListItem">
          <p>Competitor Analysis</p>
          <span>2</span>
          <Button>
            <MoreVert />
          </Button>
        </div>
        <div className="skillsBoardListItem">
          <p>Businness Domain</p>
          <span>4</span>
          <Button>
            <MoreVert />
          </Button>
        </div>
        <div className="skillsBoardListItem">
          <p>Competitor Analysis</p>
          <span>4</span>
          <Button>
            <MoreVert />
          </Button>
        </div>
      </div>
    </section>
    <section className="graphicSkillsBoard">
      <SkillsGraph />
    </section>
  </main>
);

export default SkillsPanel;
