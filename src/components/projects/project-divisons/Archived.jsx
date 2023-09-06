import React, { useEffect } from "react";
import ArchiveIcon from "../../../assets/icons/archived.png";
import { MdRestorePage } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { db } from "../../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { setArchived } from "../../../features/projectsSlice";
import Menu from "../../Menu";
// import OngoingDropdown from "../dropdowns/OngoingDropdown";

const Archived = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const archivedProjects = useSelector((state) => state.projects.archived);

  const getArchivedProjects = async () => {
    const docRef = doc(db, "projects", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const data = docSnap.data();
    dispatch(setArchived(data.archived));
  };

  useEffect(() => {
    if (!uid) return;
    getArchivedProjects();
  }, [uid]);

  const showOngoingDropdown = (id) => {
    document.getElementById(id).classList.toggle("hidden");
  };

  const projectList =
    archivedProjects &&
    archivedProjects.map((project) => {
      const updatedAt = new Date(project.updatedAt);
      const DeletedAt = new Date(project.deletedAt);
      const updatedDate = updatedAt.toLocaleDateString();
      const updatedTime = updatedAt.toLocaleTimeString();
      const deletedDate = DeletedAt.toLocaleDateString();
      const deletedTime = DeletedAt.toLocaleTimeString();

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
            <Menu />
          </div>
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
          <span className="bg-bgblack texxt-xs font-medium tracking-wider py-1 px-4 rounded text-yellow-500">
            <span>Archive At : </span>
            <span>{deletedDate} </span>
            <span>{deletedTime}</span>
          </span>
          <span className="text-xs font-light text-slate-400 mt-1">
            <span className="tracking-wider">Last Updated On : </span>{" "}
            {updatedDate} {updatedTime}
          </span>
          {/* <button className="flex justify-start items-center gap-2 bg-glassyblue border-2 border-blue-600 mt-2 py-2 px-4 rounded">
            <MdRestorePage className="text-lg" />
            <span className="text-xs tracking-wider font-semibold">
              Restore
            </span>
          </button> */}
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

export default Archived;
