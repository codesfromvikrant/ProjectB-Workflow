import React from "react";
import { useSelector } from "react-redux";
import ProjectIcon from "../../assets/icons/project_lab.png";

const ProjectDetails = () => {
  const projectDetails = useSelector((state) => state.tasks.project_details);

  const LocalDateTime = (str) => {
    const date = new Date(str);
    return [date.toLocaleDateString(), date.toLocaleTimeString()];
  };
  const [updatedDate, updatedTime] = LocalDateTime(projectDetails.updatedAt);
  const [creationDate, creationTime] = LocalDateTime(projectDetails.createdAt);

  return (
    <div className="w-full pb-4 text-gray-200 border-b-2 border-blureffect">
      <div className="flex justify-start items-center gap-3 mb-3">
        <img src={ProjectIcon} className="w-8" />
        <h1 className="text-3xl font-bold tracking-wide">Project Overview</h1>
      </div>

      <h3 className="text-xl font-medium">{projectDetails.title}</h3>
      <p className="text-slate-400 mt-1 text-sm tracking-wide">
        {projectDetails.description}
      </p>
      <div className="flex justify-start items-center gap-2 mt-6 mb-2">
        <span className="font-medium">Tags : </span>
        {projectDetails.isFav && (
          <div className=" bg-blue-600 px-4 py-1 text-sm font-medium tracking-wide w-max rounded">
            Favourite
          </div>
        )}
      </div>
      <div className="flex justify-start items-center gap-6">
        <div className="text-base capitalize text-gray-200 font-semibold tracking-wider">
          Status :{" "}
          <span className="text-slate-400">{projectDetails.status}</span>
        </div>
        <div className="font-medium text-slate-400 text-base">
          <span className="font-semibold text-gray-200">Created At : </span>
          <span>{creationDate} </span>
          <span>{creationTime}</span>
        </div>
        <div className="font-medium text-base text-slate-400">
          <span className="font-semibold text-gray-200">Updated At : </span>
          <span>{updatedDate} </span>
          <span>{updatedTime}</span>
        </div>
        <div className="font-medium text-base text-slate-400">
          <span className="font-semibold text-gray-200">Due Date : </span>
          <span>{projectDetails.dueDate}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
