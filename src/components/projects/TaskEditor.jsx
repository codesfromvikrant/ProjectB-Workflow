import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import TickBox from "./TickBox";
import { useSelector, useDispatch } from "react-redux";
import { setProjectDetails, setTaskEditor } from "../../features/tasksSlice";
import { useSearchParams } from "react-router-dom";
import { db } from "../../firebase/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import ToDoList from "./ToDoList";

const TaskEditor = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [todoTask, setTodoTask] = useState("");
  const [value, setvalue] = useState({
    id: nanoid(),
    title: "",
    description: "",
    todos: [],
    createdAt: new Date().toISOString(),
    updatedAt: "",
  });
  const uid = useSelector((state) => state.auth.uid);
  const id = searchParams.get("id");
  const status = searchParams.get("status");
  const taskID = useSelector((state) => state.tasks.task_id);
  const subtaskID = useSelector((state) => state.tasks.subtask_id);

  const handleChange = (e) => {
    setvalue({ ...value, [e.target.name]: e.target.value });
  };
  const handleTodoTask = (e) => {
    setTodoTask(e.target.value);
  };
  const addInToDo = () => {
    if (!todoTask) return;
    setvalue({
      ...value,
      todos: [
        ...value.todos,
        { id: nanoid(), todo_task: todoTask, status: "live" },
      ],
    });
    setTodoTask("");
  };

  const getData = async () => {
    if (!uid || !id || !status) return;
    const docRef = doc(db, "projects", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const data = docSnap.data();
    const filtered_project = data[status].filter(
      (project) => project.id !== id
    );
    const current_project = data[status].find((project) => project.id === id);
    const current_task =
      current_project.tasks &&
      current_project.tasks.find((task) => task.id === taskID);

    const current_subtask =
      current_task &&
      current_task.subtasks.find((subtask) => subtask.id === subtaskID);
    return { filtered_project, current_project, current_task, current_subtask };
  };

  useEffect(() => {
    if (!taskID || !subtaskID) return;
    const getTask = async () => {
      const { current_subtask } = await getData();
      if (!current_subtask) return;
      setvalue({
        ...value,
        id: subtaskID,
        title: current_subtask.title,
        description: current_subtask.description,
        todos: current_subtask.todos,
        createdAt: current_subtask.createdAt,
        updatedAt: current_subtask.updatedAt,
      });
    };
    getTask();
  }, [taskID, subtaskID]);

  const addNewSubtask = async () => {
    const { filtered_project, current_project, current_task, current_subtask } =
      await getData();
    const docRef = doc(db, "projects", uid);
    if (current_subtask) {
      current_subtask.title = value.title;
      current_subtask.description = value.description;
      current_subtask.todos = value.todos;
      current_subtask.updatedAt = new Date().toISOString();
    } else {
      current_task.subtasks = current_task.subtasks
        ? [...current_task.subtasks, value]
        : [value];
    }
    updateDoc(docRef, {
      [status]: [...filtered_project, current_project],
    });
    dispatch(setProjectDetails(current_project));
  };

  const localDateTime = (date) => {
    const local_date_time = new Date(date);
    const localDate = local_date_time.toLocaleDateString();
    const localTime = local_date_time.toLocaleTimeString();
    return { localDate, localTime };
  };

  return (
    <div className="bg-bgblack backdrop-blur-lg p-4 w-[25rem] h-[100vh] overflow-y-auto fixed top-0 right-0">
      <div className="flex justify-between items-center text-sm font-medium text-gray-200 mb-4">
        <button
          onClick={() => dispatch(setTaskEditor(false))}
          className="bg-secondary py-3 px-6 rounded-md"
        >
          Back
        </button>
        <button
          onClick={addNewSubtask}
          className="bg-glassyblue border-2 border-blue-600 py-3 px-6 rounded-md"
        >
          Publish
        </button>
      </div>

      {value.updatedAt && (
        <div className="text-slate-400 text-xs text-end">
          <span className="font-semibold text-gray-200 tracking-wider">
            Created At :{" "}
          </span>
          <span>{localDateTime(value.createdAt).localDate}</span>{" "}
          <span>{localDateTime(value.createdAt).localTime}</span>
        </div>
      )}
      {value.updatedAt && (
        <div className="text-slate-400 text-xs text-end">
          <span className="font-semibold text-gray-200 tracking-wider">
            Updated At :{" "}
          </span>
          <span>{localDateTime(value.updatedAt).localDate}</span>{" "}
          <span>{localDateTime(value.updatedAt).localTime}</span>
        </div>
      )}

      <div className="flex justify-start items-start flex-col gap-3 mt-3">
        <input
          type="text"
          name="title"
          value={value.title}
          onChange={handleChange}
          placeholder="Enter Task Title"
          className="w-full bg-bgblack shadow p-4 rounded-md text-gray-200 text-sm font-medium"
        />
        <textarea
          name="description"
          value={value.description}
          onChange={handleChange}
          placeholder="Enter Task Description"
          className="w-full h-56 bg-bgblack shadow p-4 rounded-md text-gray-200 text-sm font-medium"
        ></textarea>
      </div>

      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter ToDo Task"
          name="todoTask"
          value={todoTask}
          onChange={handleTodoTask}
          className="w-full bg-bgblack shadow p-4 rounded-md text-gray-200 text-sm font-medium"
        />
        <button
          onClick={addInToDo}
          className="bg-secondary text-sm text-gray-200 font-medium p-3 w-full rounded-md mt-2"
        >
          Add To ToDo
        </button>
      </div>

      <div className="mt-3">
        <ToDoList todos={value.todos} />
      </div>
    </div>
  );
};

export default TaskEditor;
