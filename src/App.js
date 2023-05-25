import React, { useEffect, useState } from "react";
import "./App.css";
import LeftMenu from "./components/LeftMenu/leftMenu";
import PeopleScreen from "./components/PeopleScreen/PeopleScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./components/Authentication";
import { get } from "./modules/request";

// Initialize firebase
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/firebase";
import TeamScreen from "./components/TeamScreen";
import { getUserToken } from "./modules/utils";
initializeApp(firebaseConfig);

const mainApplicationContainer = (component, user) => {
  return (
    <div className="Main">
      <LeftMenu user={user} />
      <div className="Content">{component}</div>
    </div>
  );
};

function App() {
  const [user, setUser] = useState();
  const getUser = async () => {
    const token = getUserToken();
    if (token !== null) {
      const user = await get("/user/profile");
      setUser(user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/LSTools/people/:peopleId"
          element={mainApplicationContainer(<PeopleScreen />, user)}
        />
        <Route
          path="/LSTools/team"
          element={mainApplicationContainer(<TeamScreen user={user} />, user)}
        />
        <Route path="/" element={<Authentication type="login" />} />
        <Route path="/register" element={<Authentication type="register" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
