import React, { useState } from "react";
import { BiSolidAddToQueue } from "react-icons/bi";
import { HiDocument } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import FilterByTags from "../dialog/FilterByTags";
import { nanoid } from "nanoid";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFilteredNotes, openFilterDialog } from "../../features/notesSlice";

const Header = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const all_notes = useSelector((state) => state.notes.all_notes);
  const filtered_notes = useSelector((state) => state.notes.filtered_notes);
  const filter_dialog = useSelector((state) => state.notes.filter_dialog);
  const archive = searchParams.get("archive") === "true" ? true : false;

  const viewAllNotes = () => {
    setSearchParams(new URLSearchParams());
    dispatch(setFilteredNotes(all_notes));
  };

  function filtering(key, value) {
    setSearchParams((prevParam) => {
      prevParam.set(key, value);
      return prevParam;
    });
  }

  const addNote = () => {
    navigate(`./${nanoid()}`);
  };

  const filterArchive = () => {
    filtering("archive", true);
    const updated = filtered_notes.filter(
      (note) => note.archive && note.archive === true
    );
    dispatch(setFilteredNotes(updated));
  };

  const searchForNotes = (e) => {
    filtering("search", e.target.value);
    setValue(e.target.value);
    const update = all_notes.filter(
      (note) =>
        note.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
        note.content.toLowerCase().includes(e.target.value.toLowerCase())
    );
    dispatch(setFilteredNotes(update));
  };

  return (
    <div className="flex justify-start items-center gap-3 text-slate-400">
      <button
        onClick={addNote}
        className="flex justify-start items-center gap-2 shadow-md bg-glassyblue border-2 border-blue-600 hover:bg-blue-600 py-3 px-5 rounded-md w-max text-gray-200"
      >
        <span className="w-max tracking-wide text-sm font-medium">
          Add New Note
        </span>
        <BiSolidAddToQueue className="text-xl" />
      </button>
      <button
        onClick={viewAllNotes}
        className="flex justify-start items-center gap-1 bg-secondary hover:bg-blue-700 hover:text-white transition-all duration-500 text-sm py-3 px-5 shadow-md rounded-md font-medium"
      >
        <span className="tracking-wide">All</span>
        <HiDocument className="text-xl" />
      </button>
      <button
        onClick={filterArchive}
        className={`${
          archive ? "bg-glassyblue border-2 border-blue-600" : "bg-secondary"
        } flex justify-start items-center gap-2 hover:bg-blue-700 hover:text-white transition-all duration-500 text-sm py-3 px-5 shadow-md rounded-md font-medium`}
      >
        <span className="tracking-wide">Archive</span>
        <FaTrash className="text-base" />
      </button>
      <div className="relative">
        <button
          onClick={() => dispatch(openFilterDialog())}
          className="flex justify-start items-center gap-2 bg-secondary hover:bg-blue-700 hover:text-white transition-all duration-500 text-sm py-3 px-5 shadow-md w-max rounded-md font-medium"
        >
          <span className="tracking-wide w-max">Filter By Tags</span>
          <ImPriceTags className="text-xl " />
        </button>
        {filter_dialog && <FilterByTags />}
      </div>

      <input
        type="text"
        value={value}
        placeholder="Search For Notes..."
        onChange={searchForNotes}
        className="p-3 rounded text-sm font-medium bg-secondary w-full"
      />
    </div>
  );
};

export default Header;
