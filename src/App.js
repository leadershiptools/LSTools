import React from "react";
import "./App.css";
import LeftMenu from "./components/LeftMenu/leftMenu";
import PeopleScreen from "./components/PeopleScreen/PeopleScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Authentication from "./components/Authentication";

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
          path="/LSTools/:peopleId"
          element={mainApplicationContainer(<PeopleScreen />)}
        />
        <Route path="/LSTools" element={<Authentication type="login" />} />
        <Route
          path="/LSTools/register"
          element={<Authentication type="register" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
