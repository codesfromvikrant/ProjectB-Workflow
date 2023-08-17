import React from "react";
import Logo from "../assets/cloud_logo.png";
import { GrGallery } from "react-icons/gr";
import { AiFillSetting } from "react-icons/ai";
import { BiSolidLogInCircle } from "react-icons/bi";

const SideBar = () => {
  return (
    <div className="w-[15rem] h-[100vh] overflow-y-auto bg-secondary px-4 py-8">
      <div className="flex justify-center items-center gap-2 mx-auto mb-8">
        <img src={Logo} className="w-12" alt="mediaharbor-logo" />
        <p className="text-lg tracking-wider font-bold text-center w-max text-gray-200">
          MediaHarbor
        </p>
      </div>
      <nav>
        <ul className="">
          <li className="flex justify-start items-center gap-2 text-gray-200 p-2 rounded  hover:bg-slate-800 cursor-pointer">
            <GrGallery className="text-xl bg-gray-200" />
            <p>My Gallery</p>
          </li>
          <li className="flex justify-start items-center gap-2 text-gray-200 p-2 rounded  hover:bg-slate-800 cursor-pointer">
            <AiFillSetting className="text-xl text-gray-200" />
            <p>Settings</p>
          </li>
          <li className="flex justify-start items-center gap-2 text-gray-200 p-2 rounded  hover:bg-slate-800 cursor-pointer">
            <BiSolidLogInCircle className="text-2xl text-gray-200" />
            <a href="#">LogOut</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;
