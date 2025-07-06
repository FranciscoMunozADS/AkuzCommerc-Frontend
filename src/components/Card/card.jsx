import { useNavigate } from "react-router-dom";
import { formatClp } from "../../helpers/function";
import { useCart } from "../../context/CartContext";
import "./styles.css";

export const card = ({ id, descripcion, precio, stock, urlImg, categoria }) => {
  // Recibe 4 valores mediante Props, para la creación de la Card
  // TODO: Implementar vista de "Ver Mas..." y Agregar al Carrito

  const navigate = useNavigate()

  const goProduct = (categoria, id) => {
    navigate(`/categoria/${categoria}/${id}`)
  }

  const { addToCart } = useCart();

  return (
    <>
      <div className="Container_Card">
        <img className="img" src={urlImg} alt={descripcion} />
        <p className="title">{descripcion}</p>
        <p className="price">{formatClp(precio)}</p>
        <p className="stock">Cantidad {stock}</p>
        <div className="btns">
          <button onClick={() => goProduct(categoria, id)}>Ver Mas...</button>
          <button onClick={() => addToCart({id, descripcion, precio, stock, urlImg, categoria})}>Agregar</button>
        </div>
      </div>
    </>
  );
};

export default card;
