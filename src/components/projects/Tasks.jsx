import React from "react";
import TasksIcon from "../../assets/icons/tasks.png";
import SubTask from "./SubTask";
import { useSelector, useDispatch } from "react-redux";
import { setProjectDetails } from "../../features/tasksSlice";
import { db } from "../../firebase/config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { useSearchParams } from "react-router-dom";
import { nanoid } from "nanoid";

const Tasks = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const projectDetails = useSelector((state) => state.tasks.project_details);
  const uid = useSelector((state) => state.auth.uid);
  const id = searchParams.get("id");
  const status = searchParams.get("status");

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
      ? [...current_project.tasks, newTask]
      : [newTask];
    updateDoc(docRef, {
      [status]: [...filtered_project, current_project],
    });
    dispatch(setProjectDetails(current_project));
  };

  const tasksList =
    projectDetails.tasks &&
    projectDetails.tasks.map((task, i) => {
      return <SubTask subtasks={task.subtasks} task_id={task.id} index={i} />;
    });

  return (
    <section className="mt-8">
      <div className="text-gray-200 flex justify-between items-center gap-4 mb-6">
        <div className="flex justify-start items-center gap-4">
          <img src={TasksIcon} className="w-8" />
          <h3 className="text-2xl font-semibold">Manage Tasks</h3>
        </div>

        <button
          onClick={getTasks}
          className="text-gray-200 text-center text-sm font-medium bg-blue-600 border-2 border-blue-600 py-2 px-4 rounded-full"
        >
          Add New Task
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">{tasksList.reverse()}</div>
    </section>
  );
};

export default Tasks;
