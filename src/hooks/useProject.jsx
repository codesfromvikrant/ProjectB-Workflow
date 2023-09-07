import { useDispatch, useSelector } from "react-redux";
import {
  setOngoing,
  editProjectId,
  projectEditor,
  addInCompleted,
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

  const projectData = async (projectID) => {
    const ongoing = await getProjectDivisonData(uid, "ongoing");
    const current_project = ongoing.find((project) => project.id === projectID);
    const ongoing_filtered = ongoing.filter(
      (project) => project.id !== projectID
    );
    return { ongoing_filtered, current_project };
  };

  const deleteProject = async (projectID) => {
    const { ongoing_filtered } = await projectData(projectID);
    const ref = projectRef(uid);
    await updateDoc(ref, {
      ongoing: ongoing_filtered,
    });
    dispatch(setOngoing(ongoing_filtered));
    dispatch(editProjectId(null));
  };

  const markAsComplete = async (projectID) => {
    const { ongoing_filtered, current_project } = await projectData(projectID);
    const ref = projectRef(uid);
    await updateDoc(ref, {
      ongoing: ongoing_filtered,
      completed: arrayUnion({
        ...current_project,
        status: "completed",
        completedAt: new Date().toISOString(),
      }),
    });
    dispatch(setOngoing(ongoing_filtered));
    dispatch(addInCompleted(current_project));
  };

  const moveToArchive = async (projectID) => {
    const { ongoing_filtered, current_project } = await projectData(projectID);
    const ref = projectRef(uid);
    await updateDoc(ref, {
      ongoing: ongoing_filtered,
      archived: arrayUnion({
        ...current_project,
        status: "archived",
        updatedAt: new Date().toISOString(),
      }),
    });
    dispatch(setOngoing(ongoing_filtered));
    dispatch(addInArchived(current_project));
  };

  return { showProjectEditor, deleteProject, markAsComplete, moveToArchive };
};

export default useProject;
