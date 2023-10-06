import React from "react";
import { useSearchParams } from "react-router-dom";
import useTask from "../../../hooks/useTask";

const SubtaskDrop = ({ subtask_id, task_id }) => {
  const { deleteSubtask, editSubtask } = useTask();
  const [searchParams] = useSearchParams();
  const projectID = searchParams.get("id");
  const projectStatus = searchParams.get("status");

  return (
    <ul>
      <li
        onClick={() => editSubtask(task_id, subtask_id)}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Edit Subtask
      </li>
      <li
        onClick={() =>
          deleteSubtask(projectID, task_id, subtask_id, projectStatus)
        }
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Delete Subtask
      </li>
    </ul>
  );
};

export default SubtaskDrop;
