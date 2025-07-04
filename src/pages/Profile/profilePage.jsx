import { useNavigate } from "react-router-dom";
import { BtnNavigate } from "../../components";
import { Usuario } from "../../data/data";
import { formatCellNumber } from "../../helpers/function";
import "./styles.css";

export const profilePage = () => {
  const navigate = useNavigate();
  const [{ nombre_completo, email, telefono, url_avatar }] = Usuario;

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
            <img src={url_avatar} alt={nombre_completo} />
          </div>
          <div className="textProfile">
            <div className="casilla">
              <p>{nombre_completo}</p>
            </div>
            <div className="casilla">
              <p>{email}</p>
            </div>
            <div className="casilla">
              <p>{formatCellNumber(telefono)}</p>
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
            <button>
                Cerrar Sesión
            </button>
        </div>
      </div>
    </>
  );
};

export default profilePage;
