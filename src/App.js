import React from "react";
import "./App.css";
import LeftMenu from "./components/LeftMenu/leftMenu";
import BreadCrumb from "./components/BreadCrumb/breadcrumb";
import LedPanel from "./components/LedPanel/ledPanel";

function App() {
  return (
    <>
      <div className="Main">
        <LeftMenu />
        <div className="Content">
          <BreadCrumb />
          <LedPanel />
        </div>
      </div>
    </>
  );
}

export default App;
