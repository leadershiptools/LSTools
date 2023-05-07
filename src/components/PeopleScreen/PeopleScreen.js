import "./PeopleScreen.styles.css";
import * as React from "react";
import PersonalInfo from "./PersonalInfoCard/personalInfo";
import GoalsPanel from "./GoalsPanel/goalsPanel";
import SkillsPanel from "./SkillsPanel/skillsPanel";
import OneToOnePanel from "./OneToOnePanel/OneToOnePanel";
import SalaryPanel from "./SalaryPanel/SalaryPanel";
import { useCallback, useEffect, useState } from "react";
import { get, patch } from "../../modules/request";
import BreadCrumb from "../../components/BreadCrumb/breadcrumb";
import { useParams } from "react-router-dom";

const PeopleScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [goals, setGoals] = useState(null);
  let { peopleId } = useParams();

  const getPeople = useCallback(async () => {
    const result = await get(`/people/${peopleId}`);
    const { name, phone, email, job, goals } = result;
    setName(name ?? "");
    setEmail(email ?? "");
    setPhone(phone ?? "");
    setPosition(job.name ?? "");
    setGoals(goals);
  }, [peopleId]);

  const updatePeople = async (action, path, value) => {
    await patch(`/people/${peopleId}`, [
      {
        op: action,
        path,
        value,
      },
    ]);

    await getPeople();
  };

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return (
    <>
      <BreadCrumb name={name} />
      <section className="ledPanel">
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
        <GoalsPanel goals={goals} handleSaveInfo={updatePeople} />
        <SkillsPanel />
        <OneToOnePanel />
        <SalaryPanel />
      </section>
    </>
  );
};

export default PeopleScreen;
