import React from "react";
import useProject from "../../../hooks/useProject";

const CompletedDrop = ({ projectID }) => {
  const { deleteProject, moveToArchive, moveToOnGoing } = useProject();
  return (
    <ul>
      <li
        onClick={() => moveToArchive(projectID, "completed")}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Add To Archive
      </li>
      <li
        onClick={() => moveToOnGoing(projectID, "completed")}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Start Again
      </li>
      <li
        onClick={() => deleteProject(projectID, "completed")}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Delete Project
      </li>
    </ul>
  );
};

export default CompletedDrop;
