import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import BgSvgImg from "./AddSvg/BgSvg.svg";

const AddUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    uuidv4: uuidv4(),
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: user.username,
      email: user.email,
      password: user.password,
    };

    try {
      const response = await axios.post(
        "https://kutubxona-83v1.onrender.com/register",
        userData
      );

      console.log("User registered successfully:", response.data);

      const token = response.data.token;

      if (token) {
        // Token bor bo‘lsa, localStorage'ga yozib, dashboardga yo‘naltiramiz
        localStorage.setItem("token", token);
        console.log("Token saved:", token);
        alert("User registered and verified!");
        navigate("/dashboard");
      } else {
        // Token bo‘lmasa, verify sahifasiga email bilan uzatamiz
        alert("User registered! Please verify your email.");
        navigate("/verify", { state: { email: user.email } });
      }

      // Formani tozalaymiz
      setUser({
        uuidv4: uuidv4(), // yangi UUID generatsiya qilamiz
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
      alert(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="mt-5 w-[450px] h-[550px] shadow-lg  bg-brandRed">
        <img className="w-[500px] h-[500px] pt-[100px]" src={BgSvgImg} alt="" />
      </div>
      <div className="mt-5 w-[450px] h-[550px] shadow-lg p-8 ">
        <div className="text-center justify-center items-center">
          <div className="flex items-center">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center gap-6 w-full"
            >
              <h2 className="text-4xl font-extrabold mb-4">Sign up</h2>
              {/* Sign in link */}
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:underline">
                  Sign in
                </Link>
              </p>
              <label>
                <span>Name:</span>
                <input
                  value={user.username}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, username: e.target.value }))
                  }
                  type="text"
                  required
                  placeholder="User name"
                  className="pl-5 ml-2 w-[330px] h-[48px] rounded-md border border-gray-400"
                />
              </label>

              <label>
                <span>Email:</span>
                <input
                  value={user.email}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, email: e.target.value }))
                  }
                  type="email"
                  required
                  placeholder="Email"
                  className="pl-5 ml-2 w-[330px] h-[48px] rounded-md border border-gray-400"
                />
              </label>

              <label>
                <span>Parol:</span>
                <input
                  value={user.password}
                  onChange={(e) =>
                    setUser((prev) => ({ ...prev, password: e.target.value }))
                  }
                  type="password"
                  required
                  placeholder="Password"
                  className="pl-5 ml-2 w-[330px] h-[48px] rounded-md border border-gray-400"
                />
              </label>

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="w-[328px] h-[46px] font-bold rounded-md bg-blue-950 hover:bg-green-900 text-white"
                >
                  Next step
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
