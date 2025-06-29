import { NavLink } from "react-router-dom";
import "./styles.css";
import { useEffect, useState } from "react";

export const navbar = () => {
  const [tokenJwt, setTokenJwt] = useState(true);

  const setActiveClass = ({ isActive }) =>
    isActive ? `Route isActive` : "Route";

  const toggleLogin = () => {
    setTokenJwt((prev) => !prev);
  };

  useEffect(() => {}, [tokenJwt]);

  return (
    <>
      <div className="Container_Navbar">
        <div className="Content_Navbar">
          <div className="Left_btn">
            {/* <p>Akuz Produit</p> */}
            <NavLink to="/" className={setActiveClass}>
              Home
            </NavLink>
            <NavLink to="/categoria/cafe" className={setActiveClass}>
              Cafés
            </NavLink>
            <NavLink to="/categoria/ajo" className={setActiveClass}>
              Ajos
            </NavLink>
            <NavLink to="/categoria/extra" className={setActiveClass}>
              Extras
            </NavLink>
          </div>
          <div className="Right_btn">
            {tokenJwt ? (
              <>
                <NavLink className={setActiveClass} to="/profile">
                  Profile
                </NavLink>
                <NavLink className="Route">
                  <a onClick={toggleLogin}>Cerrar Sesión</a>
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/register" className={setActiveClass}>
                  Registrate
                </NavLink>
                {/* <NavLink to="/login" className={setActiveClass}>
                  Login
                </NavLink> */}
                <NavLink className={"Route"}>
                  <a onClick={toggleLogin}>Login</a>
                </NavLink>
              </>
            )}
            <NavLink to="/cart" className={setActiveClass}>
              Carrito
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default navbar;
