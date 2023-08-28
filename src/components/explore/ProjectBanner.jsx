import React from "react";
import Image from "../../assets/images/project_management.png";

const ProjectBanner = () => {
  const style = {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const gradient = {
    background: "linear-gradient(45deg, #2564ebab 40%, #bfdbfe38 100%)",
  };
  return (
    <div style={style} className="w-full h-[20rem] rounded-md shadow-md my-8">
      <div
        style={gradient}
        className="w-full h-full rounded-md flex justify-start items-center px-8"
      >
        <div className="text-white flex justify-start items-start flex-col text-2xl font-bold w-1/2">
          <span className="font-black tracking-wide">
            Task Mastery, Perfected
          </span>
          <span className="text-sm font-light">
            Elevate task management to an art form. With our app, you'll
            navigate tasks with precision, orchestrate deadlines effortlessly,
            and achieve unparalleled efficiency in project execution.
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProjectBanner;
