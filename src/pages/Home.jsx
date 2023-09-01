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
      <section className="flex justify-between items-center gap-12 max-w-6xl mx-auto py-16">
        <div className="w-2/3">
          <div className="flex justify-start items-center gap-2 mx-auto mb-4">
            <img src={Logo} className="w-12" alt="mediaharbor-logo" />
            <p className="text-xl font-black text-center uppercase w-max text-slate-300">
              WorkFlow
            </p>
          </div>

          <h1 className="text-4xl text-start tracking-wide text-gray-200 mb-3 font-black">
            Elevate Your Media Experience with MediaHarbor.
          </h1>
          <p className="text-base font-light text-start text-gray-400">
            Welcome to MediaHarbor – your hub for seamless file management and
            captivating image galleries. Unleash the power of organization,
            creativity, and secure storage. Effortlessly upload, organize, and
            share files while enjoying an immersive visual journey. Discover the
            beauty of your media with MediaHarbor – where memories find their
            haven. Feel free to adjust and fine-tune the wording to fit your
            desired tone and messaging.
          </p>
        </div>

        <div className="w-1/3 flex justify-center items-center gap-2  flex-col">
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
