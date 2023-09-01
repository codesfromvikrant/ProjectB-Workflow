import React, { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector, useDispatch } from "react-redux";
import {
  setFilteredNotes,
  setFilteredTags,
  setTagsSelected,
  addInTagsSelected,
} from "../../features/notesSlice";
import { useSearchParams } from "react-router-dom";

const Filtering = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const all_notes = useSelector((state) => state.notes.all_notes);
  const filtered_notes = useSelector((state) => state.notes.filtered_notes);
  const tagsAvailable = useSelector((state) => state.notes.filtered_tags);
  const tagsSelected = useSelector((state) => state.notes.tags_selected);

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

  useEffect(() => {
    if (!filtered_notes) return;
    let update = all_notes;
    tagsSelected.forEach((tag) => {
      update = update.filter((note) => note.tags && note.tags.includes(tag));
    });
    dispatch(setFilteredNotes(update));
  }, [tagsSelected]);

  const filteredTagSelected = (tag) => {
    if (tagsSelected.includes(tag)) {
      const update = tagsSelected.filter((item) => item !== tag);
      dispatch(setTagsSelected(update));
    } else {
      dispatch(addInTagsSelected(tag));
    }
  };

  const tagsList =
    tagsAvailable &&
    tagsAvailable.map((tag) => {
      const style = {
        color: tagsSelected.includes(tag) ? "#3b82f6" : "#e5e7eb",
      };
      return (
        <div
          key={tag}
          onClick={() => {
            filteredTagSelected(tag);
          }}
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
    <div>{tagsAvailable.length != 0 ? tagsList : "No Tags Available"}</div>
  );
};

export default Filtering;
