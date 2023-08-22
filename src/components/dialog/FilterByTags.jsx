import React from "react";
import TagsList from "../notes/TagsList";

const FilterByTags = () => {
  return (
    <div className="h-max w-[13rem] p-4 rounded-md shadow-xl mt-3 z-50 bg-blureffect backdrop-blur-md absolute">
      <TagsList />
    </div>
  );
};

export default FilterByTags;
