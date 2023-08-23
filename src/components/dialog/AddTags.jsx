import React, { useState } from "react";
import TagsList from "../notes/TagsList";
import { useSelector, useDispatch } from "react-redux";
import {
  addInTagsAvailable,
  addInTagsSelected,
} from "../../features/notesSlice";
import { useParams } from "react-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const AddTags = () => {
  const [value, setValue] = useState("");
  const [mssg, setMssg] = useState("");
  const [tags, setTags] = useState([]);
  const { nid } = useParams();
  const uid = useSelector((state) => state.auth.uid);
  const dispatch = useDispatch();

  const addInTags = async () => {
    if (!uid) return;
    if (!value) {
      setMssg("* Please Enter A Tag Name");
      return;
    }
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const tags_available = docSnap.data().tags_available
      ? docSnap.data().tags_available
      : [];
    if (tags_available.includes(value.toLocaleLowerCase())) {
      setMssg("Tag Already Exists");
      return;
    }
    tags_available.push(value);
    dispatch(addInTagsAvailable(value));
    dispatch(addInTagsSelected(value));
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="h-max w-[12rem] z-50 mt-3 bg-blureffect backdrop-blur-md p-2 rounded-md absolute">
      <TagsList tags={tags} setTags={setTags} />
      <div className="">
        <input
          type="text"
          onChange={handleChange}
          value={value}
          className="p-2 w-full rounded-md bg-blureffect text-white outline-blue-300 text-sm my-1"
          placeholder="Create A New Tag..."
        />
        <button
          onClick={addInTags}
          className="w-full text-sm text-gray-200 font-semibold bg-blue-700 my-1 p-2 rounded-md"
        >
          Add In Tags
        </button>
        <p className="text-xs text-red-500 font-normal">{mssg}</p>
      </div>
    </div>
  );
};

export default AddTags;
