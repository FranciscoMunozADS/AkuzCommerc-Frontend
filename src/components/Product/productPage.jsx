import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatClp } from "../../helpers/function";
import { Productos } from "../../data/data";
import "./styles.css";
import { useCart } from "../../context/CartContext";

export const productPage = () => {
  const navigate = useNavigate();
  const [prod, setProd] = useState([]);

  const localhost = import.meta.env.VITE_LOCALHOST;
  const { categoria, id } = useParams();

  const getData = async () => {
    try {
      const response = await fetch(`${localhost}products/${categoria}`);
      const data = await response.json();

      const filterData = await data.filter(
        (e) => e.id === Number(id) && e.categoriaid === Number(categoria)
      );

      console.log(filterData);
      if (response.ok) {
        setProd(filterData);
      } else {
        console.error("Error obteniendo productos:", data.message);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  const deleteData = async (id, categoria) => {
    try {
      const response = await fetch(`${localhost}products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        navigate(`/products/${categoria}`);
      } else {
        console.error("Error en respuesta:", data.message);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleReturn = () => {
    navigate(`/products/${categoria}`);
  };

  const { addToCart } = useCart();

  return (
    <>
      <div className="Container_Product">
        <div className="header">
          <p className="text">Producto Seleccionado</p>
        </div>
        {prod.map(
          (
            {
              id,
              descripcion,
              descripciondetallada,
              precio_venta,
              url_fotografia,
              stock_actual,
              categoria,
            },
            index
          ) => (
            <div key={index} className="content_product">
              <div className="left">
                <img
                  className="imgProduct"
                  src={url_fotografia}
                  alt={descripcion}
                />
                <div className="casilla">
                  <p>Precio : {formatClp(precio_venta)}</p>
                </div>
                <div className="casilla">
                  <p>Cantidad : {stock_actual}</p>
                </div>
              </div>
              <div className="right">
                <div className="casilla">
                  <p>{descripcion}</p>
                </div>
                <div className="casilla">
                  <p>{descripciondetallada}</p>
                </div>
                <div className="btnAdmin">
                  <button
                    onClick={() =>
                      addToCart({
                        id,
                        descripcion: descripcion,
                        precio: precio_venta,
                        stock: stock_actual,
                        urlImg: url_fotografia,
                        categoria,
                      })
                    }
                  >
                    Agregar
                  </button>
                  <button>Modificar</button>
                  <button onClick={() => deleteData(id, categoria)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          )
        )}
        <div className="btnBack">
          <button onClick={handleReturn}>Volver</button>
        </div>
      </div>
    </>
  );
};

export default productPage;
