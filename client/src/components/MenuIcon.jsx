import React from "react";
import { TfiMenuAlt } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import { showSidebar } from "../features/authSlice";

const MenuIcon = () => {
  const dispatch = useDispatch();
  return (
    <div
      onClick={() => dispatch(showSidebar())}
      className="lg:hidden text-gray-200 bg-blue-600 p-3 shadow-xl rounded-full backdrop-blur-md fixed top-6 right-5 z-[99] cursor-pointer"
    >
      <TfiMenuAlt className="text-xl" />
    </div>
  );
};

export default MenuIcon;
