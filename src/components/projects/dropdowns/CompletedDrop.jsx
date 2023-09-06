import React from "react";

const CompletedDrop = () => {
  return (
    <ul>
      <li className="py-2 px-3 hover:bg-bgblack cursor-pointer">
        View Project
      </li>
      <li className="py-2 px-3 hover:bg-bgblack cursor-pointer">
        Add To Archive
      </li>
      <li className="py-2 px-3 hover:bg-bgblack cursor-pointer">Start Again</li>
      <li className="py-2 px-3 hover:bg-bgblack cursor-pointer">
        Delete Project
      </li>
    </ul>
  );
};

export default CompletedDrop;
