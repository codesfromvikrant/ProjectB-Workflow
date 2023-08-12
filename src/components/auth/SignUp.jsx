"use client";
import React, { useState, useEffect } from "react";
import Logo from "../../assets/cloud_logo.png";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { googleAuth, authStateChange } from "../../utils/googleAuth";
import { createDoc } from "../../utils/firestoreUtils";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../../features/auth/authSlice";

const SignUp = ({ changeToSignin }) => {
  const init = {
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const [data, setData] = useState(init);
  const [error, setError] = useState(null);
  const [loggedin, setLoggedin] = useState(false);

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirm_password) {
      setError("*Password and Confirm Password must be same!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      setData(init);
      setLoggedin(true);
    } catch (error) {
      console.log(error.code, error.message);
    }
  };

  // useEffect(() => {
  //   const user = authStateChange();
  //   if (user) {
  //     // // createDoc(data, user.uid);
  //     // console.log(user);
  //   }
  // }, [loggedin]);

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
        type="text"
        name="username"
        value={data.username}
        onChange={handleChange}
        id="username"
        placeholder="Username"
        className="p-3 text-sm bg-gray-100 outline-2 outline-blue-200 rounded w-full"
      />
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
      <input
        type="password"
        name="confirm_password"
        id="confirm_password"
        value={data.confirm_password}
        onChange={handleChange}
        placeholder="Confirm Password"
        className="p-3 text-sm bg-gray-100 outline-2 outline-blue-200 rounded w-full"
      />
      {error && <p className="text-xs font-semibold text-red-500">{error}</p>}

      <p className="mt-4 -mb-2 text-slate-400 text-sm">
        <span
          onClick={changeToSignin}
          className="text-blue-500 font-semibold cursor-pointer"
        >
          SignIn!
        </span>{" "}
        If You Have Account.
      </p>
      <button
        onClick={handleSignUp}
        className="bg-blue-500 text-white p-3 w-full rounded font-medium shadow"
      >
        Sign Up
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          googleAuth();
        }}
        className="bg-gray-100 flex justify-center items-center gap-1 text-gray-600 font-semibold p-3 w-full rounded shadow"
      >
        <span>Sign In via </span>
        <FcGoogle className="w-max text-2xl" />
      </button>
    </form>
  );
};

export default SignUp;
