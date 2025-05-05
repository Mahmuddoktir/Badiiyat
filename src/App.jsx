import { Routes, Route } from "react-router-dom";
import AddUser from "./component/AuthorHome/AddUser";
import Dashboard from "./component/Dashboard"; // bu yangi komponent
import LoginUser from "./component/AuthorHome/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<AddUser />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginUser />} /> 🔧 SHU MUHIM
    </Routes>
  );
}

export default App;
