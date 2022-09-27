import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./pages/home";
import Login from "./pages/login";
import Patrimonio from "./pages/patrimonio";
import Erro from "./pages/404";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/patrimonio" element={<Patrimonio />} />

        <Route path="*" element={<Erro />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
