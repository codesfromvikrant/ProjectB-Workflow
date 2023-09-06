import React from "react";
import { FaTrash } from "react-icons/fa";
import TickBox from "./TickBox";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { updateTask } from "../../features/tasksSlice";

const ToDoList = ({ todos, task_id, subtask_id }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const status = searchParams.get("status");
  const uid = useSelector((state) => state.auth.uid);

  const deleteTodo = async (todo_id) => {
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
    const current_subtask = current_task.subtasks.find(
      (subtask) => subtask.id === subtask_id
    );
    const current_todo = current_subtask.todos.filter(
      (todo) => todo.id !== todo_id
    );
    current_subtask.todos = current_todo;
    updateDoc(docRef, {
      [status]: [...filtered_project, current_project],
    });
    dispatch(updateTask(current_project.tasks));
  };

  const todoList = todos.map((todo) => {
    return (
      <div key={todo.id} className="flex justify-between items-start gap-3">
        <span className="flex justify-start items-start gap-3">
          <TickBox
            todoStatus={todo.status}
            todo_id={todo.id}
            task_id={task_id}
            subtask_id={subtask_id}
          />
          <span
            className={`${
              todo.status === "completed"
                ? "opacity-30 line-through"
                : "opacity-100"
            } font-medium text-sm text-slate-400`}
          >
            {todo.todo_task}
          </span>
        </span>
        <FaTrash onClick={() => deleteTodo(todo.id)} className="text-red-600" />
      </div>
    );
  });
  return <div className="grid grid-cols-1 gap-2 mt-2">{todoList}</div>;
};

export default ToDoList;
