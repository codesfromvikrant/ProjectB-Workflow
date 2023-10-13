import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setGallery,
  setImageURL,
  setViewImage,
} from "../../features/gallerySlice";
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

  const apiBaseURL = import.meta.env.VITE_API_BASE_URL;
  const deleteImage = async (publicID) => {
    try {
      const res = await axios.delete(
        `${apiBaseURL}/api/v1/gallery/${uid}?publicID=${publicID}`
      );
      console.log(res.status, res.data);
      if (res.status === 200) {
        dispatch(setGallery(res.data.result.images));
      }
    } catch (err) {}
  };

  const downloadImage = async (url, filename, format) => {
    try {
      const res = await axios.get(url, { responseType: "blob" });
      const blob = res.data;
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = `${filename}.${format}`;
      link.click();
    } catch (err) {
      console.log(err);
    }
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
          className="hidden bg-secondary text-slate-200 tracking-wide transition-all duration-500 backdrop-blur-md w-full p-2 rounded-b-md"
        >
          <p className="text-xs font-semibold break-words">
            {obj.original_filename}.{obj.format}
          </p>
          <p className="my-1 text-xs font-semibold break-words">
            File Size : {sizeInKB.toFixed(2)} Kb
          </p>
          <p className="my-1 text-xs font-semibold break-words">
            Date : {formattedDate}
          </p>
          <p className="my-1 text-xs font-semibold break-words">
            Time : {formattedTime}
          </p>
          <button
            onClick={() => {
              dispatch(setViewImage(true));
              dispatch(setImageURL(obj.secure_url));
            }}
            className="text-xs w-full font-extrabold tracking-wide p-2 rounded mt-2 bg-primary shadow transition-all duration-500 hover:bg-blue-700 hover:text-white hover:text-semibold"
          >
            View Image
          </button>
          <div className="flex justify-center items-center gap-2 text-xs font-extrabold  text-slate-200 mt-2 ">
            <button
              onClick={() => deleteImage(obj.public_id)}
              className="w-full p-2 rounded bg-primary shadow-md transition-all duration-500 hover:bg-blue-700 hover:text-white hover:text-semibold"
            >
              Delete
            </button>
            <button
              onClick={() =>
                downloadImage(obj.secure_url, obj.original_filename, obj.format)
              }
              className="w-full p-2 rounded bg-primary shadow-md transition-all duration-500 hover:bg-blue-700 hover:text-white hover:text-semibold"
            >
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
