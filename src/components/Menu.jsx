import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const Menu = () => {
  return (
    <div className="cursor-pointer flex justify-start items-center py-1 bg-primary backdrop-blur-md rounded absolute right-1 top-4">
      <BsThreeDotsVertical className="font-bold text-slate-400 text-xl" />
    </div>
  );
};

export default Menu;
