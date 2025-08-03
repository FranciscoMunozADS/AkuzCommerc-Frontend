import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";

export const modal = ({ isOpen, onClose, title, prod, id, categoria }) => {
  const { token } = useContext(UserContext);
  const localhost = import.meta.env.VITE_LOCALHOST;
  const [formData, setFormData] = useState({
    descripcion: "",
    descripciondetallada: "",
    precio_venta: 0,
    stock_actual: 0,
    url_fotografia: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (prod && prod.length > 0) {
      const producto = prod[0];
      setFormData({
        descripcion: producto.descripcion || "",
        descripciondetallada: producto.descripciondetallada || "",
        precio_venta: producto.precio_venta ?? 0,
        stock_actual: producto.stock_actual ?? 0,
        url_fotografia: producto.url_fotografia || "",
      });
    }
  }, [prod]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${localhost}products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const contentType = response.headers.get("content-type");

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (response.ok) {
        alert(data);
        navigate(`/products/${categoria}`);
      } else {
        console.error("Error actualizando:", data);
      }
    } catch (err) {
      console.error("Error de conexión:", err);
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <form onSubmit={handleSubmit}>
          <div>
            {/* Titulo */}
            <div className="mb-3 row align-items-start">
              <label
                htmlFor="descripcion"
                className="col-sm-3 col-form-label text-sm-start"
              >
                Titulo
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control bg-light"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Ejemplo: Tomates, Lechuga, Ajos, Cafes"
                  value={formData.descripcion}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Descripción */}
            <div className="mb-3 row align-items-start">
              <label
                htmlFor="descripciondetallada"
                className="col-sm-3 col-form-label text-sm-start"
              >
                Descripcion
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  maxLength="250"
                  className="form-control bg-light"
                  id="descripciondetallada"
                  name="descripciondetallada"
                  placeholder="Ejemplo : Producto 100% natural proveniente de xxx sector..."
                  value={formData.descripciondetallada}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Precio */}
            <div className="mb-3 row align-items-start">
              <label
                htmlFor="precio_venta"
                className="col-sm-3 col-form-label text-sm-start"
              >
                Precio
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control bg-light"
                  id="precio_venta"
                  name="precio_venta"
                  value={formData.precio_venta}
                  onChange={handleChange}
                  min={0}
                />
              </div>
            </div>
            {/* Imagen */}
            <div className="mb-3 row align-items-start">
              <label
                htmlFor="url_fotografia"
                className="col-sm-3 col-form-label text-sm-start"
              >
                Imagen
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control bg-light"
                  id="url_fotografia"
                  name="url_fotografia"
                  placeholder="Ejemplo : https://pbs.twimg.com/media/FRn1TQ0XMAAHx4.."
                  value={formData.url_fotografia}
                  onChange={handleChange}
                />
              </div>
            </div>
            {/* Stock */}
            <div className="mb-3 row align-items-start">
              <label
                htmlFor="stock_actual"
                className="col-sm-3 col-form-label text-sm-start"
              >
                Stock
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control bg-light"
                  id="stock_actual"
                  name="stock_actual"
                  value={formData.stock_actual}
                  onChange={handleChange}
                  min={0}
                />
              </div>
            </div>
          </div>

          <div className="btnCreate">
            <button type="submit">Modificar</button>
          </div>
        </form>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default modal;
