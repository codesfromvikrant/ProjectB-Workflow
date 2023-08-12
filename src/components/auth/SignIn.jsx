"use client";
import React, { useState } from "react";
import Logo from "../../assets/cloud_logo.png";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { googleAuth } from "../../utils/googleAuth";
import { readDoc } from "../../utils/firestoreUtils";

const SignIn = ({ changeToSignup }) => {
  const init = {
    email: "",
    password: "",
  };
  const [data, setData] = useState(init);

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    (async function () {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        const user = userCredential.user;
        console.log(await readDoc(user.uid));
        setData(init);
      } catch (error) {
        console.log(error.code, error.message);
      }
    })();
  };

  return (
    <form
      action=""
      className="flex justify-start items-start gap-4 flex-col w-full bg-white py-8 px-6 rounded shadow-lg"
    >
      <div className="flex justify-center items-center gap-4 mx-auto mb-4">
        <img src={Logo} className="w-20" alt="mediaharbor-logo" />
        <p className="text-2xl font-extrabold text-center w-full text-slate-700">
          MediaHarbor
        </p>
      </div>

      <input
        type="email"
        name="email"
        value={data.email}
        onChange={handleChange}
        id="email"
        placeholder="Email ID"
        className="p-3 text-sm bg-gray-100 outline-2 outline-blue-200 rounded w-full"
      />
      <input
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        id="password"
        placeholder="Password"
        className="p-3 text-sm bg-gray-100 outline-2 outline-blue-200 rounded w-full"
      />

      <p className="mt-4 -mb-2 text-slate-400 text-sm">
        <span
          onClick={changeToSignup}
          className="text-blue-500 font-semibold cursor-pointer"
        >
          SignUp!
        </span>{" "}
        To Create New Account.
      </p>
      <button
        onClick={handleSignIn}
        className="bg-blue-500 text-white p-3 w-full rounded font-medium shadow"
      >
        Sign In
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          googleAuth();
        }}
        className="bg-slate-200 flex justify-center items-center gap-1 text-gray-600 font-semibold p-3 w-full rounded  shadow"
      >
        <span>Sign In via </span>
        <FcGoogle className="w-max text-2xl" />
      </button>
    </form>
  );
};

export default SignIn;
