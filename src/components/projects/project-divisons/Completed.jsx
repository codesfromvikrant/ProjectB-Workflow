import React, { useEffect } from "react";
import { RiRestartFill } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import CompleteIcon from "../../../assets/icons/completed.png";
import { db } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { setCompleted } from "../../../features/projectsSlice";
import Menu from "../../Menu";
import Dropdown from "../../Dropdown";
import CompletedDrop from "../dropdowns/CompletedDrop";

const Completed = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const completedProjects = useSelector((state) => state.projects.completed);

  const getCompletedProjects = async () => {
    const docRef = doc(db, "projects", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const data = docSnap.data();
    dispatch(setCompleted(data.completed));
  };

  useEffect(() => {
    if (!uid) return;
    getCompletedProjects();
  }, [uid]);

  const showOngoingDropdown = (id) => {
    document.getElementById(id).classList.toggle("hidden");
  };

  const projectList =
    completedProjects.length &&
    completedProjects.map((project) => {
      const updatedAt = new Date(project.updatedAt);
      const completedAt = new Date(project.completedAt);
      const updatedDate = updatedAt.toLocaleDateString();
      const updatedTime = updatedAt.toLocaleTimeString();
      const completedDate = completedAt.toLocaleDateString();
      const completedTime = completedAt.toLocaleTimeString();

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
            onClick={() => showOngoingDropdown(`dialog-${project.id}`)}
            className=""
          >
            <Menu
              onClick={() => {
                document
                  .getElementById(`drop-${project.id}`)
                  .classList.toggle("hidden");
              }}
            />
          </div>
          <Dropdown id={project.id}>
            <CompletedDrop id={project.id} />
          </Dropdown>

          {/* <OngoingDropdown id={project.id} /> */}
          <p className="font-semibold text-base capitalize tracking-wide hover:text-blue-700 hover:font-bold cursor-pointer transition-all duration-300">
            {project.title}
          </p>

          <span className="font-light mt-2 mb-3 text-slate-400">
            {description}{" "}
            <span className="font-medium text-blue-700 cursor-pointer">
              (Read More)
            </span>
          </span>
          <span className="bg-bgblack texxt-xs font-medium tracking-wider py-1 px-4 rounded text-green-500">
            <span>Completed At : </span>
            <span>{completedDate} </span>
            <span>{completedTime}</span>
          </span>
          <span className="text-xs font-light text-slate-400 mt-1">
            <span className="tracking-wider">Last Updated On : </span>{" "}
            {updatedDate} {updatedTime}
          </span>
          {/* <button className="flex justify-start items-center gap-2 bg-glassyblue border-2 border-blue-600 mt-2 py-2 px-4 rounded">
            <RiRestartFill className="text-lg" />
            <span className="text-xs tracking-wider font-semibold">
              Start Again
            </span>
          </button> */}
        </div>
      );
    });

  return (
    <div className="">
      <span className="text-gray-300 mb-2 font-semibold flex justify-between items-center">
        <span className="flex justify-start items-center gap-2">
          <img src={CompleteIcon} className="w-6" />
          <span className="">Completed</span>
          <span className="tracking-wider text-slate-400 font-light text-sm">
            (Projects Done)
          </span>
        </span>
        {/* <BsThreeDots className="text-2xl" /> */}
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

export default Completed;
