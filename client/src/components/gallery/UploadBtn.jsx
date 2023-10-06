import React, { useState, useRef } from "react";
import { BiSolidCloudUpload } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { addToGallery } from "../../features/gallerySlice";
import { storage } from "../../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const UploadBtn = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const dispatch = useDispatch();
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
      getDownloadURL(snapshot.ref).then((url) => {
        dispatch(addToGallery(url));
      });
    });
  };

  return (
    <>
      <div className="flex justify-between sm:items-center items-start sm:flex-row flex-col md:w-max w-full gap-3 p-2 rounded-md shadow z-50 bg-secondary ">
        <input
          ref={browseRef}
          type="file"
          className="custom-file-input font-lato cursor-pointer text-sm text-gray-200 rounded-md"
        />
        <div
          onClick={uploadImage}
          className="flex justify-start items-center sm:w-max w-full gap-2 bg-blue-700 py-[0.4rem] px-6 rounded-md text-white shadow-md cursor-pointer"
        >
          <BiSolidCloudUpload className="text-xl" />
          <span className="text-sm font-lato font-semibold w-max">
            Upload Images
          </span>
        </div>
      </div>
      <p className="text-red-400">{errorMsg}</p>
    </>
  );
};

export default UploadBtn;
