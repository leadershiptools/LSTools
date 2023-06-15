import "../SkillsPanel/skillsPanel.styles.css";
import * as React from "react";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import MoreVert from "@mui/icons-material/MoreVert";
import { SkillsGraph } from "./skillsGraph";
import { useEffect, useState } from "react";
import { Menu, MenuItem } from "@mui/material";
import { triggerBlurOnEnter } from "../../../modules/utils";

const SkillsPanel = ({ skills, handleSaveInfo }) => {
  const [skillName, setSkillName] = useState("");
  const [skillNameInputs, setSkillNameInputs] = useState({});
  const [skillScoreInputs, setSkillScoreInputs] = useState({});
  const [skillError, setCreateSkillError] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDeleteSkill = async () => {
    const index = anchorEl?.getAttribute("data-id");
    // eslint-disable-next-line no-restricted-globals
    if (index && confirm("Are you sure you want to do this?")) {
      await handleSaveInfo("remove", `/skills/${index}`);
      setAnchorEl(null);
    }
  };

  const handleCloseMenu = () => setAnchorEl(null);

  const addSkill = async () => {
    if (skillName === "") {
      setCreateSkillError(true);
      return;
    }
    setCreateSkillError(false);
    await handleSaveInfo("add", `/skills/-`, {
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

  useEffect(() => {
    skills?.forEach((skill) => {
      setSkillNameInputs((prevState) => ({
        ...prevState,
        [skill.name]: skill.name,
      }));
      setSkillScoreInputs((prevState) => ({
        ...prevState,
        [skill.name]: skill.score,
      }));
    });
  }, [skills]);

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
            {skillError && (
              <p className="skillsBoardFormError">
                You cannot create an empty skill
              </p>
            )}
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
          {skills?.map((skill, index) => {
            const { name } = skill;
            return (
              <div key={index} className="skillsBoardListItem">
                <input
                  className="skillsBoardListItemInputName"
                  value={skillNameInputs[name]}
                  onChange={(e) =>
                    setSkillNameInputs((prevState) => ({
                      ...prevState,
                      [name]: e.target.value,
                    }))
                  }
                  onBlur={(e) =>
                    handleSaveInfo(
                      "replace",
                      `/skills/${index}/name`,
                      e.target.value
                    )
                  }
                  onKeyDown={triggerBlurOnEnter}
                />
                <input
                  className="skillsBoardListItemInputScore"
                  type="number"
                  value={skillScoreInputs[name]}
                  onChange={(e) =>
                    setSkillScoreInputs((prevState) => ({
                      ...prevState,
                      [name]: e.target.value,
                    }))
                  }
                  onBlur={(e) =>
                    handleSaveInfo("add", `/skills/${index}/history/-`, {
                      score: Number(e.target.value),
                      date: new Date(),
                    })
                  }
                  onKeyDown={triggerBlurOnEnter}
                />
                <Button data-id={index} onClick={handleOpenMenu}>
                  <MoreVert />
                </Button>
                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <MenuItem onClick={handleDeleteSkill}>Delete</MenuItem>
                </Menu>
              </div>
            );
          })}
        </div>
      </section>
      <section className="graphicSkillsBoard">
        <SkillsGraph skills={skills} />
      </section>
    </main>
  );
};

export default SkillsPanel;
