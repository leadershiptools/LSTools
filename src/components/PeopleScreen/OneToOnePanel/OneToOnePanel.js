import "./OneToOnePanel.styles.css";
import * as React from "react";
import { ButtonBase } from "@mui/material";
import AddIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MoreVert from "@mui/icons-material/MoreVert";
import { OneToOneGraph } from "./OneToOneGraph";

const OneToOnePanel = () => (
  <main className="oneToOneContainer">
    <div className="oneToOneContainerTop">
      <h2>💡 One to one</h2>

      <Button
        className="oneToOneButton"
        variant="outlined"
        color="secondary"
        startIcon={<AddIcon />}
      >
        <Typography fontWeight={700}>Add</Typography>
      </Button>
    </div>
    <div className="oneToOneContainerBottom">
      <section className="oneToOnePanel">
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
              <p>Estou feliz</p>
              <span>
                Estou empolgado com o desafio atual, vai ser difícil de alcançar
                mas acredito no time
              </span>
            </div>
            <div className="oneToOneListItemRight">
              <Button>
                <MoreVert />
              </Button>
            </div>
          </div>
          <div className="oneToOneListItem">
            <div className="oneToOneListItemLeft">🔴</div>
            <div className="oneToOneListItemMiddle">
              <p>Tive um conflito com o time</p>
              <span>
                Temos opiniões diferentes sobre a priorização do trimestre e
                eles estão mais...
              </span>
            </div>
            <div className="oneToOneListItemRight">
              <Button>
                <MoreVert />
              </Button>
            </div>
          </div>
          <div className="oneToOneListItem">
            <div className="oneToOneListItemLeft">🔴</div>
            <div className="oneToOneListItemMiddle">
              <p>Tive um conflito com o time</p>
              <span>
                Temos opiniões diferentes sobre a priorização do trimestre e
                eles estão mais...
              </span>
            </div>
            <div className="oneToOneListItemRight">
              <Button>
                <MoreVert />
              </Button>
            </div>
          </div>
          <div className="oneToOneListItem">
            <div className="oneToOneListItemLeft">🔴</div>
            <div className="oneToOneListItemMiddle">
              <p>Tive um conflito com o time</p>
              <span>
                Temos opiniões diferentes sobre a priorização do trimestre e
                eles estão mais...
              </span>
            </div>
            <div className="oneToOneListItemRight">
              <Button>
                <MoreVert />
              </Button>
            </div>
          </div>
          <ButtonBase className="oneToOnePanelButton">
            Ver histórico completo de one to one
          </ButtonBase>
        </div>
      </section>
      <section className="graphicOneToOne">
        <OneToOneGraph />
      </section>
    </div>
  </main>
);

export default OneToOnePanel;
