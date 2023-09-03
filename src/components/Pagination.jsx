import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalComp, notesPerPage }) => {
  console.log(totalComp);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const paginate = (key, value) => {
    setSearchParams((prevParam) => {
      prevParam.set(key, value);
      return prevParam;
    });
  };

  const totalPages = Math.ceil(totalComp / notesPerPage) || 1;
  const btnCount = 4;

  useEffect(() => {
    if (totalPages <= btnCount) {
      setEnd(totalPages);
    } else {
      setEnd(page + btnCount - 1);
    }
  }, [totalPages]);

  const btnArr = [];
  for (let i = start; i <= end; i++) {
    btnArr.push(i);
  }
  const btnList = btnArr.map((btn) => {
    return (
      <button
        key={btn}
        className={`${
          btn === page
            ? "bg-glassyblue border-2 border-blue-600"
            : "bg-secondary"
        } text-gray-200 px-4 py-2 rounded shadow text-sm font-medium`}
        onClick={() => paginate("page", btn)}
      >
        {btn}
      </button>
    );
  });

  const prev = () => {
    if (start == 1) {
      setStart(totalPages - btnCount + 1);
      setEnd(totalPages);
    } else if (start - btnCount <= 0) {
      setStart(1);
      setEnd(btnCount);
    } else {
      setStart(start - btnCount);
      setEnd(end - btnCount);
    }
  };

  const next = () => {
    if (end === totalPages) {
      setStart(1);
      setEnd(btnCount);
    } else if (end + btnCount > totalPages) {
      setStart(totalPages - btnCount + 1);
      setEnd(totalPages);
    } else {
      setStart(start + btnCount);
      setEnd(end + btnCount);
    }
  };

  return (
    <div className="w-max flex justify-center items-center">
      <div className="flex justify-center items-center gap-2 text-sm">
        <button
          disabled={totalPages > btnCount ? false : true}
          onClick={prev}
          className={`${
            totalPages > btnCount
              ? "opacity-100 hover:bg-blue-600 cursor-pointer"
              : "opacity-20"
          } text-gray-200 bg-secondary transition-all duration-400 rounded shadow font-medium py-2 px-4`}
        >
          Prev
        </button>
        {btnList}
        <button
          disabled={totalPages > btnCount ? false : true}
          onClick={next}
          className={`${
            totalPages > btnCount
              ? "opacity-100 hover:bg-blue-600 cursor-pointer"
              : "opacity-20"
          } text-gray-200 bg-secondary  transition-all duration-400 rounded shadow font-medium py-2 px-4`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
