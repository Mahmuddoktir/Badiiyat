import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 🔑 navigate uchun

const LoginUser = ({ onLogin }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // 🔁 navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://kutubxona-83v1.onrender.com/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        alert("Logged in successfully!");

        if (onLogin) onLogin(user);

        navigate("/dashboard"); // 🔀 Dashboard sahifasiga yo‘naltirish
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error?.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div className="modal-wrapper">
      <div className="text-center justify-center items-center">
        <div className="flex items-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 border bg-gray-50 h-[500px] w-[40%]"
          >
            <label className="text-center mt-5">
              <h2 className="text-2xl font-bold">Login</h2>
              <span className="mt-4">Email:</span>
              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                placeholder="Email"
                className="pl-5 ml-2 w-[330px] h-[48px] rounded-md border border-gray-400"
              />
            </label>

            <label>
              <span>Password:</span>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, password: e.target.value }))
                }
                required
                placeholder="Password"
                className="pl-5 ml-2 w-[330px] h-[48px] rounded-md border border-gray-400"
              />
            </label>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-[328px] h-[46px] rounded-md bg-brandBlue/90 hover:bg-brandBlue/70 text-white"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
