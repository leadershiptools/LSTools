import "./SalaryPanel.styles.css";
import * as React from "react";
import { ButtonBase } from "@mui/material";
import AddIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MoreVert from "@mui/icons-material/MoreVert";
import { SalaryGraph } from "./SalaryGraph";

const SalaryPanel = () => (
  <main className="salaryPanelContainer">
    <section className="salaryPanel">
      <div className="salaryPanelHeader">
        <h2>💵 Salary evolution</h2>

        <Button
          className="salaryPanelButton"
          aria-label="adicionar"
          variant="outlined"
          color="secondary"
          startIcon={<AddIcon />}
        >
          <Typography fontWeight={700}>Adicionar</Typography>
        </Button>
      </div>
      <div className="salaryPanelList">
        <div className="salaryPanelListItem">
          <div className="salaryPanelListItemMiddle">
            <p>PM Cordinator - Senior 3</p>
            <span>
              Aumento por Mérito em 06/11/19, Faixa 120% - R$ 18.220,00
            </span>
          </div>
          <div className="salaryPanelListItemRight">
            {" "}
            <Button>
              <MoreVert />
            </Button>
          </div>
        </div>
        <div className="salaryPanelListItem">
          <div className="salaryPanelListItemMiddle">
            <p>PM Cordinator - Senior 2</p>
            <span>
              Aumento por Mérito em 01/01/19, Faixa 100% - R$ 14.568,00
            </span>
          </div>
          <div className="salaryPanelListItemRight">
            <Button>
              <MoreVert />
            </Button>
          </div>
        </div>
        <div className="salaryPanelListItem">
          <div className="salaryPanelListItemMiddle">
            <p>PM Cordinator - Senior 1</p>
            <span>
              Aumento por Mérito em 05/01/18, Faixa 100% - R$ 12.087,00
            </span>
          </div>
          <div className="salaryPanelListItemRight">
            <Button>
              <MoreVert />
            </Button>
          </div>
        </div>
      </div>
    </section>
    <section className="graphicSalaryPanel">
      <SalaryGraph />
      <ButtonBase className="graphicSalaryBtn">
        ver histórico salarial
      </ButtonBase>
    </section>
  </main>
);

export default SalaryPanel;
