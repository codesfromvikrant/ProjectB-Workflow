import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="flex justify-start items-start">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default Dashboard;
