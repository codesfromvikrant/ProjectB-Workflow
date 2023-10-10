import React from "react";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import Menu from "../Menu";
import ImageDialog from "../dialog/ImageDialog";

const option = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};
const ImagesGrid = () => {
  const images = useSelector((state) => state.gallery.images);

  const viewDetails = (id) => {
    const details = document.getElementById(id);
    details.classList.remove("hidden");
  };
  const hideDetails = (id) => {
    const details = document.getElementById(id);
    details.classList.add("hidden");
  };
  const showDialog = (id) => {
    const dialog = document.getElementById(id);
    dialog.classList.toggle("hidden");
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

    const nanoId = nanoid();
    return (
      <div
        key={nanoId}
        onMouseOver={() => {
          viewDetails(`details-${nanoId}`);
        }}
        onMouseLeave={() => {
          hideDetails(`details-${nanoId}`);
        }}
        style={style}
        className="flex justify-end items-end w-full h-[18rem] relative rounded-md cursor-pointer shadow-blue-900 shadow"
      >
        <div
          onClick={() => {
            showDialog(`dialog-${nanoId}`);
          }}
          className=""
        >
          <Menu />
        </div>
        <ImageDialog id={nanoId} />
        <div
          id={`details-${nanoId}`}
          className="hidden bg-bgblack tracking-wide transition-all duration-500 backdrop-blur-md w-full p-2 rounded-b-md"
        >
          <p className="text-white text-xs font-semibold break-words">
            {obj.original_filename}
          </p>
          <p className="text-white my-1 text-xs font-medium break-words">
            File Size : {sizeInKB.toFixed(2)} Kb
          </p>
          <p className="text-white my-1 text-xs font-medium break-words">
            Date : {formattedDate}
          </p>
          <p className="text-white my-1 text-xs font-medium break-words">
            Time : {formattedTime}
          </p>
          <div className="flex justify-center items-center gap-2 p-2 rounded mt-2 bg-blureffect shadow transition-all duration-500 hover:bg-blue-700">
            <span className="text-white text-xs font-semibold tracking-wide">
              View Image
            </span>
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
