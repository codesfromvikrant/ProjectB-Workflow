import React from "react";
import { doc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useSelector, useDispatch } from "react-redux";
import {
  setOngoing,
  editProjectId,
  projectEditor,
  addInCompleted,
  addInArchived,
} from "../../../features/projectsSlice";

const OngoingDrop = ({ project_id }) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);

  const showProjectEditor = () => {
    dispatch(editProjectId(id));
    dispatch(projectEditor(true));
    document.getElementById(`drop-${id}`).classList.toggle("hidden");
  };

  const markAsComplete = async (projectID) => {
    const docRef = doc(db, "projects", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const ongoing = docSnap.data().ongoing;
    const project_completed = ongoing.find(
      (project) => project.id === projectID
    );
    const ongoing_filtered = ongoing.filter(
      (project) => project.id !== projectID
    );
    await updateDoc(docRef, {
      ongoing: ongoing_filtered,
      completed: arrayUnion({
        ...project_completed,
        status: "completed",
        completedAt: new Date().toISOString(),
      }),
    });
    dispatch(setOngoing(ongoing_filtered));
    dispatch(addInCompleted(project_completed));
  };

  const deleteProject = async (projectID) => {
    const docRef = doc(db, "projects", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const ongoing = docSnap.data().ongoing;
    const ongoing_filtered = ongoing.filter(
      (project) => project.id !== projectID
    );
    await updateDoc(docRef, {
      ongoing: ongoing_filtered,
    });
    dispatch(setOngoing(ongoing_filtered));
  };

  const moveToArchive = async (projectID) => {
    const docRef = doc(db, "projects", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const ongoing = docSnap.data().ongoing;
    const project_archived = ongoing.find(
      (project) => project.id === projectID
    );
    const ongoing_filtered = ongoing.filter(
      (project) => project.id !== projectID
    );
    await updateDoc(docRef, {
      ongoing: ongoing_filtered,
      archived: arrayUnion({
        ...project_archived,
        status: "archived",
        updatedAt: new Date().toISOString(),
      }),
    });
    dispatch(setOngoing(ongoing_filtered));
    dispatch(addInArchived(project_archived));
  };

  return (
    <ul>
      <li
        onClick={showProjectEditor}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Edit Project
      </li>
      <li
        onClick={() => {
          markAsComplete(project_id);
          document
            .getElementById(`drop-${project_id}`)
            .classList.toggle("hidden");
        }}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Mark As Complete
      </li>
      <li
        onClick={() => {
          moveToArchive(project_id);
          document
            .getElementById(`drop-${project_id}`)
            .classList.toggle("hidden");
        }}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Move To Archive
      </li>
      <li
        onClick={() => {
          deleteProject(project_id);
          document
            .getElementById(`drop-${project_id}`)
            .classList.toggle("hidden");
        }}
        className="py-2 px-3 hover:bg-bgblack cursor-pointer"
      >
        Delete Project
      </li>
    </ul>
  );
};

export default OngoingDrop;
