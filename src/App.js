import React from "react";
import "./App.css";
import LeftMenu from "./components/LeftMenu/leftMenu";
import PeopleScreen from "./components/PeopleScreen/PeopleScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./components/Authentication";
import { initializeApp } from "firebase/app";

// Initialize firebase
import { firebaseConfig } from "./config/firebase";
import TeamScreen from "./components/TeamScreen";
initializeApp(firebaseConfig);

const mainApplicationContainer = (component) => (
  <div className="Main">
    <LeftMenu />
    <div className="Content">{component}</div>
  </div>
);
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/LSTools/people/:peopleId"
          element={mainApplicationContainer(<PeopleScreen />)}
        />
        <Route
          path="/LSTools/team"
          element={mainApplicationContainer(<TeamScreen />)}
        />
        <Route path="/" element={<Authentication type="login" />} />
        <Route path="/register" element={<Authentication type="register" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
