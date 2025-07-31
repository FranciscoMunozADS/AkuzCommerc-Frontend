import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import {
  formatClp,
  formatDate,
  generateOrderNumber,
} from "../../helpers/function";
import "./styles.css";

export const history = () => {
  const { user } = useContext(UserContext);
  const [orders, setOrders] = useState([]);
  const localhost = import.meta.env.VITE_LOCALHOST;

  // console.log(user)

  const getData = async () => {
    try {
      const response = await fetch(`${localhost}orders`);
      const data = await response.json();

      const filterData = await data.filter((e) => e.id_usuario === 1);

      if (response.ok) {
        setOrders(filterData);
      } else {
        console.error("Error obteniendo historial de compra:", data.message);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
          {orders.length > 0 ? (
            <table className="tableHistory">
              <thead>
                <tr>
                  <th>N° Orden</th>
                  <th>Fecha Compra</th>
                  <th>Producto</th>
                  <th>Cantidad Productos</th>
                  <th>Precio Unitario</th>
                  <th>Precio Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item) => (
                  <tr key={item.id}>
                    <td>{generateOrderNumber(item.fecha_compra, item.id)}</td>
                    <td>{formatDate(item.fecha_compra)}</td>
                    <td>{item.sku_producto}</td>
                    <td>{item.cantidad_vendida}</td>
                    <td>{formatClp(item.precio_producto)}</td>
                    <td>
                      {formatClp(item.precio_producto * item.cantidad_vendida)}
                    </td>
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
