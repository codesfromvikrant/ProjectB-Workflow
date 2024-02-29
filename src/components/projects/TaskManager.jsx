import React, { useState, useEffect } from "react";
import ProjectDetails from "./ProjectDetails";
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setProjectDetails } from "../../features/tasksSlice";
import Tasks from "./Tasks";
import TaskEditor from "./TaskEditor";

const TaskManager = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  const status = searchParams.get("status");
  const uid = useSelector((state) => state.auth.uid);
  const taskEditor = useSelector((state) => state.tasks.task_editor);

  const getProjectDetails = async () => {
    const docRef = doc(db, "projects", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const data = docSnap.data();
    const project = data[status].find((project) => project.id === id);
    dispatch(setProjectDetails(project));
  };

  useEffect(() => {
    if (!uid) return;
    if (!id || !status) {
      navigate("/user/projects");
      return;
    }
    getProjectDetails();
  }, [id, status, uid]);

  return (
    <section className="w-full h-[100vh] overflow-y-auto mx-auto lg:px-6 px-4 py-10 relative">
      <div className="bg-bgblack max-w-6xl mx-auto md:p-6 p-3 rounded-md">
        <ProjectDetails />
        <Tasks />
        {taskEditor && <TaskEditor />}
      </div>
    </section>
  );
};

export default TaskManager;
