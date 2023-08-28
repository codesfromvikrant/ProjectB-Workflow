import React from "react";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";
import { IoMdCloudDownload } from "react-icons/io";
import { storage } from "../../firebase/config";
import { ref } from "firebase/storage";
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

  const downloadImage = (url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "blob";
    xhr.onload = (event) => {
      const blob = xhr.response;
    };
    xhr.open("GET", url);
    xhr.send();
  };

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
      background: `url(${obj.url})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
    const sizeInKB = obj.size / 1024;
    const date = new Date(obj.timeCreated);
    const formattedDate = date.toLocaleDateString("en-US", option);
    const formattedTime = date.toLocaleTimeString("en-US");
    const httpsReference = ref(storage, obj.url);

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
        className="flex justify-end items-end h-[18rem] relative rounded-md cursor-pointer shadow-md w-full"
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
          className="hidden bg-bgblack transition-all duration-500 backdrop-blur-md w-full p-2 rounded-b-md"
        >
          <p className="text-gray-300 text-xs font-semibold break-words">
            {obj.name}
          </p>
          <p className="text-gray-300 my-1 text-xs font-medium break-words">
            File Size : {sizeInKB.toFixed(2)} Kb
          </p>
          <p className="text-gray-300 my-1 text-xs font-medium break-words">
            Date : {formattedDate}
          </p>
          <p className="text-gray-300 my-1 text-xs font-medium break-words">
            Time : {formattedTime}
          </p>
          <div
            onClick={() => downloadImage(obj.url)}
            className="flex justify-center items-center gap-2 p-2 rounded mt-2 bg-blureffect shadow transition-all duration-500 hover:bg-blue-700"
          >
            <span className="text-gray-300 text-xs font-semibold tracking-wide">
              View Image
            </span>
          </div>
        </div>
      </div>
    );
  });

  return <div className="grid grid-cols-5 gap-3 my-8">{renderImages}</div>;
};

export default ImagesGrid;
