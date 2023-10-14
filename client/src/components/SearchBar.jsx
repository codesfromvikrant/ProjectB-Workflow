import React from "react";
import { ImSearch } from "react-icons/im";

const SearchBar = ({ handleChange, value }) => {
  return (
    <div className="flex justify-start items-center gap-3 w-full bg-secondary py-3 px-5 rounded-md text-slate-400">
      <ImSearch className="text-xl" />
      <input
        onChange={handleChange}
        value={value}
        className="w-full placeholder:font-medium placeholder:text-slate-400 text-gray-200 bg-transparent outline-none border-none"
        type="text"
        placeholder="Search Your Images..."
      />
    </div>
  );
};

export default SearchBar;
