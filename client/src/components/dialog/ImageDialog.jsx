import React from "react";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { MdCloudDownload } from "react-icons/md";

const ImageDialog = ({ publicID }) => {
  return (
    <div
      id={`dialog-${publicID}`}
      className="hidden bg-bgblack backdrop-blur-md p-2 min-w-[10rem] rounded-md shadow-md z-50 absolute top-12 -right-32"
    >
      <ul className="text-gray-200 tracking-wide">
        <li className="hover:text-blue-700 my-2 flex justify-start items-center gap-2">
          <MdModeEdit />
          <button className="text-sm font-semibold tracking-wide">
            Rename
          </button>
        </li>
        <li
          onClick={deleteImage}
          className="hover:text-blue-700 my-2 flex justify-start items-center gap-2"
        >
          <FaTrash className="text-sm" />
          <button className="text-sm font-semibold tracking-wide">
            Delete
          </button>
        </li>
        <li className="hover:text-blue-700 my-2 flex justify-start items-center gap-2">
          <MdCloudDownload />
          <button className="text-sm font-semibold tracking-wide">
            Download
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ImageDialog;
