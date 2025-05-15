import React, { useState } from "react";
import axios from "axios";

const AddAuthor = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBrith: "",
    dateOfDeath: "",
    country: "",
    bio: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    // Majburiy maydonlarni tekshirish
    if (!formData.fullName.trim()) {
      setMessage({
        text: "❌ Iltimos, adibning to'liq ismini kiriting!",
        type: "error",
      });
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setMessage({
        text: "⚠️ Siz Admin Emassiz. Faqat adminlar adib qo'sha oladi.",
        type: "warning",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Ma'lumotlarni serverga yuborishdan oldin tozalash
      const cleanedData = {
        fullName: formData.fullName.trim(),
        dateOfBrith: formData.dateOfBrith || null,
        dateOfDeath: formData.dateOfDeath || null,
        country: formData.country.trim(),
        bio: formData.bio.trim(),
      };

      const response = await axios.post(
        "https://kutubxona-83v1.onrender.com/add_auth",
        cleanedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          timeout: 10000, // 10 soniya timeout
        }
      );

      // Server javobini tekshirish
      if (response.data && (response.data.success || response.data.id)) {
        setMessage({
          text: "✅ Adib muvaffaqiyatli qo'shildi!",
          type: "success",
        });

        // Formani tozalash
        setFormData({
          fullName: "",
          dateOfBrith: "",
          dateOfDeath: "",
          country: "",
          bio: "",
        });
      } else {
        throw new Error("Adib qo'shish muvaffaqiyatsiz yakunlandi");
      }
    } catch (err) {
      console.error("Xatolik:", err);

      let errorMessage = "Noma'lum xatolik yuz berdi";

      if (err.response) {
        // Serverdan kelgan xato xabari
        if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        } else if (err.response.status === 401) {
          errorMessage =
            "Kirish rad etildi. Token yaroqsiz yoki muddati o'tgan";
        } else if (err.response.status === 400) {
          errorMessage = "Noto'g'ri so'rov formati";
        } else if (err.response.status === 500) {
          errorMessage = "Serverda ichki xatolik";
        }
      } else if (err.message.includes("timeout")) {
        errorMessage = "Serverga ulanish vaqti tugadi";
      } else if (err.message) {
        errorMessage = err.message;
      }

      setMessage({
        text: `❌ ${errorMessage}`,
        type: "error",
      });

      // Agar token yaroqsiz bo'lsa
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        setMessage({
          text: "⚠️ Adib Qo'shishda token kelmayapti",
          type: "warning",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md mt-10">
      <h2 className="text-2xl font-semibold mb-4">Adib qo'shish</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="fullName"
          placeholder="To'liq ismi *"
          value={formData.fullName}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <div>
          <label className="block text-sm mb-1">Tug'ilgan sanasi</label>
          <input
            type="date"
            name="dateOfBrith"
            value={formData.dateOfBrith}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Vafot sanasi</label>
          <input
            type="date"
            name="dateOfDeath"
            value={formData.dateOfDeath}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <input
          type="text"
          name="country"
          placeholder="Davlat *"
          value={formData.country}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <textarea
          name="bio"
          placeholder="Biografiyasi"
          value={formData.bio}
          onChange={handleChange}
          className="border p-2 rounded"
          rows="4"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Yuborilmoqda..." : "Qo'shish"}
        </button>
      </form>
      {message.text && (
        <p
          className={`mt-4 text-center font-semibold ${
            message.type === "error"
              ? "text-red-600"
              : message.type === "warning"
              ? "text-yellow-600"
              : "text-green-600"
          }`}
        >
          {message.text}
        </p>
      )}
    </div>
  );
};

export default AddAuthor;
