// images
import TopContentImg from "../../../public/TopContent.svg";
import CardImg1 from "../../assets/Cards/card-1.png";
import CardImg2 from "../../assets/Cards/card-2.png";
import CardImg3 from "../../assets/Cards/card-3.png";
import CardImg4 from "../../assets/Cards/card-4.png";
import CardImg5 from "../../assets/Cards/card-5.png";
import CardImg6 from "../../assets/Cards/card-6.png";
import CardImg7 from "../../assets/Cards/card-7.png";
import CardImg8 from "../../assets/Cards/card-8.png";
import CardImg9 from "../../assets/Cards/card-9.png";
import CardImg10 from "../../assets/Cards/card-10.png";
import CardImg11 from "../../assets/Cards/card-11.png";

// icons
import { FaBookBookmark } from "react-icons/fa6";
import { FaHeadphonesSimple } from "react-icons/fa6";

const Cards = [
  {
    id: 1,
    img: CardImg1,
    title: "Abdulla Avloniy",
    subtile: "1878-1934",
    icon1: <FaBookBookmark />,
    icon2: <FaHeadphonesSimple />,
  },
  {
    id: 2,
    img: CardImg2,
    title: "Nusrat Rahmat",
    subtile: "1878-1934",
    icon1: <FaBookBookmark />,
    icon2: <FaHeadphonesSimple />,
  },
  {
    id: 3,
    img: CardImg3,
    title: "Rahmonberdi Madazimov",
    subtile: "1878-1934",
    icon1: <FaBookBookmark />,
    icon2: <FaHeadphonesSimple />,
  },
  {
    id: 4,
    img: CardImg4,
    title: "Hamza Hakimzoda Niyoziy",
    subtile: "1878-1934",
    icon1: <FaBookBookmark />,
    icon2: <FaHeadphonesSimple />,
  },
  {
    id: 5,
    img: CardImg5,
    title: "Abdulhamid Cho'lpon",
    subtile: "1878-1934",
    icon1: <FaBookBookmark />,
    icon2: <FaHeadphonesSimple />,
  },
  {
    id: 6,
    img: CardImg6,
    title: "Abdurauf Fitrat",
    subtile: "1878-1934",
    icon1: <FaBookBookmark />,
    icon2: <FaHeadphonesSimple />,
  },
  {
    id: 7,
    img: CardImg7,
    title: "Abdulmajid Qodiriy",
    subtile: "1878-1934",
    icon1: <FaBookBookmark />,
    icon2: <FaHeadphonesSimple />,
  },
  {
    id: 8,
    img: CardImg8,
    title: "Munavvarqori Abdurashidxonov",
    subtile: "1878-1934",
    icon1: <FaBookBookmark />,
    icon2: <FaHeadphonesSimple />,
  },
  {
    id: 9,
    img: CardImg9,
    title: "Abdulla Qodiriy",
    subtile: "1878-1934",
    icon1: <FaBookBookmark />,
    icon2: <FaHeadphonesSimple />,
  },
  {
    id: 10,
    img: CardImg10,
    title: "Mahmudxo’ja Behbudiy",
    subtile: "1878-1934",
    icon1: <FaBookBookmark />,
    icon2: <FaHeadphonesSimple />,
  },
  {
    id: 11,
    img: CardImg11,
    title: "Hoji Muin",
    subtile: "1878-1934",
    icon1: <FaBookBookmark />,
    icon2: <FaHeadphonesSimple />,
  },
];

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
            <li className="text-brandYellow/70">Jadid Adabiyoti</li>
            <li>Sovet davri</li>
            <li>Mustaqillik davri</li>
          </ul>
        </div>
        {/* cards */}
        <div className=" grid  sm:grid-cols-2 lg:grid-cols-6 py-15 px-5 gap-10 items-center text-center justify-center">
          {Cards.map((card) => (
            <div className="flex justify-center items-center border-2">
              {/* card img */}
              <div className=" w-45 h-72 py-5 rounded-md">
                <img
                  className="w-50 h-35 rounded-t-lg scale-105 "
                  src={card.img}
                  alt=""
                />
                {/* card title */}
                <div className="text-gray-300 mt-4">
                  <div className="">
                    <p className="text-brandYellow/70">{card.title}</p>
                    <p className="text-gray-400">{card.subtile}</p>
                    {/* card icon */}
                    <div className="flex gap-10 pt-5 justify-center items-center ">
                      <p className="flex items-center hover:text-primary/70 duration-500 cursor-pointer">
                        {card.icon1}
                        <span className="pl-2">34</span>
                      </p>
                      <p className="flex items-center hover:text-primary/70 duration-500 cursor-pointer">
                        {card.icon2}
                        <span className="pl-2">13</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCategory;
