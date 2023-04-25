import React from "react";
import "./App.css";
import LeftMenu from "./components/LeftMenu/leftMenu";
import PeopleScreen from "./components/PeopleScreen/PeopleScreen";

function App() {
  return (
    <>
      <div className="Main">
        <LeftMenu />
        <div className="Content">
          <PeopleScreen />
        </div>
      </div>
    </>
  );
}

export default App;
