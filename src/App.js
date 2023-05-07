import React from "react";
import "./App.css";
import LeftMenu from "./components/LeftMenu/leftMenu";
import PeopleScreen from "./components/PeopleScreen/PeopleScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="Main">
        <LeftMenu />
        <div className="Content">
          <Routes>
            <Route path="/LSTools/:peopleId" element={<PeopleScreen />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
