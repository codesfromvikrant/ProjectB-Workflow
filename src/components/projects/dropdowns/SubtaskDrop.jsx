import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTaskEditor,
  setTaskID,
  setSubTaskID,
  updateTask,
} from "../../../features/tasksSlice";
import { db } from "../../../firebase/config";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";

const subtaskDrop = ({ subtask_id, task_id }) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const status = searchParams.get("status");

  const editSubtask = () => {
    dispatch(setTaskEditor(true));
    dispatch(setTaskID(task_id));
    dispatch(setSubTaskID(subtask_id));
  };

  const deleteSubtask = async () => {
    if (!uid || !id || !status) return;
    const docRef = doc(db, "projects", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const data = docSnap.data();
    const filtered_project = data[status].filter(
      (project) => project.id !== id
    );
    const current_project = data[status].find((project) => project.id === id);
    const current_task = current_project.tasks.find(
      (task) => task.id === task_id
    );
    const filtered_subtask = current_task.subtasks.filter(
      (subtask) => subtask.id !== subtask_id
    );
    current_task.subtasks = filtered_subtask;
    updateDoc(docRef, {
      [status]: [...filtered_project, current_project],
    });
    dispatch(updateTask(current_project.tasks));
  };
  return (
    <ul>
      <li
        onClick={editSubtask}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Edit Subtask
      </li>
      <li
        onClick={deleteSubtask}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Delete Subtask
      </li>
    </ul>
  );
};

export default subtaskDrop;
