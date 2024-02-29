import React, { useState } from "react";
import { BiSolidAddToQueue } from "react-icons/bi";
import { FcSerialTasks } from "react-icons/fc";
import Ongoing from "./project-divisons/Ongoing";
import Completed from "./project-divisons/Completed";
import Archived from "./project-divisons/Archived";
import AddProject from "./AddProject";
import { useSelector, useDispatch } from "react-redux";
import {
  filterOngoing,
  filterCompleted,
  filterArchived,
  projectEditor,
} from "../../features/projectsSlice";

const ProjectHome = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const projectEditorState = useSelector(
    (state) => state.projects.project_editor
  );
  const ongoing = useSelector((state) => state.projects.ongoing);
  const completed = useSelector((state) => state.projects.completed);
  const archived = useSelector((state) => state.projects.archived);

  const searchResult = (e) => {
    setSearch(e.target.value);
    const fileteredOngoing = ongoing.filter((project) => {
      return project.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    const fileteredCompleted = completed.filter((project) => {
      return project.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    const fileteredArchived = archived.filter((project) => {
      return project.title.toLowerCase().includes(e.target.value.toLowerCase());
    });
    dispatch(filterOngoing(fileteredOngoing));
    dispatch(filterCompleted(fileteredCompleted));
    dispatch(filterArchived(fileteredArchived));
  };

  return (
    <section className="w-full h-[100vh] overflow-y-auto mx-auto sm:px-6 py-10 relative">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center flex-wrap sm:gap-2 gap-4">
          <div className="md:w-full w-full flex justify-start sm:items-center items-start sm:flex-row flex-col gap-3">
            <button
              onClick={() => dispatch(projectEditor(true))}
              className="flex justify-start items-center gap-2  py-3 px-4 rounded-md text-gray-300 bg-primary border-[1px] border-gray-800"
            >
              <BiSolidAddToQueue className="text-xl" />
              <span className="text-sm w-max font-light tracking-wide">
                Add Project
              </span>
            </button>
            <button
              onClick={() => dispatch(projectEditor(true))}
              className="flex justify-start items-center gap-2  py-3 px-4 rounded-md text-gray-300 bg-primary border-[1px] border-gray-800"
            >
              <BiSolidAddToQueue className="text-xl" />
              <span className="text-sm w-max font-light tracking-wide">
                Filter By Labels
              </span>
            </button>
            <input
              onChange={searchResult}
              className="md:w-full w-full text-sm p-3 bg-primary text-gray-200 rounded-md border-[1px] border-gray-800"
              type="text"
              placeholder="Search Your Project..."
            />
          </div>
        </div>

        <span className="text-white text-2xl mt-8 mb-4 flex justify-start items-center gap-2">
          <span className="font-semibold">Projects Divisons</span>
          <FcSerialTasks className="text-3xl" />
        </span>

        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-6 gap-8">
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
