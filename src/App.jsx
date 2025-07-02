import { Route, Routes } from "react-router-dom";
import { ErrorPage, HomePage, ProfilePage } from "./src/pages";
import { Footer, Navbar, ProductPage } from "./src/components";
import "./styles.css";

function App() {
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
            <Route path="/register" element={console.log("Register Page")} />
            <Route path="/login" element={console.log("Login Page")} />
            <Route path="/cart" element={console.log("Cart Page")} />
            {/* Private Routes */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route
              path="/profile/history"
              element={console.log("Historial Page")}
            />
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
