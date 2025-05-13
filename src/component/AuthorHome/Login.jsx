import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import LoginSvgImg from "./LoginSvg/LoginSvg.svg";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // 🧭 Sahifa yo‘naltirish uchun

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "https://kutubxona-83v1.onrender.com/login",
        {
          email,
          password,
        }
      );

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      onLogin(user);

      setLoading(false);
      navigate("/dashboard"); // ✅ Login muvaffaqiyatli bo‘lsa Dashboard sahifasiga yo‘naltirish
    } catch (err) {
      setLoading(false);
      console.log("Xatolik to‘liq:", err); // 🌐 Asosiy log
      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Ma'lumot:", err.response.data);
      } else if (err.request) {
        console.log("So‘rov yuborildi, javob yo‘q:", err.request);
      } else {
        console.log("Xatolik:", err.message);
      }
      setError("Login xatoligi");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="mt-5 w-[450px] h-[550px] shadow-lg  bg-brandRed">
        <img
          className="w-[500px] h-[500px] pt-[100px]"
          src={LoginSvgImg}
          alt=""
        />
      </div>

      <div className="mt-5 w-[450px] h-[550px] shadow-lg p-8 ">
        <div className="text-center justify-center items-center">
          <div className="flex items-center">
            <form
              onSubmit={handleLogin}
              className="mt-25 flex-col justify-center items-center gap-6 w-full"
            >
              <h2 className="text-[36px] font-extrabold mb-4">Sign in</h2>
              {/* Sign in link */}
              <p>
                Do not you have an account?
                <Link to="/" className="text-blue-600 pl-2 hover:underline">
                  Sign up
                </Link>
              </p>
              <label className="items-center text-center block ">
                <span className="">Email:</span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[70%] border mt-4 ml-2 px-3 py-2 rounded"
                  required
                />
              </label>

              <label>
                <span>Parol:</span>
                <input
                  type="password"
                  placeholder="Parol"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[70%] mt-5 ml-2 border px-3 py-2 rounded"
                  required
                />
              </label>
              <button
                type="submit"
                className="w-[70%] bg-blue-950 ml-10 mt-10 text-white py-2 rounded hover:bg-blue-800"
                disabled={loading}
              >
                {loading ? "Kirishda..." : "Kirish"}
              </button>
            </form>
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
