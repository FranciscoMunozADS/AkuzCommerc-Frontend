import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { formatClp } from "../../helpers/function";
import { Productos } from "../../data/data";
import "./styles.css";

export const productPage = () => {
  const navigate = useNavigate();
  const [prod, setProd] = useState([]);

  const { categoria, id } = useParams();

  const getData = async () => {
    const data = Productos.filter(
      (e) => e.id === id && e.categoria === categoria
    );
    setProd(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <>
      <div className="Container_Product">
        <div className="header">
          <p className="text">Producto Seleccionado</p>
        </div>
        {prod.map(
          ({ urlImg, descripcion, precio, stock, descripcionDetallada }, index) => (
            <div key={index} className="content_product">
              <div className="left">
                <img className="imgProduct" src={urlImg} alt={descripcion} />
                <div className="casilla">
                  <p>Precio : {formatClp(precio)}</p>
                </div>
                <div className="casilla">
                  <p>Cantidad : {stock}</p>
                </div>
              </div>
              <div className="right">
                <div className="casilla">
                  <p>{descripcion}</p>
                </div>
                <div className="casilla">
                  <p>{descripcionDetallada}</p>
                </div>
                <div className="btnAdmin">
                  <button>Agregar</button>
                  <button>Modificar</button>
                  <button>Eliminar</button>
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
