import { useState } from "react";
import axios from "axios";

const ModalAddAuthor = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState("");
  const [dateOfBrith, setDateOfBrith] = useState("");
  const [dateOfDeath, setDateOfDeath] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const [message, setMessage] = useState("");

  // Tokenni shu yerdan olamiz

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // tokenni shu yerda oling

    const payload = {
      fullName,
      dateOfBrith,
      dateOfDeath,
      country,
      bio,
    };

    try {
      const response = await axios.post(
        "https://kutubxona-83v1.onrender.com/add_auth",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // agar kerak bo‘lsa:
          },
        }
      );

      setMessage(`✅ ${response.data.message || "Muallif qo‘shildi!"}`);
      setFullName("");
      setDateOfBrith("");
      setDateOfDeath("");
      setCountry("");
      setBio("");
    } catch (err) {
      console.log(err.response); // qo‘shing
      setMessage(
        `❌ Xatolik yuz berdi: ${
          err.response?.data?.message || err.response?.data || err.message
        }`
      );
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white shadow-xl rounded-lg p-6 w-[480px] max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 text-2xl font-bold hover:text-red-600"
        >
          ×
        </button>
        <h2 className="text-[28px] text-center font-bold mb-4">Add Author</h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 w-[90%] text-center mx-auto"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="date"
            placeholder="Date of birth"
            value={dateOfBrith}
            onChange={(e) => setDateOfBrith(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="date"
            placeholder="Date of death"
            value={dateOfDeath}
            onChange={(e) => setDateOfDeath(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <textarea
            placeholder="Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
            className="w-full border px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-950 text-white font-bold w-full py-2 rounded-lg hover:bg-green-700"
          >
            Create
          </button>
          {message && <p className="text-sm text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ModalAddAuthor;
