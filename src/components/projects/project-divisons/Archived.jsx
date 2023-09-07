import React, { useEffect } from "react";
import ArchiveIcon from "../../../assets/icons/archived.png";
import { BiSolidAddToQueue } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { setArchived } from "../../../features/projectsSlice";
import { useNavigate } from "react-router";
import Menu from "../../Menu";
import { getProjectsData } from "../../../utils/firestoreUtils";
import { viewProject } from "../../../utils/navigateUtils";
import Dropdown from "../../Dropdown";
import ArchiveDrop from "../dropdowns/ArchiveDrop";

const Archived = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const archivedProjects = useSelector((state) => state.projects.archived);

  const getArchivedProjects = async () => {
    const projectData = await getProjectsData(uid);
    dispatch(setArchived(projectData.archived));
  };

  useEffect(() => {
    if (!uid) return;
    getArchivedProjects();
  }, [uid]);

  const showOngoingDropdown = (id) => {
    document.getElementById(`drop-${id}`).classList.toggle("hidden");
  };

  const projectList = archivedProjects?.map((project) => {
    const updatedAt = new Date(project.updatedAt);
    const DeletedAt = new Date(project.deletedAt);
    const updatedDate = updatedAt.toLocaleDateString();
    const updatedTime = updatedAt.toLocaleTimeString();
    const deletedDate = DeletedAt.toLocaleDateString();
    const deletedTime = DeletedAt.toLocaleTimeString();

    const MAX_DESCRIPTION_LENGTH = 150;
    const description =
      project.description.length > MAX_DESCRIPTION_LENGTH
        ? `${project.description.slice(0, MAX_DESCRIPTION_LENGTH)}...`
        : project.description;

    return (
      <div
        key={project.id}
        className="w-full p-3 bg-secondary rounded-md text-sm text-gray-200 relative flex-col flex justify-start items-start"
      >
        <div onClick={() => showOngoingDropdown(project.id)}>
          <Menu />
        </div>
        <Dropdown id={project.id}>
          <ArchiveDrop projectID={project.id} />
        </Dropdown>
        <p
          onClick={() => viewProject(navigate, project.id, project.status)}
          className="font-medium text-base capitalize tracking-wide hover:text-blue-700 hover:font-bold cursor-pointer transition-all duration-300"
        >
          {project.title}
        </p>

        <span className="font-light mt-2 mb-2 text-slate-400">
          {description}{" "}
          <span
            onClick={() => viewProject(navigate, project.id, project.status)}
            className="font-medium text-blue-700 cursor-pointer"
          >
            (Read More)
          </span>
        </span>
        <span className="bg-bgblack texxt-xs font-medium tracking-wider mt-4 py-1 px-4 rounded text-yellow-500">
          <span>Archive At : </span>
          <span>{deletedDate} </span>
          <span>{deletedTime}</span>
        </span>
        <span className="text-xs font-light text-slate-400 mt-1">
          <span className="tracking-wider">Last Updated On : </span>{" "}
          {updatedDate} {updatedTime}
        </span>
        <button
          onClick={() => viewProject(navigate, project.id, project.status)}
          className="flex justify-center items-center w-full gap-2 bg-primary  mt-2 py-3 px-4 rounded"
        >
          <BiSolidAddToQueue className="text-lg" />
          <p className="tracking-wider text-slate-400 text-sm font-medium">
            Open Project
          </p>
        </button>
      </div>
    );
  });

  return (
    <div className="">
      <span className="flex justify-between items-center text-gray-300 mb-2 font-semibold ">
        <span className="flex justify-start items-center gap-2">
          <img src={ArchiveIcon} className="w-6" />
          <span className="">Archived</span>
          <span className="tracking-wider text-slate-400 font-light text-sm">
            (Projects Paused)
          </span>
        </span>
      </span>
      <div className="h-[40rem] projects overflow-y-auto overflow-x-hidden">
        <div className="grid grid-cols-1 gap-4">
          {projectList?.length ? (
            projectList.reverse()
          ) : (
            <span className="text-textcolor"># No Project Available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Archived;
