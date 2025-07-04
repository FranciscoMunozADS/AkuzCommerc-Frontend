import { NavLink } from "react-router-dom";
import "./styles.css";

export const navbar = () => {
  const tokenJwt = false;

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
            {tokenJwt ? (
              <>
                <NavLink className={setActiveClass} to="/profile">
                  Profile
                </NavLink>
                <NavLink className="Route">Cerrar Sesión</NavLink>
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
