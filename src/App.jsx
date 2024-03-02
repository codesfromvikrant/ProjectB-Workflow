import React from "react";
import { BrowserRouter } from "react-router-dom";
import RoutePaths from "./RoutePaths";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <RoutePaths />
      </BrowserRouter>
    </>
  );
};

export default App;
