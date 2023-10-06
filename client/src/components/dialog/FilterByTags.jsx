import React from "react";
import Filtering from "../notes/Filtering";

const FilterByTags = () => {
  return (
    <div className="h-max w-[13rem] p-4 rounded-md shadow-xl mt-3 z-50 bg-bgblack backdrop-blur-md absolute">
      <Filtering />
    </div>
  );
};

export default FilterByTags;
