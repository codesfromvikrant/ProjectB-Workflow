import React from "react";
import { TiTick } from "react-icons/ti";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const TickBox = ({ todoStatus, todoID }) => {
  return (
    <div className="w-4 h-4 bg-glassyblue border-2 border-blue-600 rounded mt-1 flex justify-center items-center">
      {todoStatus === "completed" ? <TiTick /> : null}
    </div>
  );
};

export default TickBox;
