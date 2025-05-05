import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
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

    fetchBooks();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto ">
      <h1 className="text-3xl font-bold mb-6">Asosiy kategoriyalar</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4">
        {books.map((book) => (
          <div
            key={book._id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-xl font-semibold">Kitob Nomi: {book.title}</h2>
            <p className="text-gray-600 mb-1">Sahifalar soni: {book.pages}</p>
            <p className="text-gray-600 mb-1"> Yil: {book.year}</p>
            <p className="text-gray-600 mb-1">
              Narxi: {book.price.toLocaleString()} so‘m
            </p>
            <p className="text-gray-600 mb-1"> Mamlakat: {book.country}</p>
            <p className="text-gray-600 mb-1">
              Muallif: {book.author?.fullName || "Noma'lum"}
            </p>
            <p className="mt-2">{book.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
