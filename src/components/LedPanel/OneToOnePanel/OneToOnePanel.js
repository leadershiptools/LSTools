import "./OneToOnePanel.styles.css";
import * as React from "react";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MoreVert from "@mui/icons-material/MoreVert";
import { SkillsGraph } from "./OneToOneGraph";

const OneToOnePanel = () => (
  <main className="oneToOneContainer">
    <section className="oneToOnePanel">
      <h2>💡 One to one</h2>
      <div className="oneToOneList">
        <div className="oneToOneListItem">
          <div className="oneToOneListItemLeft">🟢</div>
          <div className="oneToOneListItemMiddle">
            <p>Feliz com o aumento</p>
            <span>
              Fiquei muito feliz com o reconhecimento que recebi esse mês
            </span>
          </div>
          <div className="oneToOneListItemRight">
            {" "}
            <Button>
              <MoreVert />
            </Button>
          </div>
        </div>
        <div className="oneToOneListItem">
          <div className="oneToOneListItemLeft">🟢</div>
          <div className="oneToOneListItemMiddle">
            <p>Feliz com o aumento</p>
            <span>
              Fiquei muito feliz com o reconhecimento que recebi esse mês
            </span>
          </div>
          <div className="oneToOneListItemRight">
            {" "}
            <Button>
              <MoreVert />
            </Button>
          </div>
        </div>
        <div className="oneToOneListItem">
          <div className="oneToOneListItemLeft">🟢</div>
          <div className="oneToOneListItemMiddle">
            <p>Feliz com o aumento</p>
            <span>
              Fiquei muito feliz com o reconhecimento que recebi esse mês
            </span>
          </div>
          <div className="oneToOneListItemRight">
            {" "}
            <Button>
              <MoreVert />
            </Button>
          </div>
        </div>
      </div>
    </section>
    <section className="graphicOneToOne">
      <SkillsGraph />
    </section>
  </main>
);

export default OneToOnePanel;
