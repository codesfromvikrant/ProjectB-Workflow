import React from "react";
import { TiTick } from "react-icons/ti";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { updateTask } from "../../features/tasksSlice";

const TickBox = ({ todoStatus, todo_id, task_id, subtask_id }) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const uid = useSelector((state) => state.auth.uid);
  const id = searchParams.get("id");
  const status = searchParams.get("status");

  const updateTodoStatus = async () => {
    if (!uid || !id || !status) return;
    const docRef = doc(db, "projects", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const data = docSnap.data();
    const filtered_project = data[status].filter(
      (project) => project.id !== id
    );
    const current_project = data[status].find((project) => project.id === id);
    const current_todo = current_project.tasks
      .find((task) => task.id === task_id)
      .subtasks.find((subtask) => subtask.id === subtask_id)
      .todos.find((todo) => todo.id === todo_id);
    current_todo.status = current_todo.status === "live" ? "completed" : "live";
    updateDoc(docRef, {
      [status]: [...filtered_project, current_project],
    });
    dispatch(updateTask(current_project.tasks));
  };

  return (
    <div
      onClick={updateTodoStatus}
      className="min-w-[0.9rem] min-h-[0.9rem] bg-glassyblue border-2 border-blue-600 rounded mt-1 flex justify-center items-center"
    >
      {todoStatus === "completed" ? <TiTick /> : null}
    </div>
  );
};

export default TickBox;
