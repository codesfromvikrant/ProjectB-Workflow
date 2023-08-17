import React, { useState, useRef } from "react";
import { BiSolidCloudUpload } from "react-icons/bi";
import { useSelector } from "react-redux";
import { storage } from "../firebase/config";
import { ref, uploadBytes } from "firebase/storage";

const UploadBtn = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const uid = useSelector((state) => state.auth.uid);
  const browseRef = useRef(null);
  const valid_types = ["image/jpeg", "image/png", "image/jpg"];

  const uploadImage = () => {
    setErrorMsg("");
    const image_file = browseRef.current.files[0];
    if (!image_file) {
      setErrorMsg("* Please select an image to upload");
      return;
    }
    const filetype = image_file.type;
    if (!valid_types.includes(filetype)) {
      setErrorMsg("* Upload only an image file (png or jpg or jpeg)");
      return;
    }

    const storageRef = ref(
      storage,
      `user/uid-${uid}/gallery/${image_file.name}`
    );
    uploadBytes(storageRef, image_file).then((snapshot) => {
      console.log("Uploaded a blob or file!", snapshot);
    });
  };

  return (
    <>
      <div className="flex justify-center items-center w-max  gap-3">
        <input
          ref={browseRef}
          type="file"
          className="cursor-pointer bg-secondary text-gray-200 shadow-md p-2 rounded-md"
        />
        <div
          onClick={uploadImage}
          className="flex justify-start items-center w-max gap-2 bg-blue-600 py-3 px-6 rounded-md text-white shadow-md cursor-pointer"
        >
          <BiSolidCloudUpload className="text-2xl" />
          <span>Upload Images</span>
        </div>
      </div>
      <p className="text-red-400">{errorMsg}</p>
    </>
  );
};

export default UploadBtn;
