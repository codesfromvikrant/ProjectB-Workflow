import React, { useEffect } from "react";
import { BiSolidAddToQueue } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { db } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { setOngoing } from "../../../features/projectsSlice";
import OngoingIcon from "../../../assets/icons/ongoing.png";
import Menu from "../../Menu";
import OngoingDropdown from "../dropdowns/OngoingDropdown";

const Ongoing = () => {
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

  const projectList =
    ongoingProjects.length &&
    ongoingProjects.map((project) => {
      const date = new Date(project.updatedAt);
      const updatedDate = date.toLocaleDateString();
      const updatedTime = date.toLocaleTimeString();

      const description =
        project.description.length > 200
          ? `${project.description.slice(0, 200)}...`
          : project.description;

      return (
        <div
          key={project.id}
          className="w-full p-3 bg-secondary rounded-md text-sm text-gray-200 relative flex-col flex justify-start items-start"
        >
          <div
            onClick={() => showOngoingDropdown(`dialog-${project.id}`)}
            className=""
          >
            <Menu />
          </div>
          <OngoingDropdown id={project.id} />
          <p className="font-semibold text-base capitalize tracking-wide hover:text-blue-700 hover:font-bold cursor-pointer transition-all duration-300">
            {project.title}
          </p>

          <span className="font-light mt-2 mb-3 text-slate-400">
            {description}{" "}
            <span className="font-medium text-blue-700 cursor-pointer">
              (Read More)
            </span>
          </span>
          <span className="">
            <span>Due Date : </span>
            <span>{project.dueDate}</span>
          </span>
          <span className="text-xs font-light text-slate-400 mt-1">
            <span className="tracking-wider">Last Updated On : </span>{" "}
            {updatedDate} {updatedTime}
          </span>
          <button className="flex justify-start items-center gap-2 bg-glassyblue border-2 border-blue-600 mt-2 py-2 px-4 rounded">
            <BiSolidAddToQueue className="text-lg" />
            <span className="text-xs tracking-wider font-semibold">
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
        <BsThreeDots className="text-2xl" />
      </span>
      <div className="h-[40rem] projects overflow-y-auto overflow-x-hidden">
        <div className="grid grid-cols-1 gap-5">
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
