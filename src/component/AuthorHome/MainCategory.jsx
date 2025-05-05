// import { useState } from "react";
// import AddUser from "./AddUser";

// const MainCategory = () => {
//   const [users, setUsers] = useState(() => {
//     const storedAuthors = localStorage.getItem("users");
//     return storedAuthors ? JSON.parse(storedAuthors) : [];
//   });

//   const addUser = (user) => {
//     setUsers((prev) => {
//       const updatedUsers = [...prev, user];
//       localStorage.setItem("users", JSON.stringify(updatedUsers));
//       return updatedUsers;
//     });
//   };

//   return (
//     <div>
//       <AddUser addUser={addUser} />
//       <ul className="grid grid-cols-6 gap-4 p-4">
//         {users.map((user, index) => (
//           <li key={index} className="border-2 w-[250px] h-[350px] p-4">
//             <h2 className="font-bold text-lg">User Name: {user.username}</h2>
//             <p>Email: {user.email}</p>
//             <p>Password: {user.password}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MainCategory;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AddUser from "./AddUser";
// import Dashboard from "../Dashboard"; // bu yangi komponent

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<AddUser />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
