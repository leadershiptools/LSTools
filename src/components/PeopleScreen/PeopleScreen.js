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
import PersonalMetrics from "./PersonalMetrics/PersonalMetrics";
import commingSoonImg from "../../images/comming-soon.png";
import { Box } from "@mui/material";

const PeopleScreen = ({ user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [okrs, setOkrs] = useState(null);
  const [skills, setSkills] = useState(null);
  const [graphSkills, setGraphSkills] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [skillSet, setSkillSet] = useState("");
  const [teams, setTeams] = useState([]);
  const { peopleId } = useParams();
  const { state } = useLocation();

  const defaultOrganization = user?.organizations?.[0]?.id;

  const getPeople = useCallback(async () => {
    const result = await get(`/people/${peopleId}`);
    setPeople(result);
  }, [peopleId]);

  const setPeople = (people) => {
    const {
      name,
      phone,
      email,
      job,
      objectives,
      skills,
      imageUrl,
      skillsGroup,
      teams,
    } = people;

    console.log(people);

    setName(name ?? "");
    setEmail(email ?? "");
    setPhone(phone ?? "");
    setPosition(job.name ?? "");
    setOkrs(objectives);
    setSkills(skills);
    setGraphSkills(skills);
    setImageUrl(imageUrl);
    setSkillSet(skillsGroup?.id ?? "");
    setTeams(teams);
  };

  const updatePeople = async (action, path, value) => {
    const result = await patch(`/people/${peopleId}`, [
      {
        op: action,
        path,
        value,
      },
    ]);

    if (action === "remove" || action === "add") {
      setPeople(result);
      return;
    }

    setGraphSkills(result?.skills);
  };

  const handleChangeSkillSet = async (e) => {
    if (
      // eslint-disable-next-line no-restricted-globals
      confirm(
        "When changing the skill set all skills will be reset, do you want to continue?"
      )
    ) {
      await put(
        `/people/${peopleId}/skills/replace-all?organizationId=${defaultOrganization}&skillsGroupId=${e.target.value}`,
        {
          id: peopleId,
          organizationId: defaultOrganization,
          skillsGroupId: e.target.value,
        }
      );
      setSkillSet(e.target.value);
      getPeople();
    }
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
          teams={teams}
        />
      </section>
      <section className="ledPanel">
        <PersonalMetrics skills={skills} okrs={okrs} />
      </section>
      <section>
        <SkillsPanel
          graphSkills={graphSkills}
          skills={skills}
          handleSaveInfo={updatePeople}
        />
        <OkrsPanel
          organizationId={defaultOrganization}
          okrs={okrs}
          updatePeople={getPeople}
        />
        <Box className="commingSoonBoard">
          <img style={{ height: "auto", width: "100%" }} src={commingSoonImg} />
        </Box>
        {/* <OneToOnePanel />
        <SalaryPanel /> */}
      </section>
    </>
  );
};

export default PeopleScreen;
