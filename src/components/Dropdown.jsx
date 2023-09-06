import React from "react";

const Dropdown = ({ id, children }) => {
  return (
    <div
      id={`drop-${id}`}
      className="hidden bg-bgblack backdrop-blur-md text-sm text-gray-200 tracking-wider font-light py-1 shadow-md rounded-md absolute z-[50] top-[2.6rem] right-[0.7rem]"
    >
      {children}
    </div>
  );
};

export default Dropdown;
