import React, { useState } from "react";

const LoginforTest = ({ emailAuth }) => {
  const [value, setValue] = useState({
    email: "tester@gmail.com",
    password: "tester123",
  });

  const signIn = (e) => {
    e.preventDefault();
    emailAuth(value.email, value.password);
  };
  return (
    <div className="w-full p-4 rounded-md bg-secondary">
      <div className="">
        <p className="text-2xl font-bold mb-2 text-gray-200">
          LogIn For Testing Purpose!
        </p>
        <p className="text-slate-400 text-sm">
          As this project is mainly to showcase my work to employers so I have
          open this common account for all of them to know each features &
          functionalities better than new user account.
        </p>
        <p className="text-gray-200 text-sm font-medium">
          Please Don't Delete any content or write anything irrrelevent of
          subject in it!
        </p>
      </div>
      <div className="w-full mt-4 flex justify-start items-start gap-3 flex-col">
        <input
          value={value.email}
          name="email"
          onChange={(e) => setValue({ ...value, email: e.target.value })}
          type="text"
          className="w-full p-3 bg-bgblack rounded text-gray-200"
          placeholder="Enter Email ID"
        />
        <input
          value={value.password}
          name="password"
          onChange={(e) => setValue({ ...value, password: e.target.value })}
          type="password"
          className="w-full p-3 bg-bgblack rounded text-gray-200"
          placeholder="Enter Password"
        />
        <button
          onClick={signIn}
          className="p-3 mt-6 font-medium text-gray-200 bg-blue-700 rounded w-full"
        >
          Login As Tester
        </button>
      </div>
    </div>
  );
};

export default LoginforTest;
