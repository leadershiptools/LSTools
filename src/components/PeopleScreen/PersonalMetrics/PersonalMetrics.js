import "./PersonalMetrics.styles.css";
import "../../Styles/commons.styles.css";
import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InputBase from "@mui/material/InputBase";

const PersonalMetrics = ({
  grossAnualSalaryValue,
  trainingInvestedValue,
  skills,
  okrs,
  handleSaveInfo,
}) => {
  const [grossAnualSalary, setGrossAnualSalary] = useState(
    grossAnualSalaryValue
  );
  const [trainingInvested, setTrainingInvested] = useState(
    trainingInvestedValue
  );

  const skillsMean = (
    skills?.reduce((acc, item) => {
      return acc + item.score;
    }, 0) / skills?.length
  )?.toFixed(2);

  const okrsMean =
    okrs?.reduce((acc, okr) => {
      let sum = acc;
      okr?.keyResults?.forEach((keyResult) => {
        sum += keyResult.achievement;
      });
      return sum;
    }, 0) /
    okrs
      ?.reduce((acc, okr) => {
        let sum = acc;
        okr?.keyResults?.forEach((keyResult) => {
          sum += 1;
        });
        return sum;
      }, 0)
      ?.toFixed(2);

  const updateGrossAnualSalary = async () => {
    await handleSaveInfo("replace", `/grossAnnualSalary`, {
      value: parseFloat(Number(grossAnualSalary).toFixed(2)),
    });
  };

  const updateTrainingInvested = async () => {
    await handleSaveInfo("replace", `/trainingInvested`, {
      value: parseFloat(Number(trainingInvested).toFixed(2)),
    });
  };

  return (
    <div className="personalMetricsContainer">
      <div className="personalMetricsItem">
        <div className="personalMetricsItemHeader">
          <p>Objectives Average</p>
          <InfoOutlinedIcon />
        </div>
        <div className="personalMetricsItemBody">
          <p>{isNaN(okrsMean) ? 0 : okrsMean}%</p>
        </div>
      </div>

      <div className="personalMetricsItem">
        <div className="personalMetricsItemHeader">
          <p>Skill score</p>
          <InfoOutlinedIcon />
        </div>
        <div className="personalMetricsItemBody">
          <p>{skillsMean}</p>
        </div>
      </div>

      <div className="personalMetricsItem">
        <div className="personalMetricsItemHeader">
          <p>Gross Annual Salary</p>
          <InfoOutlinedIcon />
        </div>
        <div className="personalMetricsItemBody">
          <InputBase
            style={{
              fontWeight: "700",
              fontSize: "32px",
              border: "none",
            }}
            maxLength={5}
            placeholder="$0,00"
            value={grossAnualSalary}
            onBlur={updateGrossAnualSalary}
            onChange={(e) => setGrossAnualSalary(e.target.value)}
          />
        </div>
      </div>

      <div className="personalMetricsItem">
        <div className="personalMetricsItemHeader">
          <p>Training invested</p>
          <InfoOutlinedIcon />
        </div>
        <div className="personalMetricsItemBody">
          <InputBase
            style={{
              fontWeight: "700",
              fontSize: "32px",
              border: "none",
            }}
            maxLength={5}
            placeholder="$0,00"
            onBlur={updateTrainingInvested}
            value={trainingInvested}
            onChange={(e) => setTrainingInvested(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalMetrics;
