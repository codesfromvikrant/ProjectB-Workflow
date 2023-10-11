import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGallery } from "../../features/gallerySlice";
import axios from "axios";

const option = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const ImagesGrid = () => {
  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.uid);
  const images = useSelector((state) => state.gallery.images);

  const viewDetails = (id) => {
    const details = document.getElementById(id);
    details.classList.remove("hidden");
  };
  const hideDetails = (id) => {
    const details = document.getElementById(id);
    details.classList.add("hidden");
  };

  const deleteImage = async (publicID) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/gallery/${uid}?publicID=${publicID}`
      );
      console.log(res.status, res.data);
      if (res.status === 200) {
        dispatch(setGallery(res.data.result.images));
      }
    } catch (err) {}
  };

  const renderImages = images.map((obj) => {
    const style = {
      background: `url(${obj.secure_url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
    const sizeInKB = obj.bytes / 1024;
    const date = new Date(obj.created_at);
    const formattedDate = date.toLocaleDateString("en-US", option);
    const formattedTime = date.toLocaleTimeString("en-US");

    return (
      <div
        key={obj.public_id}
        onMouseOver={() => {
          viewDetails(`details-${obj.public_id}`);
        }}
        onMouseLeave={() => {
          hideDetails(`details-${obj.public_id}`);
        }}
        style={style}
        className="flex justify-end items-end w-full h-[18rem] relative rounded-md cursor-pointer shadow-blue-900 shadow"
      >
        <div
          id={`details-${obj.public_id}`}
          className="hidden bg-white text-slate-800 tracking-wide transition-all duration-500 backdrop-blur-md w-full p-2 rounded-b-md"
        >
          <p className="text-xs font-extrabold break-words">
            {obj.original_filename}.{obj.format}
          </p>
          <p className="my-1 text-xs font-extrabold break-words">
            File Size : {sizeInKB.toFixed(2)} Kb
          </p>
          <p className="my-1 text-xs font-extrabold break-words">
            Date : {formattedDate}
          </p>
          <p className="my-1 text-xs font-extrabold break-words">
            Time : {formattedTime}
          </p>
          <div className="flex justify-center items-center gap-2 p-2 rounded mt-2 bg-gray-300 shadow transition-all duration-500 hover:bg-blue-700 hover:text-white hover:text-semibold">
            <span className="text-xs font-extrabold tracking-wide">
              View Image
            </span>
          </div>
          <div className="flex justify-center items-center gap-2 text-xs font-extrabold  text-slate-800 mt-2 ">
            <button
              onClick={() => deleteImage(obj.public_id)}
              className="w-full p-2 rounded bg-gray-300 shadow-md transition-all duration-500 hover:bg-blue-700 hover:text-white hover:text-semibold"
            >
              Delete
            </button>
            <button className="w-full p-2 rounded bg-gray-300 shadow-md transition-all duration-500 hover:bg-blue-700 hover:text-white hover:text-semibold">
              Download
            </button>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-1 gap-3 my-8">
      {renderImages}
    </div>
  );
};

export default ImagesGrid;
