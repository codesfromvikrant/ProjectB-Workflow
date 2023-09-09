import React, { useState, useEffect } from "react";
import Logo from "../assets/icons/workflow.png";
import { BsGithub } from "react-icons/bs";
import { AiOutlineGoogle } from "react-icons/ai";
import { useOutletContext } from "react-router";
import LoginforTest from "../components/LoginforTest";

export default function Home() {
  const [googleAuth, gitAuth, emailAuth] = useOutletContext();

  const style = {
    background: "linear-gradient(45deg, #19181b 40%, #101011 60%)",
  };

  return (
    <main style={style}>
      <section className="flex justify-between items-center lg:flex-row flex-col gap-10 max-w-6xl mx-auto px-4 py-16">
        <div className="sm:w-2/3 w-full">
          <div className="flex justify-start items-center gap-2 mx-auto mb-4">
            <img src={Logo} className="w-12" alt="mediaharbor-logo" />
            <p className="text-xl font-black text-center uppercase w-max text-slate-300">
              WorkFlow
            </p>
          </div>

          <h1 className="md:text-4xl text-3xl text-start tracking-wide text-gray-200 mb-3 font-black">
            Empower Your Teams with Workflow Excellence. Navigate Projects,
            Notes, and Galleries Effortlessly.
          </h1>
          <p className="text-base font-light text-start text-gray-400">
            In the world of project management, simplicity is key. Workflow
            provides a seamless and effortless experience for navigating through
            projects, taking notes, and curating image galleries. Whether you're
            a seasoned pro or new to project management, our user-friendly
            interface ensures that you can easily access, organize, and find
            what you need, when you need it. Effortless navigation, at your
            fingertips.
          </p>
        </div>

        <div className="lg:w-1/3 md:w-1/2 sm:w-2/3 w-full flex justify-center items-center gap-2  flex-col">
          <LoginforTest emailAuth={emailAuth} />
          <p className="text-gray-200 text-4xl font-extrabold text-center">
            or
          </p>
          <button
            onClick={(e) => {
              e.preventDefault();
              googleAuth();
            }}
            className="flex justify-center items-center gap-3 w-full bg-glassyblue border-2 border-blue-600 text-white shadow p-3 rounded-md font-semibold"
          >
            <span>SignIn via </span>
            <AiOutlineGoogle className="w-max text-3xl" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              gitAuth();
            }}
            className="flex justify-center items-center gap-3 w-full bg-gray-200 text-slate-800 shadow p-3 rounded-md"
          >
            <span className="font-black">SignIn via</span>
            <BsGithub className="w-max text-3xl" />
          </button>
        </div>
      </section>
    </main>
  );
}
