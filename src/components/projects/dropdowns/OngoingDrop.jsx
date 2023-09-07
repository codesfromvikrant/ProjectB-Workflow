import React from "react";
import useProject from "../../../hooks/useProject";

const OngoingDrop = ({ projectID, ...props }) => {
  const { showProjectEditor, deleteProject, markAsComplete, moveToArchive } =
    useProject();

  const showDropdown = (id) => {
    document.getElementById(id).classList.toggle("hidden");
  };

  return (
    <ul>
      <li
        onClick={() => showProjectEditor(projectID)}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Edit Project
      </li>
      <li
        onClick={() => {
          markAsComplete(projectID);
          showDropdown(`drop-${projectID}`);
        }}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Mark As Complete
      </li>
      <li
        onClick={() => {
          moveToArchive(projectID);
          showDropdown(`drop-${projectID}`);
        }}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Move To Archive
      </li>
      <li
        onClick={() => {
          deleteProject(projectID);
          showDropdown(`drop-${projectID}`);
        }}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Delete Project
      </li>
    </ul>
  );
};

export default OngoingDrop;
