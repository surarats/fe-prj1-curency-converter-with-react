import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="mx-auto text-white max-sm:w-[350px] w-[1150px]">
      <ul className="flex items-center justify-evenly h-[80px] mt-10 mx-auto ">
        <Link
          to={"/"}
          className="w-full h-full"
          onClick={() => setIsActive(false)}
        >
          <li
            className={`flex items-center justify-center ${
              !isActive ? "bg-blue-400" : "bg-blue-600"
            } hover:bg-blue-500 flex-1 text-3xl max-sm:text-lg text-white font-bold cursor-pointer text-center h-full rounded-tl-lg max-sm:p-4`}
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
            } hover:bg-blue-500 flex-1 text-3xl max-sm:text-lg text-white font-bold cursor-pointer text-center h-full rounded-tr-lg max-sm:p-4`}
          >
            EXCHANGE RATES
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Nav;
