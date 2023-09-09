import useProject from "./useProject";
import {
  setTaskEditor,
  setTaskID,
  setSubTaskID,
  updateTask,
} from "../features/tasksSlice";
import { updateDoc } from "firebase/firestore";
import { projectRef } from "../utils/projectUtils";
import { useDispatch, useSelector } from "react-redux";

const useTask = () => {
  const { projectData } = useProject();
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);

  const deleteTask = async (projectID, taskID, status) => {
    const { filteredProject, currentProject } = await projectData(
      projectID,
      status
    );
    currentProject.tasks = currentProject.tasks.filter(
      (task) => task.id !== taskID
    );
    const ref = projectRef(uid);
    await updateDoc(ref, {
      [status]: [...filteredProject, currentProject],
    });
    dispatch(updateTask(currentProject.tasks));
  };

  const emptyTaskList = async (projectID, taskID, status) => {
    const { filteredProject, currentProject } = await projectData(
      projectID,
      status
    );
    currentProject.tasks = currentProject.tasks.map((task) => {
      if (task.id === taskID) {
        task.subtasks = [];
      }
      return task;
    });
    const ref = projectRef(uid);
    await updateDoc(ref, {
      [status]: [...filteredProject, currentProject],
    });
    dispatch(updateTask(currentProject.tasks));
  };

  const deleteSubtask = async (projectID, taskID, subtaskID, status) => {
    const { filteredProject, currentProject } = await projectData(
      projectID,
      status
    );
    const currentTask = currentProject.tasks.find((task) => task.id === taskID);
    currentTask.subtasks = currentTask.subtasks.filter(
      (subtask) => subtask.id !== subtaskID
    );
    const ref = projectRef(uid);
    await updateDoc(ref, {
      [status]: [...filteredProject, currentProject],
    });
    dispatch(updateTask(currentProject.tasks));
  };

  const editSubtask = (taskID, subtaskID) => {
    dispatch(setTaskEditor(true));
    dispatch(setTaskID(taskID));
    dispatch(setSubTaskID(subtaskID));
  };

  return { deleteTask, emptyTaskList, deleteSubtask, editSubtask };
};

export default useTask;
