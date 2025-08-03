import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useCart } from "../../context/CartContext";
import { formatClp } from "../../helpers/function";
import "./styles.css";
import { Modal } from "..";

export const productPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [prod, setProd] = useState([]);
  const localhost = import.meta.env.VITE_LOCALHOST;

  const { categoria, id } = useParams();
  const { user, token } = useContext(UserContext);

  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await fetch(`${localhost}products/${categoria}`);
      const data = await response.json();

      const filterData = await data.filter(
        (e) => e.id === Number(id) && e.categoriaid === Number(categoria)
      );

      if (response.ok) {
        setProd(filterData);
      } else {
        console.error("Error obteniendo productos:", data.message);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  const deleteData = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${localhost}products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
                  <button
                    className={user?.is_admin ? "" : "disabled"}
                    onClick={() => setShowModal(true)}
                  >
                    Modificar
                  </button>
                  <button
                    className={user?.is_admin ? "" : "disabled"}
                    onClick={deleteData}
                  >
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

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Actualizar Producto"
        prod={prod}
        id={id}
        categoria={categoria}
      ></Modal>
    </>
  );
};

export default productPage;
