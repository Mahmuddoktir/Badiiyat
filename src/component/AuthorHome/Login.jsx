import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Tizimga kirish</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Kirishda..." : "Kirish"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Login;
