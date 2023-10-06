import React from "react";
import { BiSolidAddToQueue } from "react-icons/bi";
import SubTask from "./SubTask";
import { useSelector, useDispatch } from "react-redux";
import { setProjectDetails } from "../../features/tasksSlice";
import { db } from "../../firebase/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { nanoid } from "nanoid";
import Pagination from "../Pagination";

const Tasks = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const projectDetails = useSelector((state) => state.tasks.project_details);
  const uid = useSelector((state) => state.auth.uid);
  const id = searchParams.get("id");
  const status = searchParams.get("status");
  const page = Number(searchParams.get("page")) || 1;

  const getTasks = async () => {
    if (!id || !status) return;
    const docRef = doc(db, "projects", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const data = docSnap.data();
    const filtered_project = data[status].filter(
      (project) => project.id !== id
    );
    const current_project = data[status].find((project) => project.id === id);
    const newTask = { id: nanoid(), subtasks: [] };
    current_project.tasks = current_project.tasks
      ? [newTask, ...current_project.tasks]
      : [newTask];
    updateDoc(docRef, {
      [status]: [...filtered_project, current_project],
    });
    dispatch(setProjectDetails(current_project));
  };

  const tasksList =
    projectDetails.tasks &&
    projectDetails.tasks.map((task, i) => {
      let start = (page - 1) * 3;
      let end = page * 3;
      if (projectDetails.tasks && end > projectDetails.tasks.length)
        end = projectDetails.tasks.length;
      if (i < start || i >= end) return null;
      return (
        <SubTask
          key={task.id}
          subtasks={task.subtasks}
          task_id={task.id}
          index={i}
        />
      );
    });

  return (
    <section className="mt-4">
      <div className="text-gray-200 flex justify-between items-center md:gap-0 sm:gap-3 gap-6 flex-col mb-10">
        <h3 className="text-4xl font-semibold w-max">Manage Tasks</h3>

        <div className="w-full flex sm:justify-between items-center sm:flex-row flex-col gap-4">
          <button
            onClick={getTasks}
            className="text-gray-200 text-center text-sm font-medium sm:w-max w-full flex sm:justify-start justify-center items-center gap-2 bg-glassyblue border-2 border-blue-600 sm:py-2 py-3 px-8 rounded-md"
          >
            <BiSolidAddToQueue className="text-base" />
            <span>Add New Task</span>
          </button>

          <Pagination
            totalComp={projectDetails.tasks ? projectDetails.tasks.length : 0}
            notesPerPage={3}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-1 md:gap-4 sm:gap-3 gap-8">
        {tasksList}
      </div>
    </section>
  );
};

export default Tasks;
