import "./OkrsPanel.styles.css";
import "../../Styles/commons.styles.css";
import { Button, Typography } from "@mui/material";
import MoreVert from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/AddOutlined";
import InputBase from "@mui/material/InputBase";
import React, { useEffect, useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { patch, post } from "../../../modules/request";
import { useParams } from "react-router-dom";
import { GraphicBar } from "./gaphicBar";
const OkrsPanel = ({ okrs, organizationId, updatePeople }) => {
  const { peopleId } = useParams();
  const [objectivesNames, setObjectivesNames] = useState({});
  const [keyResultsNames, setKeyResultsNames] = useState({});
  const [keyResultsDescription, setKeyResultsDescription] = useState({});
  const [keyResultsAchievement, setKeyResultsAchievement] = useState({});

  const createOkr = async () => {
    await post(
      `/objective?organizationId=${organizationId}&peopleId=${peopleId}`,
      {}
    );
    updatePeople();
  };

  const updateOkr = async (okrId, operation, path, value) => {
    await patch(
      `/objective/${okrId}?organizationId=${organizationId}&peopleId=${peopleId}&objectiveId=${okrId}`,
      [
        {
          op: operation,
          path,
          value,
        },
      ]
    );
    updatePeople();
  };

  const createKeyResult = async (okrId) => {
    await post(
      `/key-result?organizationId=${organizationId}&peopleId=${peopleId}&objectiveId=${okrId}`
    );
    updatePeople();
  };

  const updateKeyResult = async (
    okrId,
    keyResultId,
    operation,
    path,
    value
  ) => {
    await patch(
      `/key-result/${keyResultId}?organizationId=${organizationId}&peopleId=${peopleId}&objectiveId=${okrId}&keyResultId=${keyResultId}`,
      [
        {
          op: operation,
          path,
          value,
        },
      ]
    );
    updatePeople();
  };

  useEffect(() => {
    okrs?.forEach((okr) => {
      setObjectivesNames((prevState) => ({
        ...prevState,
        [okr?.id]: okr?.name,
      }));

      okr?.keyResults?.forEach((keyResult) => {
        setKeyResultsNames((prevState) => ({
          ...prevState,
          [keyResult.id]: keyResult.name,
        }));
        setKeyResultsDescription((prevState) => ({
          ...prevState,
          [keyResult.id]: keyResult.description,
        }));
        setKeyResultsAchievement((prevState) => ({
          ...prevState,
          [keyResult.id]: keyResult.achievement,
        }));
      });
    });
  }, [okrs]);

  console.log(keyResultsNames);

  return (
    <main className="okrsPanel">
      <section className="okrsBoard">
        <div className="addOkrs">
          <Typography className="midText" fontWeight={700} fontSize="24px">
            🎯 Objectives
          </Typography>
          <Button
            className="addOkrBtn"
            style={{
              marginRight: "5px",
              background: "#f1388d",
            }}
            aria-label="adicionar meta"
            variant="outlined"
            color="secondary"
            startIcon={<CalendarTodayIcon sx={{ color: "white" }} />}
            onClick={createOkr}
          >
            <Typography style={{ color: "white" }} fontWeight={700}>
              New objective
            </Typography>
          </Button>
        </div>
        <div className="okrsContainer">
          {okrs?.map((okr, okrIndex) => {
            return (
              <div key={okrIndex} className="okrContainer">
                <div className="okrContainerHeader">
                  <InputBase
                    className="okrContainerHeaderInput"
                    onChange={(e) =>
                      setObjectivesNames((prevState) => ({
                        ...prevState,
                        [okr.id]: e.target.value,
                      }))
                    }
                    onBlur={() =>
                      updateOkr(
                        okr?.id,
                        "replace",
                        "/name",
                        objectivesNames[okr?.id]
                      )
                    }
                    value={objectivesNames[okr?.id]}
                  />
                  <Button
                    className="addOkrBtn"
                    style={{
                      marginRight: "5px",
                    }}
                    aria-label="adicionar meta"
                    variant="outlined"
                    color="secondary"
                    startIcon={<AddIcon />}
                    onClick={() => createKeyResult(okr?.id)}
                  >
                    <Typography fontWeight={700}>New key result</Typography>
                  </Button>
                </div>
                <div className="keyResultsContainer">
                  {okr?.keyResults?.map((keyResult, keyResultIndex) => {
                    return (
                      <div key={keyResultIndex} className="keyResultItem">
                        <div className="keyResultItemLeft">
                          <InputBase
                            className="keyResultItemLeftTitle"
                            onChange={(e) =>
                              setKeyResultsNames((prevState) => ({
                                ...prevState,
                                [keyResult.id]: e.target.value,
                              }))
                            }
                            onBlur={() =>
                              updateKeyResult(
                                okr?.id,
                                keyResult.id,
                                "replace",
                                "/name",
                                keyResultsNames[keyResult?.id]
                              )
                            }
                            value={keyResultsNames[keyResult?.id]}
                          />
                          <InputBase
                            onChange={(e) =>
                              setKeyResultsDescription((prevState) => ({
                                ...prevState,
                                [keyResult.id]: e.target.value,
                              }))
                            }
                            onBlur={() =>
                              updateKeyResult(
                                okr?.id,
                                keyResult.id,
                                "replace",
                                "/description",
                                keyResultsDescription[keyResult?.id]
                              )
                            }
                            value={keyResultsDescription[keyResult?.id]}
                            className="keyResultItemLeftDescription"
                          />
                        </div>
                        <div className="keyResultItemMiddle">
                          <label className="keyResultItemMiddleLabel">
                            Atingime...
                          </label>
                          <InputBase
                            type="number"
                            onChange={(e) =>
                              setKeyResultsAchievement((prevState) => ({
                                ...prevState,
                                [keyResult.id]: e.target.value,
                              }))
                            }
                            onBlur={() =>
                              updateKeyResult(
                                okr?.id,
                                keyResult.id,
                                "replace",
                                "/achievement",
                                keyResultsAchievement[keyResult?.id]
                              )
                            }
                            value={keyResultsAchievement[keyResult?.id]}
                            className="keyResultItemMiddleAtg"
                          />
                        </div>
                        <div className="keyResultItemRight">
                          <Button>
                            <MoreVert />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="okrsGraph">
        <GraphicBar okrs={okrs} />
      </section>
    </main>
  );
};

export default OkrsPanel;
