import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useSearchParams } from "react-router-dom";
import { updateTask } from "../../../features/tasksSlice";

const TaskDrop = ({ task_id }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const uid = useSelector((state) => state.auth.uid);
  const id = searchParams.get("id");
  const status = searchParams.get("status");

  const deleteTask = async () => {
    if (!uid || !id || !status) return;
    const docRef = doc(db, "projects", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const data = docSnap.data();
    const filtered_project = data[status].filter(
      (project) => project.id !== id
    );
    const current_project = data[status].find((project) => project.id === id);
    current_project.tasks = current_project.tasks.filter(
      (task) => task.id !== task_id
    );
    updateDoc(docRef, {
      [status]: [...filtered_project, current_project],
    });
    dispatch(updateTask(current_project.tasks));
  };

  return (
    <ul>
      <li className="py-2 px-3 w-max hover:bg-bgblack cursor-pointer">
        Empty Task List
      </li>
      <li
        onClick={deleteTask}
        className="py-2 px-3 w-max hover:bg-bgblack cursor-pointer"
      >
        Delete Task
      </li>
    </ul>
  );
};

export default TaskDrop;
