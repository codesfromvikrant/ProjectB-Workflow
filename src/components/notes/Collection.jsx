import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import Menu from "./Menu";

const Collection = () => {
  const all_notes = useSelector((state) => state.notes.all_notes);
  const filtered_notes = useSelector((state) => state.notes.filtered_notes);

  const notes = filtered_notes.map((obj) => {
    const title =
      obj.title.length > 65 ? obj.title.slice(0, 65) + " ..." : obj.title;
    return (
      <div
        key={obj.id}
        className="bg-secondary p-4 rounded-md shadow-md relative"
      >
        <div className="cursor-pointer h-[16rem] text-sm bg-transparent text-gray-300 overflow-hidden">
          <Menu />
          {/*<Dropdown id={obj.id} moveToTrash={moveToTrash} notetags={obj.tags} /> */}
          <div className="text-[0.7rem] leading-4 mb-1 text-textcolor">
            <p className="">Last Updated On :</p>
            <p className="font-extrabold">{obj.last_update}</p>
          </div>
          <Link to={`./${obj.id}`}>
            <p className="font-bold text-base hover:text-blue-700 transition-all">
              {title ? title : "Untitled"}
            </p>
          </Link>

          <div className="text-textcolor text-xs mt-3">
            {parse(obj.content)}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="my-8">
      <div className="grid grid-cols-5 gap-3">{notes}</div>
    </div>
  );
};

export default Collection;
