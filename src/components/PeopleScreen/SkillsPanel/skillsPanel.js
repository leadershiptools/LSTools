import "../SkillsPanel/skillsPanel.styles.css";
import * as React from "react";
import AddIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SkillsGraph } from "./skillsGraph";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { triggerBlurOnEnter } from "../../../modules/utils";

const SkillsPanel = ({ skills, handleSaveInfo, graphSkills }) => {
  const [hasAdded, setHasAdded] = useState(false);
  const [skillNameInputs, setSkillNameInputs] = useState({});
  const [skillScoreInputs, setSkillScoreInputs] = useState({});

  const hardSkills = skills?.filter(
    (skill) =>
      !!skill?.groups?.filter((group) => {
        return group.id === "hard-skills";
      }).length
  );

  const softSkills = skills?.filter(
    (skill) =>
      !!skill?.groups?.filter((group) => {
        return group.id === "soft-skills";
      }).length
  );

  const graphHardSkills = graphSkills?.filter(
    (skill) =>
      !!skill?.groups?.filter((group) => {
        return group.id === "hard-skills";
      }).length
  );

  const graphSoftSkills = graphSkills?.filter(
    (skill) =>
      !!skill?.groups?.filter((group) => {
        return group.id === "soft-skills";
      }).length
  );

  console.log(softSkills);
  const handleDeleteSkill = async (index) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to do this?")) {
      await handleSaveInfo("remove", `/skills/${index}`);
    }
  };

  const addSkill = async (type) => {
    await handleSaveInfo("add", `/skills/-`, {
      name: "",
      description: "",
      history: [
        {
          date: new Date(),
          score: 0,
        },
      ],
      groups: [
        {
          id: type === "hard" ? "hard-skills" : "soft-skills",
          name: type === "hard" ? "Hard Skills" : "Soft Skills",
          description: type === "hard" ? "Hard Skills" : "Soft Skills",
        },
      ],
    });
    setHasAdded(true);
  };

  useEffect(() => {
    if (hasAdded && skills) {
      document.getElementById(skills?.[skills?.length - 1].id)?.focus();
      setHasAdded(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skills]);

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
        <div className="skillsBoardHeader">
          <h2>🧩 Skills Mapping</h2>
        </div>
        <div className="skillsBoardContainer">
          <div className="skillsBoardList">
            <SkillsGraph skills={graphHardSkills} />
            <h3>💎 Craft Skills </h3>
            {hardSkills?.map((skill) => {
              const { id } = skill;
              const allSkillsIndex = skills.indexOf(
                skills.find((skill) => skill.id === id)
              );

              return (
                <div key={allSkillsIndex} className="skillsBoardListItem">
                  <div className="skillsBoardListItemLeft">
                    <input
                      className="skillsBoardListItemInputName"
                      value={skillNameInputs[id]}
                      id={id}
                      onChange={(e) =>
                        setSkillNameInputs((prevState) => ({
                          ...prevState,
                          [id]: e.target.value,
                        }))
                      }
                      onBlur={(e) =>
                        handleSaveInfo(
                          "replace",
                          `/skills/${allSkillsIndex}/name`,
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
                      onChange={(e) => {
                        const value = e.target.value;
                        if (Number(value) >= 0 && Number(value) <= 5) {
                          setSkillScoreInputs((prevState) => ({
                            ...prevState,
                            [id]: e.target.value,
                          }));
                          handleSaveInfo(
                            "add",
                            `/skills/${allSkillsIndex}/history/-`,
                            {
                              score: Number(e.target.value),
                              date: new Date(),
                            }
                          );
                        }
                      }}
                      onBlur={(e) =>
                        handleSaveInfo(
                          "add",
                          `/skills/${allSkillsIndex}/history/-`,
                          {
                            score: Number(e.target.value),
                            date: new Date(),
                          }
                        )
                      }
                      min={0}
                      max={5}
                      onKeyDown={triggerBlurOnEnter}
                    />
                  </div>
                  <div className="skillsBoardListItemRight">
                    <Button onClick={() => handleDeleteSkill(allSkillsIndex)}>
                      <CloseIcon />
                    </Button>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => addSkill("hard")}
              className="skillsBoardForm"
            >
              <AddIcon sx={{ color: "#493D8A" }} />
              <Typography>Add new Skill</Typography>
            </button>
          </div>
          <div className="skillsBoardList">
            <SkillsGraph skills={graphSoftSkills} />
            <h3>⭐️ Behavioural Skills</h3>
            {softSkills?.map((skill) => {
              const { id } = skill;
              const allSkillsIndex = skills.indexOf(
                skills.find((skill) => skill.id === id)
              );
              return (
                <div key={allSkillsIndex} className="skillsBoardListItem">
                  <div className="skillsBoardListItemLeft">
                    <input
                      className="skillsBoardListItemInputName"
                      value={skillNameInputs[id]}
                      id={id}
                      onChange={(e) =>
                        setSkillNameInputs((prevState) => ({
                          ...prevState,
                          [id]: e.target.value,
                        }))
                      }
                      onBlur={(e) =>
                        handleSaveInfo(
                          "replace",
                          `/skills/${allSkillsIndex}/name`,
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
                      onChange={(e) => {
                        const value = e.target.value;
                        if (Number(value) >= 0 && Number(value) <= 5) {
                          setSkillScoreInputs((prevState) => ({
                            ...prevState,
                            [id]: e.target.value,
                          }));
                          handleSaveInfo(
                            "add",
                            `/skills/${allSkillsIndex}/history/-`,
                            {
                              score: Number(e.target.value),
                              date: new Date(),
                            }
                          );
                        }
                      }}
                      onBlur={(e) =>
                        handleSaveInfo(
                          "add",
                          `/skills/${allSkillsIndex}/history/-`,
                          {
                            score: Number(e.target.value),
                            date: new Date(),
                          }
                        )
                      }
                      min={0}
                      max={5}
                      onKeyDown={triggerBlurOnEnter}
                    />
                  </div>
                  <div className="skillsBoardListItemRight">
                    <Button
                      className="skillsBoardListItemRightButton"
                      onClick={() => handleDeleteSkill(allSkillsIndex)}
                    >
                      <CloseIcon />
                    </Button>
                  </div>
                </div>
              );
            })}

            <button
              onClick={() => addSkill("soft")}
              className="skillsBoardForm"
            >
              <AddIcon sx={{ color: "#493D8A" }} />
              <Typography>Add new Skill</Typography>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SkillsPanel;
