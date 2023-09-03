import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch } from "react-redux";
import {
  setTaskID,
  setSubTaskID,
  setTaskEditor,
} from "../../features/tasksSlice";
import ToDoList from "./ToDoList";
import Menu from "../Menu";

const SubTask = ({ subtasks, task_id, index }) => {
  const dispatch = useDispatch();
  const subtasksList =
    subtasks.length &&
    subtasks.map((subtask) => {
      return (
        <div
          key={subtask.id}
          className="text-gray-200 bg-secondary p-4 rounded-md relative"
        >
          <Menu />
          <p className="font-medium mb-1">{subtask.title}</p>
          <p className="text-slate-400 text-sm tracking-wider ">
            {subtask.description}
          </p>
          {subtask.todos && (
            <ToDoList
              todos={subtask.todos}
              task_id={task_id}
              subtask_id={subtask.id}
            />
          )}
          <button
            onClick={() => {
              dispatch(setTaskEditor(true));
              dispatch(setTaskID(task_id));
              dispatch(setSubTaskID(subtask.id));
            }}
            className="bg-primary w-full p-3 mt-2 tracking-wider rounded-md text-sm font-medium"
          >
            Add ToDo List
          </button>
        </div>
      );
    });

  return (
    <div className="w-full">
      <div className="flex justify-between items-center text-white">
        <h3 className="text-base font-medium mb-2">#Task {index + 1}</h3>
        <BsThreeDots className="text-2xl" />
      </div>
      <button
        onClick={() => {
          dispatch(setTaskEditor(true));
          dispatch(setTaskID(task_id));
          dispatch(setSubTaskID(null));
        }}
        className="text-gray-200 w-full text-center font-medium tracking-wider bg-primary shadow-md py-3 px-6 rounded-md"
      >
        Add Sub Tasks
      </button>
      <div className="mt-3 grid grid-cols-1 gap-4">
        {subtasksList ? (
          subtasksList.reverse()
        ) : (
          <span className="text-textcolor"># No Sub Task Available</span>
        )}
      </div>
    </div>
  );
};

export default SubTask;
