import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const Menu = () => {
  return (
    <div className=" shadow-md cursor-pointer flex justify-start items-center  rounded-full absolute right-1 top-4">
      <BsThreeDotsVertical className="font-bold text-blue-600 text-xl" />
    </div>
  );
};

export default Menu;
