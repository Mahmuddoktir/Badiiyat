import { Routes, Route } from "react-router-dom";
import AddUser from "./component/AuthorHome/AddUser";
import Dashboard from "./component/Dashboard"; // bu yangi komponent
import Login from "./component/AuthorHome/Login";
import VerifyUser from "./component/AuthorHome/VerifyUser";
import Navbar from "./component/Navbar/Navbar";

function App() {
  const handleLogin = (user) => {
    console.log("Login qilingan foydalanuvchi:", user);
    // user ni global state, context, yoki localStorage'ga yozish mumkin
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<AddUser />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/verify" element={<VerifyUser />} />
      </Routes>
    </>
  );
}

export default App;
