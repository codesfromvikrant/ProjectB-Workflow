import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { IoCaretBackCircle } from "react-icons/io5";
import { ImPriceTags } from "react-icons/im";
import { FaTrash } from "react-icons/fa";
import { MdPublish } from "react-icons/md";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { openAddTagDialog, addInTagsSelected } from "../../features/notesSlice";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase/config";
import AddTags from "../dialog/AddTags";

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const date = new Date();
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const todayDate = date.toLocaleDateString("en-US", options);

const Editor = () => {
  const { nid } = useParams();
  const [data, setData] = useState({
    id: nid,
    title: "",
    content: "",
    last_update: todayDate,
  });
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const availableTags = useSelector((state) => state.notes.filtered_tags);
  const selectedTags = useSelector((state) => state.notes.tags_selected);
  const addTagDialog = useSelector((state) => state.notes.addtag_dialog);
  const navigate = useNavigate();

  const handleContentChange = (value) => {
    setData((prev) => ({ ...prev, content: value }));
  };

  const handleTitleChange = (e) => {
    setData((prev) => ({ ...prev, title: e.target.value }));
  };

  const get_data = async () => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return undefined;
      return docSnap.data();
    } catch (error) {
      console.error(error.code, error.message);
      return undefined;
    }
  };

  useEffect(() => {
    if (!uid) return;
    (async () => {
      const user_data = await get_data();
      if (!user_data) return;
      const notes_data = user_data.notes_data ? user_data.notes_data : [];
      const note = notes_data.find((note) => note.id === nid);
      if (note) {
        setData((prev) => ({
          ...prev,
          title: note.title,
          content: note.content,
        }));
        note.tags &&
          note.tags.forEach((tag) => dispatch(addInTagsSelected(tag)));
      }
    })();
  }, [uid]);

  const publish_data = async () => {
    try {
      const colRef = collection(db, "users");
      const user_data = await get_data();
      if (!user_data) return;
      const notes_data = user_data.notes_data ? user_data.notes_data : [];
      const tags_available = user_data.tags_available
        ? user_data.tags_available
        : [];

      availableTags.forEach((tag) => {
        if (!tags_available.includes(tag)) {
          updateDoc(doc(colRef, uid), {
            tags_available: arrayUnion(tag),
          });
        }
      });

      let notePresent = false;
      let notes = notes_data.map((note) => {
        if (note.id === nid) {
          notePresent = true;
          note.title = data.title;
          note.content = data.content;
          note.last_update = todayDate;
          note.tags = selectedTags;
          return note;
        }
        return note;
      });

      if (!notes || notePresent === false) {
        updateDoc(doc(colRef, uid), {
          notes_data: arrayUnion(data),
        });
      } else {
        updateDoc(doc(colRef, uid), {
          notes_data: notes,
        });
      }
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  const delete_data = async () => {
    try {
      const colRef = collection(db, "users");
      const user_data = await get_data();
      if (!user_data) return;
      const { notes_data } = user_data;

      let notes =
        notes_data &&
        notes_data.filter((note) => {
          if (note.id != nid) {
            return true;
          }
          return false;
        });

      if (notes) {
        updateDoc(doc(colRef, uid), {
          notes_data: notes,
        });
      }
      setData({
        id: nid,
        title: "",
        content: "",
      });
    } catch (error) {
      console.error(error.code, error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-secondary py-4 px-6 rounded-lg shadow-md mt-4 ">
      <div className="flex justify-between items-center py-3 border-b-[1px] border-blureffect mb-6">
        <button
          onClick={() => navigate(-1)}
          className="w-max flex justify-start items-center gap-1 shadow-md text-textcolor bg-primary hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 py-2 px-4 rounded-md"
        >
          <IoCaretBackCircle />
          <span className="text-sm font-semibold tracking-wide">Back</span>
        </button>
        <div className="flex justify-start items-center gap-2">
          <div className="relative">
            <button
              onClick={() => dispatch(openAddTagDialog())}
              className="w-max flex justify-start items-center gap-1 shadow-md text-textcolor bg-primary hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 py-2 px-4 rounded-md"
            >
              <span className="text-sm font-semibold tracking-wide">
                Add Tags
              </span>
              <ImPriceTags />
            </button>
            {addTagDialog && <AddTags />}
          </div>
          <button
            onClick={delete_data}
            className="w-max flex justify-start items-center gap-1 shadow-md text-textcolor bg-primary hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 py-2 px-4 rounded-lg"
          >
            <span className="text-sm font-semibold tracking-wide">Delete</span>
            <FaTrash />
          </button>
          <button
            onClick={publish_data}
            className="w-max flex justify-start items-center gap-1 shadow-md text-textcolor bg-primary hover:text-gray-200 hover:bg-blue-700 transition-all duration-500 py-2 px-4 rounded-lg"
          >
            <span className="text-sm font-semibold tracking-wide">Publish</span>
            <MdPublish className="text-xl" />
          </button>
        </div>
      </div>

      <input
        value={data.title}
        onChange={handleTitleChange}
        className="bg-transparent w-full outline-none mb-4 py-2 text-gray-200 placeholder:text-blureffect placeholder:font-extrabold text-4xl"
        type="text"
        placeholder="New Post Title Here..."
      />

      <ReactQuill
        value={data.content}
        onChange={handleContentChange}
        modules={modules}
        formats={formats}
        placeholder="Start typing here..."
      />
    </div>
  );
};

export default Editor;
