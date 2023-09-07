import React from "react";
import useProject from "../../../hooks/useProject";

const ArchiveDrop = ({ projectID }) => {
  const { deleteProject, markAsComplete, moveToOnGoing } = useProject();
  return (
    <ul>
      <li
        onClick={() => markAsComplete(projectID, "archived")}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Mark As Complete
      </li>
      <li
        onClick={() => moveToOnGoing(projectID, "archived")}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Restore Project
      </li>
      <li
        onClick={() => deleteProject(projectID, "archived")}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Delete Project
      </li>
    </ul>
  );
};

export default ArchiveDrop;
