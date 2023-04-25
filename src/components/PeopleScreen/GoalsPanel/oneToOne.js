import * as React from "react";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ButtonBase from "@mui/material/ButtonBase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/AddOutlined";
import MoreVert from "@mui/icons-material/MoreVert";
import "./oneToOne.styles.css";

export default function OneToOne() {
  const buttonRef = React.useRef(null);
  const [isOpenMenu, setIsOpenMenu] = React.useState(false);
  return (
    <div className="oneToOne">
      <div className="header">
        <h3>💡 One to one</h3>
        <div className="input-group">
          <InputBase
            inputProps={{ maxLength: 80 }}
            style={{
              fontWeight: "700",
              fontSize: "16px",
              color: "#1E1848",
              border: "none",
            }}
            defaultValue="Assunto"
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
            defaultValue="Descrição"
          />
          <span>320 caracteres</span>
        </div>
        <div className="header-buttons">
          <ButtonBase
            className="criticityButton"
            ref={buttonRef}
            onClick={() => setIsOpenMenu(true)}
          >
            Criticidade <ExpandMoreIcon />
          </ButtonBase>
          <Menu open={isOpenMenu} anchorEl={buttonRef.current}>
            <MenuItem onClick={() => setIsOpenMenu(false)}>Profile</MenuItem>
            <MenuItem onClick={() => setIsOpenMenu(false)}>My account</MenuItem>
            <MenuItem onClick={() => setIsOpenMenu(false)}>Logout</MenuItem>
          </Menu>
          <Button
            className="addGoalSidebarButton"
            aria-label="adicionar meta"
            variant="outlined"
            color="secondary"
            startIcon={<AddIcon />}
          >
            <Typography fontWeight={700}>Adicionar meta</Typography>
          </Button>
        </div>
      </div>
      <div className="sidebar-list">
        <div className="sidebar-list-item">
          <div className="sidebar-list-item-left">🟢</div>
          <div className="sidebar-list-item-middle">
            <p>Feliz com o aumento</p>
            <span>
              Fiquei muito feliz com o reconhecimento que recebi esse mês
            </span>
          </div>
          <div className="sidebar-list-item-right">
            <Button>
              <MoreVert />
            </Button>
          </div>
        </div>
        <div className="sidebar-list-item">
          <div className="sidebar-list-item-left">🔴</div>
          <div className="sidebar-list-item-middle">
            <p>Tive um conflito com o time</p>
            <span>
              Temos opiniões diferentes sobre a priorização do trimestre e eles
              estão mais preocupado
            </span>
          </div>
          <div className="sidebar-list-item-right">
            <Button>
              <MoreVert />
            </Button>
          </div>
        </div>
        <div className="sidebar-list-item">
          <div className="sidebar-list-item-left">🟢</div>
          <div className="sidebar-list-item-middle">
            <p>Feliz com o aumento</p>
            <span>
              Fiquei muito feliz com o reconhecimento que recebi esse mês
            </span>
          </div>
          <div className="sidebar-list-item-right">
            <Button>
              <MoreVert />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
