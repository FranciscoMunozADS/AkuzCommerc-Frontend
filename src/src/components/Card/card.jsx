import { formatClp } from "../../helpers/function";
import "./styles.css";

export const card = ({ descripcion, precio, stock, urlImg }) => {
  return (
    <>
      <div className="Container_Card">
        <img className="img" src={urlImg} alt={descripcion} />
        <p className="title">{descripcion}</p>
        <p className="price">{formatClp(precio)}</p>
        <p className="stock">Cantidad {stock}</p>
        <div className="btns">
          <button>Ver Mas...</button>
          <button>Agregar</button>
        </div>
      </div>
    </>
  );
};

export default card;
