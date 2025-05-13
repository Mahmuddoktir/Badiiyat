import { useEffect, useState } from "react";
import axios from "axios";
import AddBook from "./AuthorHome/AddBook";
import AddAuthor from "./AuthorHome/AddAuthor";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // tashqarida yozilgan fetchBooks
  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        "https://kutubxona-83v1.onrender.com/get_books"
      );
      setBooks(res.data);
    } catch (err) {
      console.error(err);
      setError("Kitoblarni olishda xatolik yuz berdi.");
    }
  };

  // tashqarida yozilgan fetchAuthors
  const fetchAuthors = async () => {
    try {
      const res = await axios.get(
        "https://kutubxona-83v1.onrender.com/get_auth"
      );
      setAuthors(res.data); // Bu yerda yangi mualliflar ro'yxatini o'rnatamiz
    } catch (err) {
      console.error(err);
      setError("Mualliflarni olishda xatolik yuz berdi.");
    }
  };

  useEffect(() => {
    fetchBooks(); // Kitoblarni birinchi marta yuklash
    fetchAuthors(); // Mualliflarni birinchi marta yuklash
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Kitob qo‘shish komponenti */}
      <AddBook onBookAdded={fetchBooks} />

      {/* Muallif qo‘shish komponenti */}
      <AddAuthor isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-800 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Add Author
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="space-y-4 mt-4">
        <h1 className="text-3xl font-bold mb-6">Asosiy kategoriyalar</h1>
        {books.map((book) => (
          <div
            key={book._id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold">Kitob Nomi: {book.title}</h2>
            <p className="text-gray-600 mb-1">Sahifalar soni: {book.pages}</p>
            <p className="text-gray-600 mb-1">Yil: {book.year}</p>
            <p className="text-gray-600 mb-1">
              Narxi: {book.price.toLocaleString()} so‘m
            </p>
            <p className="text-gray-600 mb-1">Mamlakat: {book.country}</p>
            <p className="text-gray-600 mb-1">
              Muallif: {book.author?.fullName || book.author || "Noma'lum"}
            </p>
            <p className="mt-2">{book.description}</p>
          </div>
        ))}

        <h1 className="text-[36px] font-bold">Mualliflar</h1>
        {authors.map((author) => (
          <div
            key={author._id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <p>{author.id}</p>
            <h2 className="text-xl font-semibold">
              Muallif Nomi: {author.fullName}
            </h2>
            <p className="text-gray-600 mb-1">
              Tug‘ilgan sana: {author.dateOfBrith}
            </p>
            <p className="text-gray-600 mb-1">
              Vafot etgan sana: {author.dateOfDeath}
            </p>
            <p className="text-gray-600 mb-1">Mamlakat: {author.country}</p>
            <p className="text-gray-600 mb-1">Bio: {author.bio}</p>
            <p className="text-gray-600 mb-1">
              Yaratilgan sana: {author.createdAt}
            </p>
            <p className="text-gray-600 mb-1">
              Yangilangan sana: {author.updatedAt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
