import { useState } from "react";
import axios from "axios";

const AddBook = ({ onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Tokenni olish
    try {
      const response = await axios.post(
        "https://kutubxona-83v1.onrender.com/add_book",
        {
          title,
          pages: Number(pages),
          year: Number(year),
          price: Number(price),
          country,
          author,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Serverdan javob:", response);
      onBookAdded();
      setMessage("✅ Kitob muvaffaqiyatli qo‘shildi!");
      // Maydonlarni tozalash
      setTitle("");
      setPages("");
      setYear("");
      setPrice("");
      setCountry("");
      setAuthor("");
      setDescription("");
    } catch (err) {
      console.error("Xatolik:", err.response?.data || err.message);
      setMessage("❌ Xatolik yuz berdi. Kitob qo‘shilmadi.");
      console.error(err);
    }
  };

  return (
    <div className="p-4 bg-white shadow rounded mb-6">
      <h2 className="text-xl font-bold mb-4">Kitob qo‘shish</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="number"
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Qo‘shish
        </button>
        {message && <p className="text-sm text-center">{message}</p>}
      </form>
    </div>
  );
};

export default AddBook;
