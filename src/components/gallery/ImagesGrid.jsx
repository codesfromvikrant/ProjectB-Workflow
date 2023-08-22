import React from "react";
import { useSelector } from "react-redux";
import { nanoid } from "nanoid";

const ImagesGrid = () => {
  const images = useSelector((state) => state.gallery.images);

  const renderImages = images.map((image) => {
    const style = {
      background: `url(${image})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
    return (
      <div
        key={nanoid()}
        style={style}
        className="h-[18rem] rounded-md shadow-md w-full"
      ></div>
    );
  });

  return <div className="grid grid-cols-5 gap-5 my-5">{renderImages}</div>;
};

export default ImagesGrid;
