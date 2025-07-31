import { Routes, Route, Navigate } from "react-router-dom";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";


import {
  ErrorPage,
  HomePage,
  RegisterPage,
  ProfilePage,
  LoginPage,
  CartPage,
  ProductList,
} from "./pages/index";
import {
  Footer,
  History,
  Navbar,
  ProductPage,
  RegisterProduct,
} from "./components";

import "./styles.css";
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
            <Route path="/products/:categoria" element={<ProductList />} />
            <Route path="/products/:categoria/:id" element={<ProductPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/register"
              element={token ? <Navigate to="/profile" /> : <RegisterPage />}
            />
            <Route path="/cart" element={<CartPage />} />
            {/* Private Routes */}
            <Route
              path="/profile"
              element={token ? <ProfilePage /> : <Navigate to="/login" />}
            />
            <Route path="/orders" element={<History />} />
            <Route path="/profile/addProduct" element={<RegisterProduct />} />
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
