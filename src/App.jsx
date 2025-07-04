import { Route, Routes } from "react-router-dom";
import { ErrorPage, HomePage, ProfilePage } from "./src/pages";
import { Footer, Navbar, ProductPage } from "./src/components";
import "./styles.css";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  const { token } = useContext(UserContext);

  return (
    <>
      <div className="grid-container">


        {/* <Context> */}
        <header id="header">
          <Navbar />
        </header>
        <main id="main">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/categoria/cafe" element={console.log("Cafe Page")} />
            <Route path="/categoria/ajo" element={console.log("Ajo Page")} />
            <Route
              path="/categoria/extra"
              element={console.log("Extra Page")}
            />
            <Route path="/categoria/:categoria/:id" element={<ProductPage />} />
            <Route path="/cart" element={console.log("Cart Page")} />
            {/* Private Routes */}     
            <Route
              path="/profile/history"
              element={console.log("Historial Page")}
            />
            <Route path="/register" element={token ? <Navigate to="/profile"/> : <Register />} />
            <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login"/>}/>
            <Route path="/login" element={<Login/>} />
            <Route
              path="/profile/addProduct"
              element={console.log("Nuevo Producto Page")}
            />
            {/* NotFound */}
            <Route path="/*" element={<ErrorPage />} />
          </Routes>
        </main>
        <footer id="footer">
          <Footer />
        </footer>
        {/* </Context> */}

      </div>
    </>
  );
}

export default App;
