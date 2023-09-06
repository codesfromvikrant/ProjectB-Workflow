import React, { useEffect } from "react";
import { BiSolidAddToQueue } from "react-icons/bi";
import { db } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setOngoing } from "../../../features/projectsSlice";
import OngoingIcon from "../../../assets/icons/ongoing.png";
import Menu from "../../Menu";
import OngoingDrop from "../dropdowns/OngoingDrop";
import Dropdown from "../../Dropdown";

const Ongoing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const ongoingProjects = useSelector((state) => state.projects.ongoing);

  const getOngoingProjects = async () => {
    const docRef = doc(db, "projects", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const data = docSnap.data();
    dispatch(setOngoing(data.ongoing));
  };

  useEffect(() => {
    if (!uid) return;
    getOngoingProjects();
  }, [uid]);

  const showOngoingDropdown = (id) => {
    document.getElementById(id).classList.toggle("hidden");
  };

  const openProject = (id, status) => {
    const queryParams = {
      id: id,
      status: status,
    };
    navigate(`tasks?${new URLSearchParams(queryParams)}`);
  };

  const projectList =
    ongoingProjects.length &&
    ongoingProjects.map((project) => {
      const date = new Date(project.updatedAt);
      const updatedDate = date.toLocaleDateString();
      const updatedTime = date.toLocaleTimeString();

      const description =
        project.description.length > 150
          ? `${project.description.slice(0, 150)}...`
          : project.description;

      return (
        <div
          key={project.id}
          className="w-full p-3 bg-secondary rounded-md text-sm text-gray-200 relative flex-col flex justify-start items-start"
        >
          <div
            onClick={() => showOngoingDropdown(`drop-${project.id}`)}
            className=""
          >
            <Menu />
          </div>
          <Dropdown id={project.id}>
            <OngoingDrop project_id={project.id} />
          </Dropdown>
          <p className="font-semibold text-base capitalize tracking-wide hover:text-blue-700 hover:font-bold cursor-pointer transition-all duration-300">
            {project.title}
          </p>

          <span className="font-light mt-2 mb-3 text-slate-400">
            {description}{" "}
            <span className="font-medium text-blue-700 cursor-pointer">
              (Read More)
            </span>
          </span>
          <div className="flex justify-start items-center gap-2">
            <span className="bg-bgblack text-blue-700 text-sm font-semibold tracking-wide py-1 px-4 rounded">
              <span>Deadline : </span>
              <span>{project.dueDate}</span>
            </span>
            <span className="bg-bgblack py-1 px-4 font-medium text-red-300 rounded">
              Pending
            </span>
          </div>
          <span className="text-xs font-light text-slate-400 mt-1">
            <span className="tracking-wider">Last Updated On : </span>{" "}
            {updatedDate} {updatedTime}
          </span>
          <button
            onClick={() => openProject(project.id, project.status)}
            className="flex justify-center items-center w-full gap-2 bg-glassyblue border-2 border-blue-600 mt-4 py-2 px-4 rounded"
          >
            <BiSolidAddToQueue className="text-lg" />
            <span className=" tracking-wider text-sm font-semibold">
              Add Tasks
            </span>
          </button>
        </div>
      );
    });

  return (
    <div className="">
      <span className="flex justify-between items-center text-gray-300 mb-2 font-semibold">
        <span className="flex justify-start items-center gap-2">
          <img src={OngoingIcon} className="w-6" />
          <span className="">Ongoing</span>
          <span className="tracking-wider text-slate-400 font-light text-sm">
            (Projects Live)
          </span>
        </span>
      </span>
      <div className="h-[40rem] projects overflow-y-auto overflow-x-hidden">
        <div className="grid grid-cols-1 gap-4">
          {projectList ? (
            projectList.reverse()
          ) : (
            <span className="text-textcolor"># No Project Available</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ongoing;
