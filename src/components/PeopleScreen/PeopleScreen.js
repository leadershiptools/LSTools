import "./PeopleScreen.styles.css";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarPhoto from "../../images/avatar.png";
import PersonalInfo from "./PersonalInfoCard/personalInfo";
import GoalsPanel from "./GoalsPanel/goalsPanel";
import SkillsPanel from "./SkillsPanel/skillsPanel";
import OneToOnePanel from "./OneToOnePanel/OneToOnePanel";
import SalaryPanel from "./SalaryPanel/SalaryPanel";
import { useEffect, useState } from "react";
import { get, patch } from "../../modules/request";
import BreadCrumb from "../../components/BreadCrumb/breadcrumb";

const PeopleScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");

  const MOCK_PEOPLE = "demo-personal-organization-ava-torres";

  const getPeople = async () => {
    const result = await get(`/people/${MOCK_PEOPLE}`);
    const { name, phone, email, job } = result;
    setName(name ?? "");
    setEmail(email ?? "");
    setPhone(phone ?? "");
    setPosition(job.name ?? "");
  };

  const updatePeople = async (action, path, value) => {
    await patch(`/people/${MOCK_PEOPLE}`, [{
      op: action,
      path,
      value,
    }]);

    await getPeople();
  };

  useEffect(() => {
    getPeople();
  }, []);
  return (
    <>
      <BreadCrumb name={name} />
      <section className="ledPanel">
        <div role="img" className="iconAvatar">
          <Avatar
            alt="Remy Sharp"
            src={AvatarPhoto}
            style={{ height: "160px", width: "160px" }}
          />
        </div>
        <PersonalInfo
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          position={position}
          setPosition={setPosition}
          handleSaveInfo={updatePeople}
        />
      </section>
      <section>
        <GoalsPanel />
        <SkillsPanel />
        <OneToOnePanel />
        <SalaryPanel />
      </section>
    </>
  );
};

export default PeopleScreen;
