import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/home";
import Login from "./pages/login";
import Validar from "./pages/Validar";
import Erro from "./pages/404";
import AdminPage from "./pages/admin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/avaliar" element={<Validar />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<Erro />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
