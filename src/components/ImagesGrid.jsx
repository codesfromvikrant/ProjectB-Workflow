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
      <div key={nanoid()} className="bg-secondary p-2 rounded-md shadow-lg">
        <div style={style} className="h-[18rem] w-full"></div>
      </div>
    );
  });

  return <div className="grid grid-cols-5 gap-3 my-3">{renderImages}</div>;
};

export default ImagesGrid;
