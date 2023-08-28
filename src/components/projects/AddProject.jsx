import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { db } from "../../firebase/config";
import { doc, getDoc, collection, updateDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import {
  setOngoing,
  addInOngoing,
  projectEditor,
} from "../../features/projectsSlice";

const AddProject = () => {
  const [addtofav, setAddToFav] = useState(false);
  const [value, setValue] = useState({
    id: nanoid(),
    status: "ongoing",
    title: "",
    description: "",
    dueDate: "",
    isFav: false,
  });
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const editProjectId = useSelector((state) => state.projects.editproject_id);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  // styles
  const favStyles = {
    display: "flex",
    justifyContent: addtofav ? "flex-end" : "flex-start",
    alignItems: "center",
  };
  const buttonStyles = {
    backgroundColor: addtofav ? "#2563eb" : "#e5e7eb",
  };

  const addProjectToDb = async () => {
    const docRef = doc(db, "projects", uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return;
    const data = docSnap.data();
    let present = false;
    const updated_ongoing = data.ongoing.map((project) => {
      if (project.id === value.id) {
        present = true;
        return { ...value, updatedAt: new Date().toISOString() };
      }
      return project;
    });
    if (present) {
      await updateDoc(docRef, { ongoing: updated_ongoing });
      dispatch(setOngoing(updated_ongoing));
      dispatch(projectEditor(false));
      return;
    }
    const newProject = {
      ...value,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch(addInOngoing(newProject));
    data.ongoing.push(newProject);
    await updateDoc(docRef, data);
    dispatch(projectEditor(false));
  };

  useEffect(() => {
    if (!uid || !editProjectId) return;
    const editProject = async () => {
      const docRef = doc(db, "projects", uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return;
      const data = docSnap.data();
      const project = data.ongoing.find(
        (project) => project.id === editProjectId
      );
      setValue((prev) => ({
        ...prev,
        id: project.id,
        title: project.title,
        description: project.description,
        dueDate: project.dueDate,
        isFav: project.isFav,
        icons: project.icons,
      }));
    };
    editProject();
  }, [uid]);

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
        <div className="flex justify-start items-center gap-3">
          <div
            style={favStyles}
            onClick={() => {
              setValue({ ...value, isFav: !addtofav });
              setAddToFav(!addtofav);
            }}
            className="w-12 rounded-full p-1 bg-secondary"
          >
            <div
              style={buttonStyles}
              className="w-[1rem] h-[1rem] rounded-full"
            ></div>
          </div>
          <p className="text-sm font-semibold">Add To Favourite</p>
        </div>
        <div className="flex justify-end items-center gap-3 pt-8 border-t-[1px] border-blureffect w-full">
          <button
            onClick={() => dispatch(projectEditor(false))}
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
