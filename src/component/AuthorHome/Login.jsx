import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email.trim() || !password.trim()) {
      setError("Iltimos, email va parolni kiriting!");
      return;
    }

    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Iltimos, to'g'ri email formatini kiriting!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://kutubxona-83v1.onrender.com/login",
        {
          email: email.trim(),
          password: password.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          timeout: 8000,
        }
      );

      if (response.data && response.data.token) {
        // Save token and user data
        localStorage.setItem("token", response.data.token);

        // Check if user data exists
        if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }

        // Notify parent component if callback exists
        if (onLogin) {
          onLogin(response.data.user || { email });
        }

        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        throw new Error("Serverdan token qaytmadi");
      }
    } catch (error) {
      let errorMessage = "Tizimga kirishda xatolik yuz berdi";

      if (error.response) {
        // Server responded with error status
        if (error.response.status === 401) {
          errorMessage = "Email yoki parol noto'g'ri";
        } else if (error.response.status === 400) {
          errorMessage = "Noto'g'ri so'rov formati";
        } else if (error.response.status === 500) {
          errorMessage =
            "Serverda ichki xatolik. Iltimos, keyinroq urinib ko'ring.";
        } else if (error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.request) {
        // Request was made but no response received
        errorMessage =
          "Serverga ulanib bo'lmadi. Internet aloqasini tekshiring.";
      } else if (error.message.includes("timeout")) {
        errorMessage = "Ulanish vaqti tugadi. Iltimos, qayta urinib ko'ring.";
      }

      setError(errorMessage);

      // Clear any existing tokens on error
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Tizimga kirish</h2>

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleLogin} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Parol:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={loading ? styles.buttonDisabled : styles.button}
        >
          {loading ? "Kirilmoqda..." : "Kirish"}
        </button>
      </form>
    </div>
  );
};

// Basic styles for the component
const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  buttonDisabled: {
    padding: "10px",
    backgroundColor: "#cccccc",
    color: "#666666",
    border: "none",
    borderRadius: "4px",
    cursor: "not-allowed",
    fontSize: "16px",
  },
  error: {
    color: "#dc3545",
    backgroundColor: "#f8d7da",
    padding: "10px",
    borderRadius: "4px",
    marginBottom: "15px",
    border: "1px solid #f5c6cb",
  },
};

export default Login;
