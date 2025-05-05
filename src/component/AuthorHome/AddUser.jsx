import { useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

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
      username: user.username, // server `username` deb kutyapti
      email: user.email,
      password: user.password,
    };

    try {
      const response = await axios.post(
        "https://kutubxona-83v1.onrender.com/register",
        userData
      );

      console.log("User registered successfully:", response.data);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Token saved:", response.data.token);
      }

      alert("User registered successfully!");
      navigate("/dashboard"); // Successful registration then redirect to Dashboard

      // Formani tozalash
      setUser({
        userName: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Error adding user:", error);
      alert(error?.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="ml-120 mt-5 w-[450px] h-[550px] shadow-lg p-6">
      <div className="text-center justify-center items-center">
        <div className="flex items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-6 w-full"
          >
            <h2 className="text-4xl font-extrabold mb-4">Sign up</h2>
            <p className="text-sm mt-[-20px]"></p>

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
                className="w-[328px] h-[46px] rounded-md bg-blue-600 hover:bg-blue-500 text-white"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
