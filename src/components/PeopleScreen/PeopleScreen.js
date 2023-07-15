import "./PeopleScreen.styles.css";
import * as React from "react";
import PersonalInfo from "./PersonalInfoCard/personalInfo";
import OkrsPanel from "./OkrsPanel/OkrsPanel";
import SkillsPanel from "./SkillsPanel/skillsPanel";
// import OneToOnePanel from "./OneToOnePanel/OneToOnePanel";
// import SalaryPanel from "./SalaryPanel/SalaryPanel";
import { useCallback, useEffect, useState } from "react";
import { get, patch, put } from "../../modules/request";
import BreadCrumb from "../../components/BreadCrumb/breadcrumb";
import { useParams, useLocation } from "react-router-dom";

const PeopleScreen = ({ user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [okrs, setOkrs] = useState(null);
  const [skills, setSkills] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [skillSet, setSkillSet] = useState("");
  const { peopleId } = useParams();
  const { state } = useLocation();

  const defaultOrganization = user?.organizations?.[0]?.id;

  const getPeople = useCallback(async () => {
    const result = await get(`/people/${peopleId}`);
    console.log(result);
    setPeople(result);
  }, [peopleId]);

  const setPeople = (people) => {
    const { name, phone, email, job, objectives, skills, imageUrl } = people;
    setName(name ?? "");
    setEmail(email ?? "");
    setPhone(phone ?? "");
    setPosition(job.name ?? "");
    setOkrs(objectives);
    setSkills(skills);
    setImageUrl(imageUrl);
  };

  const updatePeople = async (action, path, value) => {
    const result = await patch(`/people/${peopleId}`, [
      {
        op: action,
        path,
        value,
      },
    ]);

    setPeople(result);
  };

  const handleChangeSkillSet = async (e) => {
    await put(`/people/${peopleId}/skills/replace-all`, {
      id: peopleId,
      organizationId: defaultOrganization,
      skillsGroupId: e.target.value,
    });
    setSkillSet(e.target.value);
    getPeople();
  };

  useEffect(() => {
    getPeople();
  }, [getPeople]);

  return (
    <>
      <BreadCrumb
        items={[
          { name: "Team", link: "/LSTools/team" },
          { name: state?.teamName, link: "/LSTools/team" },
          { name: name, link: null },
        ]}
      />
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
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          handleSaveInfo={updatePeople}
          skillSet={skillSet}
          setSkillSet={handleChangeSkillSet}
        />
      </section>
      <section>
        <OkrsPanel
          organizationId={defaultOrganization}
          okrs={okrs}
          updatePeople={getPeople}
        />
        <SkillsPanel skills={skills} handleSaveInfo={updatePeople} />
        {/* <OneToOnePanel />
        <SalaryPanel /> */}
      </section>
    </>
  );
};

export default PeopleScreen;
