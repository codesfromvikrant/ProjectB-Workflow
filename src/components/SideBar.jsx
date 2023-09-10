import React from "react";
import Logo from "../assets/icons/workflow.png";
import UserIntro from "./UserIntro";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import exploreIcon from "../assets/icons/explore.png";
import projectIcon from "../assets/icons/project_lab.png";
import notesIcon from "../assets/icons/notes.png";
import galleryIcon from "../assets/icons/gallery.png";
import notificationIcon from "../assets/icons/notifications.png";
import settingsIcon from "../assets/icons/settings.png";
import supportIcon from "../assets/icons/support.png";
import logoutIcon from "../assets/icons/log_out.png";
import LinkedinIcon from "../assets/icons/linkedin.png";

const SideBar = () => {
  const sidebar = useSelector((state) => state.auth.show_sidebar);
  return (
    <div
      className={`${
        sidebar ? "lg:flex hidden" : ""
      } "justify-between items-start flex-col min-w-[13rem] h-[100vh] overflow-y-auto projects bg-secondary px-4 py-8 lg:static fixed top-0 left-0 z-[99] shadow-md"`}
    >
      <div className="flex justify-start items-start gap-6 flex-col">
        <div className="flex justify-center items-center gap-2 mx-auto">
          <img src={Logo} className="w-12" alt="mediaharbor-logo" />
          <p className="text-lg tracking-wide uppercase font-black text-center w-max text-gray-200">
            WorkFLow
          </p>
        </div>
        <nav className="w-full">
          <ul className="w-full">
            <NavLink
              to="/user/explore"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#2564eb68" : "",
                  color: isActive ? "#fff" : "",
                  border: isActive ? "2px solid #2563eb" : "",
                  padding: isActive ? "0.5rem" : "",
                  margin: isActive ? "0.3rem 0" : "",
                };
              }}
              className="flex justify-start items-center gap-2 text-slate-400 hover:text-gray-200 transition-all duration-500 py-1 hover:py-2 w-full rounded-lg hover:px-2 hover:bg-blue-600 cursor-pointer"
            >
              <img src={exploreIcon} className="w-7" />
              <p className="font-medium text-base tracking-wide">Explore</p>
            </NavLink>

            <NavLink
              to="/user/projects"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#2564eb68" : "",
                  color: isActive ? "#fff" : "",
                  border: isActive ? "2px solid #2563eb" : "",
                  padding: isActive ? "0.5rem" : "",
                  margin: isActive ? "0.3rem 0" : "",
                };
              }}
              className="flex justify-start items-center gap-2 text-slate-400 hover:text-gray-200 transition-all duration-500 py-1 hover:py-2 w-full rounded-lg hover:px-2 hover:bg-blue-600 cursor-pointer"
            >
              <img src={projectIcon} className="w-7" />
              <p className="font-medium tracking-wide">Projects Lab</p>
            </NavLink>

            <NavLink
              to="/user/notes"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#2564eb68" : "",
                  color: isActive ? "#fff" : "",
                  border: isActive ? "2px solid #2563eb" : "",
                  padding: isActive ? "0.5rem" : "",
                  margin: isActive ? "0.3rem 0" : "",
                };
              }}
              className="flex justify-start items-center gap-2 text-slate-400 hover:text-gray-200 transition-all duration-500 py-1 hover:py-2 w-full rounded-lg hover:px-2 hover:bg-blue-600 cursor-pointer"
            >
              <img src={notesIcon} className="w-7" />
              <p className="font-medium tracking-wide">Notes & Docs</p>
            </NavLink>

            <NavLink
              to="/user/gallery"
              style={({ isActive }) => {
                return {
                  backgroundColor: isActive ? "#2564eb68" : "",
                  color: isActive ? "#fff" : "",
                  border: isActive ? "2px solid #2563eb" : "",
                  padding: isActive ? "0.5rem" : "",
                  margin: isActive ? "0.3rem 0" : "",
                };
              }}
              className="flex justify-start items-center gap-2 text-slate-400 hover:text-gray-200 transition-all duration-500 py-1 hover:py-2 w-full rounded-lg hover:px-2 hover:bg-blue-600 cursor-pointer"
            >
              <img src={galleryIcon} className="w-7" />
              <p className="font-medium tracking-wide">My Gallery</p>
            </NavLink>
            <li className="flex justify-start items-center gap-2 text-slate-400 hover:text-gray-200 transition-all duration-500 py-1 hover:py-2 w-full rounded-lg hover:px-2  hover:bg-blue-600 cursor-pointer">
              <img src={supportIcon} className="w-7" />
              <p className="font-medium tracking-wide">Need Help</p>
            </li>
            <li className="flex justify-start items-center gap-2 text-slate-400 hover:text-gray-200 transition-all duration-500 py-1 hover:py-2 w-full rounded-lg hover:px-2  hover:bg-blue-600 cursor-pointer">
              <img src={logoutIcon} className="w-7" />
              <p className="font-medium tracking-wide">LogOut</p>
            </li>
          </ul>
        </nav>

        <div className="text-gray-300 w-full">
          <p className="text-xs font-extralight">Developed By</p>
          <div className="flex justify-between items-center w-full">
            <p className="text-sm font-medium"> Vikrant Kumar</p>
            <div className="flex justify-start items-center gap-3">
              {/* <i className="fa-brands fa-linkedin cursor-pointer"></i> */}
              <img
                onClick={() => {
                  window.open(
                    "https://www.linkedin.com/in/vikrant-kumar-1b1b3b1b5/"
                  );
                }}
                src={LinkedinIcon}
                className="w-7"
              />

              <i
                onClick={() => {
                  window.open("https://github.com/codesfromvikrant");
                }}
                className="fa-brands fa-github text-xl cursor-pointer"
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
