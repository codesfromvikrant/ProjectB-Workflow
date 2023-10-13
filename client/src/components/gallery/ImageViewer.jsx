import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setImageURL, setViewImage } from "../../features/gallerySlice";

const ImageViewer = () => {
  const dispatch = useDispatch();
  const imageURL = useSelector((state) => state.gallery.imageURL);
  return (
    <div className="w-full h-full bg-bgblack backdrop-blur-md fixed top-0 left-0 z-[99]">
      <div className="max-w-4xl my-8 mx-auto">
        <div className="text-gray-200 text-sm tracking-wide flex justify-between items-center">
          <button
            onClick={() => {
              dispatch(setViewImage(false));
              dispatch(setImageURL(""));
            }}
            className="bg-slate-800 tracking-wide rounded py-2 px-4"
          >
            Back
          </button>
          <div className="flex justify-center gap-2">
            <button className="bg-slate-800 tracking-wide rounded py-2 px-4">
              Delete
            </button>
            <button className="bg-blue-600 tracking-wide rounded py-2 px-4">
              Download
            </button>
          </div>
        </div>
        <img src={imageURL} className="mx-auto mt-8 rounded" />
      </div>
    </div>
  );
};

export default ImageViewer;
