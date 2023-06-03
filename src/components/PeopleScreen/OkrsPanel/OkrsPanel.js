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
const OkrsPanel = ({ okrs, organizationId, updatePeople }) => {
  const { peopleId } = useParams();
  const [objectivesNames, setObjectivesNames] = useState({});

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

  useEffect(() => {
    okrs?.forEach((okr) => {
      setObjectivesNames((prevState) => ({
        ...prevState,
        [okr?.id]: okr?.name,
      }));
    });
  }, [okrs]);

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
                    const { name, description } = keyResult;
                    return (
                      <div key={keyResultIndex} className="keyResultItem">
                        <div className="keyResultItemLeft">
                          <p className="keyResultItemLeftTitle">{name}</p>
                          <p className="keyResultItemLeftDescription">
                            {description}
                          </p>
                        </div>
                        <div className="keyResultItemMiddle">
                          <label className="keyResultItemMiddleLabel">
                            Atingime...
                          </label>
                          <p className="keyResultItemMiddleAtg">85%</p>
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
    </main>
  );
};

export default OkrsPanel;
