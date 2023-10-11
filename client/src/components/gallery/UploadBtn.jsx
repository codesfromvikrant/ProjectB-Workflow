import React, { useState, useRef } from "react";
import { BiSolidCloudUpload } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { addToGallery } from "../../features/gallerySlice";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import axios from "axios";

const UploadBtn = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const uid = useSelector((state) => state.auth.uid);
  const browseRef = useRef(null);
  const dispatch = useDispatch();

  const uploadImage = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const formData = new FormData(e.target);
      formData.append("userID", uid);

      const res = await axios.patch(
        "http://localhost:3000/api/v1/gallery/upload",
        formData
      );
      const { result } = res.data;
      dispatch(addToGallery(result));
    } catch (err) {
      console.log(err);
      setErrorMsg(err.message);
    }
  };

  return (
    <form
      onSubmit={uploadImage}
      method="post"
      action="http://localhost:3000/api/v1/gallery/upload"
      encType="multipart/form-data"
    >
      <div className="flex justify-between sm:items-center items-start sm:flex-row flex-col md:w-max w-full gap-3 p-2 rounded-md shadow z-50 bg-secondary ">
        <input
          ref={browseRef}
          type="file"
          accept="image/*"
          name="image"
          className="custom-file-input font-lato cursor-pointer text-sm text-gray-200 rounded-md"
        />
        <button
          type="submit"
          className="flex justify-start items-center sm:w-max w-full gap-2 bg-blue-700 py-[0.4rem] px-6 rounded-md text-white shadow-md cursor-pointer"
        >
          <BiSolidCloudUpload className="text-xl" />
          <span className="text-sm font-lato font-semibold w-max">
            Upload Images
          </span>
        </button>
      </div>
      <p className="text-red-400 text-sm font-medium">{errorMsg}</p>
    </form>
  );
};

export default UploadBtn;
