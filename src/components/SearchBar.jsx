import React from "react";
import { ImSearch } from "react-icons/im";

const SearchBar = () => {
  return (
    <div className="flex justify-start items-center gap-3 w-full bg-secondary py-3 px-5 rounded-md text-textcolor">
      <ImSearch className="text-xl" />
      <input
        className="w-full placeholder:text-textcolor placeholder:font-semibold text-gray-200 bg-transparent outline-none border-none"
        type="text"
        placeholder="Search Your Images..."
      />
    </div>
  );
};

export default SearchBar;
