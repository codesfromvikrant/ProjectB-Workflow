import React, { useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector, useDispatch } from "react-redux";
import { setFilteredTags, addInTagsSelected } from "../../features/notesSlice";

const TagsList = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const tagsAvailable = useSelector((state) => state.notes.filtered_tags);

  useEffect(() => {
    if (!uid) return;
    async function getTagsAvailable() {
      try {
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.data().tags_available) {
          dispatch(setFilteredTags(docSnap.data().tags_available));
        }
      } catch (error) {
        console.error(error.code, error.message);
      }
    }
    getTagsAvailable();
  }, [uid]);

  const tagsList =
    tagsAvailable &&
    tagsAvailable.map((tag) => {
      return (
        <div
          key={tag}
          onClick={() => dispatch(addInTagsSelected(tag))}
          className="flex justify-between items-center text-gray-400 transition-all duration-500 py-2 w-full rounded-lg hover:px-2  hover:text-blue-600 cursor-pointer"
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

export default TagsList;
