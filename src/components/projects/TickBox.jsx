import React, { useState } from "react";
import { TiTick } from "react-icons/ti";

const TickBox = () => {
  const [state, setState] = useState(false);
  return (
    <div
      onClick={() => setState(!state)}
      className="w-4 h-4 bg-glassyblue border-2 border-blue-600 rounded mt-1 flex justify-center items-center"
    >
      {state && <TiTick />}
    </div>
  );
};

export default TickBox;
