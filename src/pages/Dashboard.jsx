import React from "react";
import SideBar from "../components/SideBar";
import MenuIcon from "../components/MenuIcon";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const sidebar = useSelector((state) => state.auth.show_sidebar);
  return (
    <div className="flex justify-start items-start">
      <MenuIcon />
      {sidebar && <SideBar />}
      <Outlet />
    </div>
  );
};

export default Dashboard;
