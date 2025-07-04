import { NavLink } from "react-router-dom";
import "./styles.css";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

export const navbar = () => {
  const { token, logout } = useContext(UserContext);

  const setActiveClass = ({ isActive }) =>
    isActive ? `Route isActive` : "Route";

  return (
    <>
      <div className="Container_Navbar">
        <div className="Content_Navbar">
          <div className="Left_btn">
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
            {/* Uso de Ternarios para mostrar las rutas definidas, 
            Si tiene el token activo, mostrar Perfil y Cerrar Sesión, 
            Si no tiene el token activo, mostrar Registrarse y Login */}
            {token ? (
              <>
                <NavLink className={setActiveClass} to="/profile">
                  Profile
                </NavLink>
                <a className="Route" onClick={logout}>Cerrar Sesión</a>
              </>
            ) : (
              <>
                <NavLink to="/register" className={setActiveClass}>
                  Registrate
                </NavLink>
                <NavLink to="/login" className={setActiveClass}>
                  Login
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
