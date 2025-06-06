// icons
import { IoChevronDown } from "react-icons/io5";

// font

const Navbar = () => {
  return (
    <div>
      {/* Navbar */}
      <div className="w-full h-[90px] bg-gray-800 text-white ">
        {/* container */}
        <div className="flex justify-between items-center py-4 px-5 ">
          {/* logo content */}
          <div>
            <p className="uppercase text-brandYellow/70 text-4xl font-bold">
              Badiiyat
            </p>
          </div>
          {/* Nav links */}
          <div className="">
            <ul className="flex justify-between gap-10">
              <li>Bosh Sahifa</li>
              <li className="w-[95px] bg-gray-50 h-1  absolute mt-10 ml-[-5px]"></li>
              <li>Nasr</li>
              <li>Nazm</li>
              <li>Maqolalar</li>
              <li>Forum</li>
            </ul>
          </div>
          {/* logo img */}
          <div className="flex">
            <img className="w-[70px] h-[70px] rounded-full " alt="" />
            <IoChevronDown className="mt-5 text-3xl hover:text-brandBlue cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
