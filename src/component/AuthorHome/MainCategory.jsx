// images
import TopContentImg from "../../../public/TopContent.svg";

const MainCategory = () => {
  return (
    <div className="">
      {/* container */}
      <div className="bg-gray-900">
        {/* top content */}
        <div className="py-5">
          <img className="ml-[40%]" src={TopContentImg} alt="" />
        </div>
        {/* sub content */}
        <div className="ml-[20%] py-5">
          <ul className="flex text-gray-400 font-mono gap-15 tracking-wider text-xl">
            <li>Temuriylar davri </li>
            <li>Jadid Adabiyoti</li>
            <li>Sover davri</li>
            <li>Mustaqillik davri</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainCategory;
