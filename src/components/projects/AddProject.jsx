import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { updateDoc, arrayUnion } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import {
  setOngoing,
  addInOngoing,
  editProjectId,
  projectEditor,
} from "../../features/projectsSlice";
import { getProjectDivisonData, projectRef } from "../../utils/projectUtils";

const AddProject = () => {
  const [value, setValue] = useState({
    id: nanoid(),
    status: "ongoing",
    title: "",
    description: "",
    dueDate: "",
  });
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const projectID = useSelector((state) => state.projects.editproject_id);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const addProjectToDb = async () => {
    const ongoingProjects = await getProjectDivisonData(uid, "ongoing");
    let present = false;
    const updated_ongoing = ongoingProjects.map((project) => {
      if (project.id === value.id) {
        present = true;
        return { ...value, updatedAt: new Date().toISOString() };
      }
      return project;
    });
    const ref = projectRef(uid);
    if (present) {
      await updateDoc(ref, { ongoing: updated_ongoing });
      dispatch(setOngoing(updated_ongoing));
      dispatch(projectEditor(false));
      dispatch(editProjectId(null));
      return;
    }
    const newProject = {
      ...value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addInOngoing(newProject));
    await updateDoc(ref, {
      ongoing: arrayUnion(newProject),
    });
    dispatch(projectEditor(false));
  };

  useEffect(() => {
    if (!uid || !projectID) return;
    const editProject = async () => {
      const ongoingProjects = await getProjectDivisonData(uid, "ongoing");
      const project = ongoingProjects.find(
        (project) => project.id === projectID
      );
      setValue((prev) => ({
        ...prev,
        id: project.id,
        title: project.title,
        description: project.description,
        dueDate: project.dueDate,
      }));
    };
    editProject();
  }, [uid, projectID]);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center absolute top-0 bg-bgblack backdrop-blur-sm ">
      <div className="flex justify-start items-start flex-col gap-4 w-[28rem] text-gray-300 bg-bgblack backdrop-blur-md px-4 py-6 rounded-md shadow-md z-50">
        <input
          className="w-full p-2 bg-blureffect rounded-md"
          type="text"
          name="title"
          onChange={handleChange}
          value={value.title}
          placeholder="Title..."
        />
        <textarea
          className="w-full projects h-36 bg-blureffect p-2 rounded-md"
          type="text"
          onChange={handleChange}
          name="description"
          value={value.description}
          placeholder="Description..."
        ></textarea>

        <div className="w-full">
          <p className="font-medium">Choose Due Date : </p>
          <input
            value={value.dueDate}
            name="dueDate"
            onChange={handleChange}
            className="w-2/3  bg-blureffect p-2 rounded-md"
            type="date"
          />
          <p className="text-xs mt-1 text-gray-400">
            * project will be marked as Pending after this date.
          </p>
        </div>

        <div className="flex justify-end items-center gap-3 pt-8 border-t-[1px] border-blureffect w-full">
          <button
            onClick={() => {
              dispatch(projectEditor(false));
              dispatch(editProjectId(null));
            }}
            className="py-2 px-6 rounded-md text-sm font-semibold bg-secondary"
          >
            Cancel
          </button>
          <button
            onClick={addProjectToDb}
            className="py-2 px-6 rounded-md text-sm font-semibold bg-blue-700"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
