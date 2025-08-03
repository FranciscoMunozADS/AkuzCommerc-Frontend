import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BtnNavigate } from "../../components";
import { UserContext } from "../../context/UserContext";
import { formatCellNumber } from "../../helpers/function";
import "./styles.css";

export const profilePage = () => {

  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user) {
    return  <div>Cargando Perfil...</div>; 
  }

  const handleHistory = () => {
    navigate("/profile/history");
  };

  const handleAddProduct = () => {
    navigate("/profile/addProduct");
  };

  return (
    <>
      <div className="Container_profile">
        <div className="header">
          <p className="text">Mi Perfil</p>
        </div>
        <div className="card_info">
          <div className="imgProfile">
            <img src={user.url_avatar} alt={user.nombre_completo} />
          </div>
          <div className="textProfile">
            <div className="casilla">
              <p>{user.nombre_completo}</p>
            </div>
            <div className="casilla">
              <p>{user.e_mail}</p>
            </div>
            <div className="casilla">
              <p>{formatCellNumber(user.telefono)}</p>
            </div>
            <div className="btnHistory">
              <button onClick={handleHistory}>Historial de Compras</button>
            </div>
          </div>
        </div>
        <div className="navigate">
          <p>¿Desea ver nuestro Catalogo?</p>
          <BtnNavigate />
        </div>
        <div className="content_producto">
          <p>¿Agregar nuevo Producto?</p>
          <button className="btnAddProd" onClick={handleAddProduct}>
            Agregar nuevo Producto
          </button>
        </div>

        <div className="btnLogout">
            <button onClick={logout}>
                Cerrar Sesión
            </button>
        </div>
      </div>
    </>
  );
};

export default profilePage;
