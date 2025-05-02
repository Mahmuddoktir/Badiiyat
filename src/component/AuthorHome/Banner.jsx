// images
import BannerImg from "../../../public/Banner.svg";
import SearchImg from "../../../public/SearchContent.svg";

// icons
import { BiSearchAlt } from "react-icons/bi";

const Banner = () => {
  return (
    <div className="bg-gray-900 pb-30">
      {/* main section */}
      <div className="">
        {/* container */}
        <div className="py-5 px-5">
          <img className="w-full" src={BannerImg} alt="" />
        </div>
      </div>
      {/* search section */}
      <div className="bg-black rounded-md w-[90%] ml-20 mt-[-60px] py-7 px-5 absolute z-10 ">
        {/* content */}
        <div className="ml-[45%]">
          <img
            className="flex justify-center items-center"
            src={SearchImg}
            alt=""
          />
        </div>
        {/* input */}
        <div>
          <input
            className="w-[600px] h-[30px] py-5 ml-80 mt-5 bg-gray-700 text-gray-50 rounded-md pl-5"
            type="text"
            placeholder="Adiblar, kitoblar, audiolar, maqolalar..."
          />
          <div className="bg-brandYellow/80 ml-235 mt-[-40px] py-5 rounded-md  flex text-center items-center w-[160px] h-[30px]">
            <BiSearchAlt className="ml-10 text-xl" />
            <button className="pl-2 text-xl">Izlash</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
