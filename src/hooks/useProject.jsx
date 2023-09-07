import { useDispatch, useSelector } from "react-redux";
import {
  setOngoing,
  addInOngoing,
  editProjectId,
  projectEditor,
  setCompleted,
  addInCompleted,
  setArchived,
  addInArchived,
} from "../features/projectsSlice";
import { arrayUnion, updateDoc } from "firebase/firestore";
import { getProjectDivisonData, projectRef } from "../utils/projectUtils";

const useProject = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);

  const showProjectEditor = (id) => {
    dispatch(editProjectId(id));
    dispatch(projectEditor(true));
    document.getElementById(`drop-${id}`).classList.toggle("hidden");
  };

  const projectData = async (projectID, status) => {
    const data = await getProjectDivisonData(uid, status);
    const currentProject = data.find((project) => project.id === projectID);
    const filteredProject = data.filter((project) => project.id !== projectID);
    return { filteredProject, currentProject };
  };

  const deleteProject = async (projectID, status) => {
    const { filteredProject } = await projectData(projectID, status);
    const ref = projectRef(uid);
    await updateDoc(ref, {
      [status]: filteredProject,
    });
    if (status === "ongoing") {
      dispatch(setOngoing(filteredProject));
    } else if (status === "completed") {
      dispatch(setCompleted(filteredProject));
    } else {
      dispatch(setArchived(filteredProject));
    }
    dispatch(editProjectId(null));
  };

  const markAsComplete = async (projectID, status) => {
    const { filteredProject, currentProject } = await projectData(
      projectID,
      status
    );
    const ref = projectRef(uid);
    await updateDoc(ref, {
      [status]: filteredProject,
      completed: arrayUnion({
        ...currentProject,
        status: "completed",
        completedAt: new Date().toISOString(),
      }),
    });
    if (status === "ongoing") {
      dispatch(setOngoing(filteredProject));
    } else {
      dispatch(setArchived(filteredProject));
    }
    dispatch(addInCompleted(currentProject));
  };

  const moveToArchive = async (projectID, status) => {
    const { filteredProject, currentProject } = await projectData(
      projectID,
      status
    );
    const ref = projectRef(uid);
    await updateDoc(ref, {
      [status]: filteredProject,
      archived: arrayUnion({
        ...currentProject,
        status: "archived",
        archiveAt: new Date().toISOString(),
      }),
    });
    if (status === "ongoing") {
      dispatch(setOngoing(filteredProject));
    } else {
      dispatch(setCompleted(filteredProject));
    }
    dispatch(addInArchived(currentProject));
  };

  const moveToOnGoing = async (projectID, status) => {
    const { filteredProject, currentProject } = await projectData(
      projectID,
      status
    );
    const ref = projectRef(uid);
    await updateDoc(ref, {
      [status]: filteredProject,
      ongoing: arrayUnion({
        ...currentProject,
        status: "ongoing",
        updatedAt: new Date().toISOString(),
      }),
    });
    if (status === "completed") {
      dispatch(setCompleted(filteredProject));
    } else {
      dispatch(setArchived(filteredProject));
    }
    dispatch(addInOngoing(currentProject));
  };

  return {
    showProjectEditor,
    deleteProject,
    markAsComplete,
    moveToArchive,
    moveToOnGoing,
  };
};

export default useProject;
