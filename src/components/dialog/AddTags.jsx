import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addInTagsAvailable } from "../../features/notesSlice";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const AddTags = ({ tagsSelected, addTagsSelected }) => {
  const [value, setValue] = useState("");
  const [mssg, setMssg] = useState("");
  const uid = useSelector((state) => state.auth.uid);
  const tagsAvailable = useSelector((state) => state.notes.filtered_tags);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!uid) return;
    async function getTagsAvailable() {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.data().tags_available) {
        dispatch(setFilteredTags(docSnap.data().tags_available));
      }
    }
    getTagsAvailable();
  }, [uid]);

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
    tags_available.push(value.toLowerCase());
    dispatch(addInTagsAvailable(value.toLowerCase()));
    addTagsSelected(value.toLowerCase());
    setValue("");
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const tagsList =
    tagsAvailable &&
    tagsAvailable.map((tag) => {
      const style = {
        color: tagsSelected.includes(tag) ? "#3b82f6" : "#e5e7eb",
      };
      console.log(style);
      return (
        <div
          key={tag}
          onClick={() => addTagsSelected(tag)}
          style={style}
          className="flex justify-between items-center  transition-all duration-500 py-2 w-full rounded-lg hover:px-2  hover:text-blue-600 cursor-pointer"
        >
          <span className="text-sm font-semibold capitalize tracking-wider">
            {tag}
          </span>
          <FaCheck className="text-sm" />
        </div>
      );
    });

  return (
    <div className="h-max w-[12rem] z-50 mt-3 bg-bgblack backdrop-blur-md p-2 rounded-md absolute">
      {tagsList}
      <div className="">
        <input
          type="text"
          onChange={handleChange}
          value={value}
          className="p-2 w-full rounded-md bg-bgblack text-white outline-blue-300 text-sm my-1"
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
