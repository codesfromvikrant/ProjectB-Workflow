import React, { useEffect } from "react";
import { Outlet } from "react-router";

const ProjectsLab = () => {
  useEffect(() => {
    document.title = "Projects Lab | WorkFlow";
  }, []);
  return (
    <main className="w-full">
      <Outlet />
    </main>
  );
};

export default ProjectsLab;
