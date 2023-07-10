import "../SkillsPanel/skillsPanel.styles.css";
import * as React from "react";
import AddIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import { SkillsGraph } from "./skillsGraph";
import { useEffect, useState } from "react";
import { triggerBlurOnEnter } from "../../../modules/utils";
import DeleteIcon from "@mui/icons-material/Delete";

const SkillsPanel = ({ skills, handleSaveInfo }) => {
  const [skillName, setSkillName] = useState("");
  const [skillNameInputs, setSkillNameInputs] = useState({});
  const [skillScoreInputs, setSkillScoreInputs] = useState({});

  const handleDeleteSkill = async (index) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to do this?")) {
      await handleSaveInfo("remove", `/skills/${index}`);
    }
  };

  const addSkill = async () => {
    if (skillName === "") return;
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

  const handleKeyPressAddSkill = async (e) => {
    if (e.keyCode === 13) addSkill();
  };

  useEffect(() => {
    skills?.forEach((skill) => {
      setSkillNameInputs((prevState) => ({
        ...prevState,
        [skill.id]: skill.name,
      }));
      setSkillScoreInputs((prevState) => ({
        ...prevState,
        [skill.id]: skill.score,
      }));
    });
  }, [skills]);

  return (
    <main className="skillsPanel">
      <section className="skillsBoard">
        <h2>🧩 Skills</h2>
        <div className="skillsBoardList">
          {skills?.map((skill, index) => {
            const { id } = skill;
            return (
              <div key={index} className="skillsBoardListItem">
                <div className="skillsBoardListItemLeft">
                  <input
                    className="skillsBoardListItemInputName"
                    value={skillNameInputs[id]}
                    onChange={(e) =>
                      setSkillNameInputs((prevState) => ({
                        ...prevState,
                        [id]: e.target.value,
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
                </div>
                <div className="skillsBoardListItemMiddle">
                  <input
                    className="skillsBoardListItemInputScore"
                    type="number"
                    value={skillScoreInputs[id]}
                    onChange={(e) =>
                      setSkillScoreInputs((prevState) => ({
                        ...prevState,
                        [id]: e.target.value,
                      }))
                    }
                    onBlur={(e) =>
                      handleSaveInfo("add", `/skills/${index}/history/-`, {
                        score: Number(e.target.value),
                        date: new Date(),
                      })
                    }
                    min={0}
                    max={5}
                    onKeyDown={triggerBlurOnEnter}
                  />
                </div>
                <div className="skillsBoardListItemRight">
                  <Button onClick={() => handleDeleteSkill(index)}>
                    <DeleteIcon />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="skillsBoardForm">
          <AddIcon onClick={addSkill} sx={{ color: "#493D8A" }} />
          <input
            className="skillsBoardFormInput"
            placeholder="Add new Skill"
            value={skillName}
            onChange={(e) => setSkillName(e.target.value)}
            onKeyDown={handleKeyPressAddSkill}
          />
        </div>
      </section>
      <section className="graphicSkillsBoard">
        <SkillsGraph skills={skills} />
      </section>
    </main>
  );
};

export default SkillsPanel;
