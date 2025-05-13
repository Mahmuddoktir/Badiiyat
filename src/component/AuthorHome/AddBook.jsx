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
    <div className=" bg-white shadow-md rounded mb-8 pb-10 w-[450px] h-[600px]">
      <h2 className="text-xl text-[36px] text-center  font-bold mb-4">
        Add book
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 pl-2 w-[330px] text-center mx-auto "
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border px-7 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
          required
          className="w-full border px-7 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
          className="w-full border px-7 py-2 rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full border px-7 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
          className="w-full border px-7 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full border px-7 py-2 rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border px-7 py-2 rounded"
        />
        <div className="text-center items-center mt-2 pt-4">
          <button
            type="submit"
            className="bg-blue-950  text-white font-bold cursor-pointer  w-full py-2 rounded-lg hover:bg-green-700"
          >
            Create
          </button>
        </div>
        {message && <p className="text-sm text-center">{message}</p>}
      </form>
    </div>
  );
};

export default AddBook;
