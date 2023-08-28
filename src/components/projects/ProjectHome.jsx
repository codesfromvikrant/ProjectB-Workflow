import React, { useState } from "react";
import { BiSolidAddToQueue } from "react-icons/bi";
import { FcSerialTasks } from "react-icons/fc";
import Ongoing from "./project-divisons/Ongoing";
import Completed from "./project-divisons/Completed";
import Archived from "./project-divisons/Archived";
import AddProject from "./AddProject";
import { useSelector, useDispatch } from "react-redux";
import { projectEditor } from "../../features/projectsSlice";

const ProjectHome = () => {
  const dispatch = useDispatch();
  const projectEditorState = useSelector(
    (state) => state.projects.project_editor
  );

  return (
    <section className="w-full h-[100vh] overflow-y-auto mx-auto py-10 relative">
      <div className="bg-bgblack max-w-6xl mx-auto p-6 rounded-md">
        <div className="border-b-[1px] border-blureffect pb-6 flex justify-between items-center">
          <div className="w-max">
            <p className="text-4xl font-bold w-max text-gray-200">
              Getting Started
            </p>
            <p className="text-slate-400 font-medium mt-1">
              Create A New Project #
            </p>
          </div>
          <div className="w-max flex justify-start items-center gap-3">
            <button
              onClick={() => dispatch(projectEditor(true))}
              className="flex justify-start items-center gap-2  py-3 px-4 rounded-md text-gray-300 bg-secondary"
            >
              <BiSolidAddToQueue className="text-xl" />
              <span className="text-sm font-light tracking-wide">
                Add Project
              </span>
            </button>
            <input
              className="w-96 text-sm p-3 bg-secondary rounded-md"
              type="text"
              placeholder="Search Your Project..."
            />
          </div>
        </div>

        <span className="text-white text-2xl mt-8 mb-4 flex justify-start items-center gap-2">
          <span className="font-semibold">Projects Divisons</span>
          <FcSerialTasks className="text-3xl" />
        </span>

        <div className="grid grid-cols-3 gap-4">
          <Ongoing />
          <Completed />
          <Archived />
        </div>
      </div>
      {projectEditorState && <AddProject />}
    </section>
  );
};

export default ProjectHome;
