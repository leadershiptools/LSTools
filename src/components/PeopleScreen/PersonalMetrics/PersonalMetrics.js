import "./PersonalMetrics.styles.css";
import "../../Styles/commons.styles.css";
import * as React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const PersonalMetrics = ({ skills, okrs }) => {
  console.log(okrs);
  const skillsMean =
    skills?.reduce((acc, item) => {
      return acc + item.score;
    }, 0) / skills?.length;

  const okrsMean =
    okrs?.reduce((acc, okr) => {
      let sum = acc;
      okr?.keyResults?.forEach((keyResult) => {
        sum += keyResult.achievement;
      });
      return sum;
    }, 0) /
    okrs?.reduce((acc, okr) => {
      let sum = acc;
      okr?.keyResults?.forEach((keyResult) => {
        sum += 1;
      });
      return sum;
    }, 0);

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
          <p>{isNaN(skillsMean) ? 0 : skillsMean}</p>
        </div>
      </div>

      <div className="personalMetricsItem">
        <div className="personalMetricsItemHeader">
          <p>Gross Annual Salary</p>
          <InfoOutlinedIcon />
        </div>
        <div className="personalMetricsItemBody">
          <p>...%</p>
        </div>
      </div>

      <div className="personalMetricsItem">
        <div className="personalMetricsItemHeader">
          <p>Training invested</p>
          <InfoOutlinedIcon />
        </div>
        <div className="personalMetricsItemBody">
          <p>...%</p>
        </div>
      </div>
    </div>
  );
};

export default PersonalMetrics;
