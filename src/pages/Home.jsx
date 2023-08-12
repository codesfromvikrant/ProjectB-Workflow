import React, { useState } from "react";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";

export default function Home() {
  const [isSignIn, setIsSignIn] = useState(false);

  const changeToSignup = () => {
    setIsSignIn(false);
  };

  const changeToSignin = () => {
    setIsSignIn(true);
  };
  return (
    <main className="">
      <section className="flex justify-between items-center max-w-6xl mx-auto my-24">
        <div className="w-1/2">
          <h1 className="text-3xl text-slate-700 mb-3 font-extrabold">
            Elevate Your Media Experience with MediaHarbor.
          </h1>
          <p className="text-sm text-slate-600">
            Welcome to MediaHarbor – your hub for seamless file management and
            captivating image galleries. Unleash the power of organization,
            creativity, and secure storage. Effortlessly upload, organize, and
            share files while enjoying an immersive visual journey. Discover the
            beauty of your media with MediaHarbor – where memories find their
            haven. Feel free to adjust and fine-tune the wording to fit your
            desired tone and messaging.
          </p>
          <button
            onClick={() => setIsSignIn(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 font-medium shadow"
          >
            Login, If Registered!
          </button>
        </div>
        <div className="w-1/2 px-14">
          {isSignIn ? (
            <SignIn changeToSignup={changeToSignup} />
          ) : (
            <SignUp changeToSignin={changeToSignin} />
          )}
        </div>
      </section>
    </main>
  );
}
