import React, { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="mx-auto text-white">
      <ul className="flex items-center justify-evenly h-[80px] mt-10 mx-auto max-sm:w-[350px] w-[1150px] ">
        <Link
          to={"/"}
          className="w-full h-full"
          onClick={() => setIsActive(false)}
        >
          <li
            className={`flex items-center justify-center ${
              !isActive ? "bg-blue-400" : "bg-blue-600"
            } hover:bg-blue-500 flex-1 text-3xl max-sm:text-xl text-white font-bold cursor-pointer text-center h-full rounded-tl-lg`}
          >
            CURRENCY CONVERTER
          </li>
        </Link>
        <Link
          to={"/exchange-rates"}
          className="w-full h-full"
          onClick={() => setIsActive(true)}
        >
          <li
            className={`flex items-center justify-center ${
              isActive ? "bg-blue-400" : "bg-blue-600"
            } hover:bg-blue-500 flex-1 text-3xl max-sm:text-xl text-white font-bold cursor-pointer text-center h-full rounded-tr-lg`}
          >
            EXCHANGE RATES
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Nav;
