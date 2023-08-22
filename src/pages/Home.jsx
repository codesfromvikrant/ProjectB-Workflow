import React, { useState, useEffect } from "react";
import Logo from "../assets/cloud_logo.png";
import { BsGithub } from "react-icons/bs";
import { AiOutlineGoogle } from "react-icons/ai";
import { useOutletContext } from "react-router";

export default function Home() {
  const [googleAuth, gitAuth] = useOutletContext();

  return (
    <main className="">
      <section className="flex justify-between items-center max-w-6xl mx-auto my-24">
        <div className="w-2/3 mx-auto">
          <div className="flex justify-center items-center gap-2 mx-auto mb-10">
            <img src={Logo} className="w-12" alt="mediaharbor-logo" />
            <p className="text-xl font-black  text-center w-max text-slate-300">
              MediaHarbor
            </p>
          </div>

          <h1 className="text-4xl text-center tracking-wide text-gray-200 mb-3 font-black">
            Elevate Your Media Experience with MediaHarbor.
          </h1>
          <p className="text-base font-light text-center text-gray-200">
            Welcome to MediaHarbor – your hub for seamless file management and
            captivating image galleries. Unleash the power of organization,
            creativity, and secure storage. Effortlessly upload, organize, and
            share files while enjoying an immersive visual journey. Discover the
            beauty of your media with MediaHarbor – where memories find their
            haven. Feel free to adjust and fine-tune the wording to fit your
            desired tone and messaging.
          </p>

          <div className="flex justify-center items-center gap-2 mt-5 flex-col">
            <button
              onClick={(e) => {
                e.preventDefault();
                googleAuth();
              }}
              className="flex justify-start items-center gap-3 bg-blue-600 text-white shadow-md px-20 py-3 rounded mt-4 font-semibold"
            >
              <span>SignIn via </span>
              <AiOutlineGoogle className="w-max text-3xl" />
            </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                gitAuth();
              }}
              className="flex justify-start items-center gap-3 bg-gray-200 text-slate-800 shadow-md px-20 py-3 rounded  font-bold"
            >
              <span>SignIn via</span>
              <BsGithub className="w-max text-3xl" />
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
