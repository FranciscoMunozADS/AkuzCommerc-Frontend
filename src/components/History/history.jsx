import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { formatClp, formatDate } from "../../helpers/function";
import "./styles.css";

export const history = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <div className="Container_history">
        <div className="header">
          <p className="text">Historial de Compras</p>
        </div>
        <div className="contentTable">
          {user?.historial?.length > 0 ? (
            <table className="tableHistory">
              <thead>
                <tr>
                  <th>N° Orden</th>
                  <th>Fecha Compra</th>
                  <th>Cantidad Productos</th>
                  <th>Precio Total</th>
                </tr>
              </thead>
              <tbody>
                {user.historial.map((item) => (
                  <tr key={item.id}>
                    <td>{item.num_orden}</td>
                    <td>{formatDate(item.fecha_compra)}</td>
                    <td>{item.cantidad_vendida}</td>
                    <td>{formatClp(item.precio_producto)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="notBuy">No tiene compras en Akuz Produit. :(</p>
          )}
        </div>
        <div className="btnBack">
          <button onClick={handleProfile}>Volver</button>
        </div>
      </div>
    </>
  );
};

export default history;
