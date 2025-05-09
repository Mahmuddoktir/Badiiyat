import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyCode = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://kutubxona-83v1.onrender.com/verify",
        {
          email,
          code,
        }
      );

      const { token } = response.data;
      console.log("TOKEN:", token);

      if (token) {
        localStorage.setItem("token", token);
        alert("Account verified successfully!");
        navigate("/dashboard"); // yoki kerakli sahifaga o'tkaz
      } else {
        alert("Verification failed: token not received");
      }
    } catch (error) {
      console.error("Verification error:", error);
      alert(
        error?.response?.data?.message || "Verification failed. Try again!"
      );
    }
  };

  return (
    <div className="ml-120 mt-5 w-[450px] h-[400px] shadow-lg p-6">
      <form
        onSubmit={handleVerify}
        className="flex flex-col justify-center items-center gap-6"
      >
        <h2 className="text-3xl font-bold mb-4">Verify Email</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          className="w-[330px] h-[48px] pl-5 rounded-md border border-gray-400"
        />

        <input
          type="text"
          placeholder="Enter verification code"
          value={code}
          required
          onChange={(e) => setCode(e.target.value)}
          className="w-[330px] h-[48px] pl-5 rounded-md border border-gray-400"
        />

        <button
          type="submit"
          className="w-[328px] h-[46px] rounded-md bg-green-600 hover:bg-green-500 text-white"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyCode;
