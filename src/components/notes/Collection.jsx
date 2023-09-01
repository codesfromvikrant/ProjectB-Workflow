import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import Menu from "../Menu";

const Collection = () => {
  const all_notes = useSelector((state) => state.notes.all_notes);
  const filtered_notes = useSelector((state) => state.notes.filtered_notes);
  const tags_selected = useSelector((state) => state.notes.tags_selected);

  const tagsSelectedList = tags_selected.map((tag) => {
    return (
      <div
        key={tag}
        className="bg-glassyblue border-2 border-blue-600 text-gray-200 tracking-wide px-2 py-1 rounded font-semibold text-xs "
      >
        {tag}
      </div>
    );
  });

  const notes =
    filtered_notes &&
    filtered_notes.map((obj) => {
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
            <div className="text-[0.7rem] leading-4 mb-1 text-slate-400">
              <p className="">Last Updated On :</p>
              <p className="font-semibold">{obj.last_update}</p>
            </div>
            <Link to={`./${obj.id}`}>
              <p className="font-medium leading-5 text-base hover:text-blue-700 transition-all">
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
    <div className="my-5">
      {tags_selected.length > 0 && (
        <div className="flex justify-start items-center gap-2 mb-4">
          <span className="text-gray-200 font-medium">Filtered By : </span>
          {tagsSelectedList}
          <button className="bg-glassyred border-2 border-red-600 text-gray-200 text-xs tracking-wide px-2 py-1 rounded font-semibold">
            Close All
          </button>
        </div>
      )}

      <div className="grid grid-cols-5 gap-3">{notes}</div>
    </div>
  );
};

export default Collection;
