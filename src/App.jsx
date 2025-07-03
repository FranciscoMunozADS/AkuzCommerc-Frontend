import "./styles.css";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const { token } = useContext(UserContext);

  return (
    <>
      <div className="grid-container">
        <header id="header"></header>
        <main id="main">
          <Routes>
            {/* Ruta pública */}
            <Route path="/" element={<h1>Pag principal</h1>}/>
            <Route path="*" element={<h1>Página no encontrada</h1>} />
            {/* Ruta Protegida */}
            <Route path="/register" element={token ? <Navigate to="/profile"/> : <Register />} />
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/login" element={<h1>Aqui se inicia sesión</h1>} />
          </Routes>
        </main>
        <footer id="footer"></footer>
      </div>
    </>
  );
}

export default App;
