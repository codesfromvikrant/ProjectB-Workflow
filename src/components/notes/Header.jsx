import React from "react";
import { BiSolidAddToQueue } from "react-icons/bi";
import { HiDocument } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { ImPriceTags } from "react-icons/im";
import { ImPushpin } from "react-icons/im";
import SearchBar from "../SearchBar";
import FilterByTags from "../dialog/FilterByTags";
import { nanoid } from "nanoid";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFilteredNotes, openFilterDialog } from "../../features/notesSlice";

const Header = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const all_notes = useSelector((state) => state.notes.all_notes);
  const filter_dialog = useSelector((state) => state.notes.filter_dialog);

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
        onClick={() => filtering("trash", true)}
        className="flex justify-start items-center gap-2 bg-secondary hover:bg-blue-700 hover:text-white transition-all duration-500 text-sm py-3 px-5 shadow-md rounded-md font-medium"
      >
        <span className="tracking-wide">Trash</span>
        <FaTrash className="text-base " />
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
      <button className="flex justify-start items-center gap-2 bg-secondary hover:bg-blue-700 hover:text-white transition-all duration-500 text-sm py-3 px-5 shadow-md w-max rounded-md font-medium">
        <span className="tracking-wide w-max">Filter By Pin</span>
        <ImPushpin className="text-xl" />
      </button>
      <SearchBar />
    </div>
  );
};

export default Header;
