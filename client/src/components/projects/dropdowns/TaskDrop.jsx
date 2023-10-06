import React from "react";
import { useSearchParams } from "react-router-dom";
import useTask from "../../../hooks/useTask";

const TaskDrop = ({ task_id }) => {
  const { deleteTask, emptyTaskList } = useTask();
  const [searchParams] = useSearchParams();
  const projectID = searchParams.get("id");
  const projectStatus = searchParams.get("status");

  return (
    <ul className="w-max">
      <li
        onClick={() => emptyTaskList(projectID, task_id, projectStatus)}
        className="py-2 px-3 w-full hover:bg-bgblack cursor-pointer"
      >
        Empty Task List
      </li>
      <li
        onClick={() => deleteTask(projectID, task_id, projectStatus)}
        className="py-2 px-3 w-full hover:bg-bgblack cursor-pointer"
      >
        Delete Task
      </li>
    </ul>
  );
};

export default TaskDrop;
