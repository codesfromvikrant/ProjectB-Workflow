import React from "react";
import { doc, getDoc, arrayUnion, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useSelector, useDispatch } from "react-redux";
import {
  setOngoing,
  editProjectId,
  projectEditor,
  addInCompleted,
  addInTrash,
} from "../../../features/projectsSlice";

const OngoingDropdown = ({ id }) => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);

  const showProjectEditor = () => {
    dispatch(editProjectId(id));
    dispatch(projectEditor(true));
    document.getElementById(`dialog-${id}`).classList.toggle("hidden");
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

  const moveToTrash = async (projectID) => {
    const docRef = doc(db, "projects", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const ongoing = docSnap.data().ongoing;
    const project_trash = ongoing.find((project) => project.id === projectID);
    const ongoing_filtered = ongoing.filter(
      (project) => project.id !== projectID
    );
    await updateDoc(docRef, {
      ongoing: ongoing_filtered,
      trash: arrayUnion({
        ...project_trash,
        status: "trash",
        deletedAt: new Date().toISOString(),
      }),
    });
    dispatch(setOngoing(ongoing_filtered));
    dispatch(addInTrash(project_trash));
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
    <div
      id={`dialog-${id}`}
      className="hidden bg-bgblack backdrop-blur-md text-gray-200 tracking-wider font-light py-1 shadow-md rounded-md absolute z-[50] top-[2.6rem] right-[0.7rem]"
    >
      <ul>
        <li
          onClick={showProjectEditor}
          className="py-2 px-3 hover:bg-bgblack cursor-pointer"
        >
          Edit Project
        </li>
        <li
          onClick={() => {
            markAsComplete(id);
            document.getElementById(`dialog-${id}`).classList.toggle("hidden");
          }}
          className="py-2 px-3 hover:bg-bgblack cursor-pointer"
        >
          Mark As Complete
        </li>
        <li
          onClick={() => {
            moveToArchive(id);
            document.getElementById(`dialog-${id}`).classList.toggle("hidden");
          }}
          className="py-2 px-3 hover:bg-bgblack cursor-pointer"
        >
          Move To Archive
        </li>
        <li
          onClick={() => {
            moveToTrash(id);
            document.getElementById(`dialog-${id}`).classList.toggle("hidden");
          }}
          className="py-2 px-3 hover:bg-bgblack cursor-pointer"
        >
          Delete Project
        </li>
      </ul>
    </div>
  );
};

export default OngoingDropdown;
