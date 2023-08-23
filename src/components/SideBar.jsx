import React from "react";
import Logo from "../assets/cloud_logo.png";
import UserIntro from "./UserIntro";
import { Link } from "react-router-dom";
import { GrGallery } from "react-icons/gr";
import { AiFillSetting } from "react-icons/ai";
import { BiSolidLogInCircle } from "react-icons/bi";
import { IoDocumentSharp } from "react-icons/io5";
import { FaTasks } from "react-icons/fa";
import { BiSolidHelpCircle } from "react-icons/bi";
import { SiCompilerexplorer } from "react-icons/si";

const SideBar = () => {
  return (
    <div className="flex justify-between items-start flex-col w-[15rem] h-[100vh] overflow-y-auto bg-secondary px-4 py-8">
      <div className="flex justify-start items-start gap-6 flex-col">
        <div className="flex justify-center items-center gap-2 mx-auto">
          <img src={Logo} className="w-12" alt="mediaharbor-logo" />
          <p className="text-lg tracking-wider font-bold text-center w-max text-gray-200">
            MediaHarbor
          </p>
        </div>
        <nav className="w-full">
          <ul className="w-full">
            <li className="flex justify-start items-center gap-2 text-gray-400 hover:text-gray-200 transition-all duration-500 py-2 w-full rounded-lg hover:px-2  hover:bg-blue-600 cursor-pointer">
              <SiCompilerexplorer className="text-xl text-gray-200" />
              <p>Explore</p>
            </li>
            <Link to="/userdash/notes">
              <li className="flex justify-start items-center gap-2 text-gray-400 hover:text-gray-200 transition-all duration-500 py-2 w-full rounded-lg hover:px-2  hover:bg-blue-600 cursor-pointer">
                <IoDocumentSharp className="text-xl text-gray-200" />
                <p>Notes & Docs</p>
              </li>
            </Link>
            <li className="flex justify-start items-center gap-2 text-gray-400 hover:text-gray-200 transition-all duration-500 py-2 w-full rounded-lg hover:px-2  hover:bg-blue-600 cursor-pointer">
              <FaTasks className="text-xl text-gray-200" />
              <p>Manage Tasks</p>
            </li>
            <li className="flex justify-start items-center gap-2 text-gray-400 hover:text-gray-200 transition-all duration-500 py-2 w-full rounded-lg  hover:px-2  hover:bg-blue-600 cursor-pointer">
              <GrGallery className="text-xl bg-gray-200" />
              <p>My Gallery</p>
            </li>
            <li className="flex justify-start items-center gap-2 text-gray-400 hover:text-gray-200 transition-all duration-500 py-2 w-full rounded-lg hover:px-2  hover:bg-blue-600 cursor-pointer">
              <AiFillSetting className="text-xl text-gray-200" />
              <p>Settings</p>
            </li>
            <li className="flex justify-start items-center gap-2 text-gray-400 hover:text-gray-200 transition-all duration-500 py-2 w-full rounded-lg hover:px-2  hover:bg-blue-600 cursor-pointer">
              <BiSolidHelpCircle className="text-xl text-gray-200" />
              <p>Need Help</p>
            </li>
            <li className="flex justify-start items-center gap-2 text-gray-400 hover:text-gray-200 transition-all duration-500 py-2 w-full rounded-lg hover:px-2  hover:bg-blue-600 cursor-pointer">
              <BiSolidLogInCircle className="text-2xl text-gray-200" />
              <a href="#">LogOut</a>
            </li>
          </ul>
        </nav>

        <div className="text-gray-300 w-full">
          <p className="text-xs font-extralight">Developed By</p>
          <div className="flex justify-between items-center w-full">
            <p className="text-sm font-medium"> Vikrant Kumar</p>
            <div className="flex justify-start items-center gap-3">
              <i
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/in/vikrant-kumar-1b1b3b1b5/"
                  );
                }}
                className="fa-brands fa-linkedin cursor-pointer"
              ></i>
              <i
                onClick={() => {
                  window.open("https://github.com/codesfromvikrant");
                }}
                className="fa-brands fa-github cursor-pointer"
              ></i>
            </div>
          </div>
        </div>
      </div>

      <UserIntro />
    </div>
  );
};

export default SideBar;
