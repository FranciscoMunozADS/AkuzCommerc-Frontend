import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Banner } from "..";
import { UserContext } from "../../context/UserContext";
import "./styles.css";

export const registerProduct = () => {
  const { user, token } = useContext(UserContext);
  const localhost = import.meta.env.VITE_LOCALHOST;
  const pruebaUser = user.idUsuario || 1;

  const navigate = useNavigate();

  const [addProd, setAddProd] = useState({
    sku: "",
    descripcion: "",
    descripciondetallada: "",
    precio_venta: 0,
    url_fotografia: "",
    stock_actual: 0,
    categoriaid: "",
  });

  const updateAddProd = (e) => {
    const { name, value } = e.target;
    setAddProd({
      ...addProd,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // de esta manera no se actualiza la página (default de submit)

    if (!token) return;

    if (
      !addProd.sku ||
      !addProd.descripcion ||
      !addProd.descripciondetallada ||
      !addProd.precio_venta ||
      !addProd.url_fotografia ||
      !addProd.stock_actual ||
      !addProd.categoriaid
    ) {
      alert("Completa todos los campos.");
      return;
    }

    const prodBody = {
      sku: addProd.sku,
      descripcion: addProd.descripcion,
      descripcionDetallada: addProd.descripciondetallada,
      precio_venta: addProd.precio_venta,
      url_fotografia: addProd.url_fotografia,
      stock_actual: addProd.stock_actual,
      estatus: "activo",
      id_categoria: addProd.categoriaid,
      id_usuario: pruebaUser,
    };

    try {
      const response = await fetch(`${localhost}products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(prodBody),
      });
      const data = await response.json();

      console.log(data);
    } catch (error) {
      console.error("error de conexión:", error);
    }

    //Limpia los campos del input despues del registro
    setAddProd({
      sku: "",
      descripcion: "",
      descripciondetallada: "",
      precio_venta: "",
      url_fotografia: "",
      stock_actual: "",
      categoriaid: "",
    });
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <>
      <div className="Container_regProd">
        <Banner />
        <div className="header">
          <p className="text">Registrar Nuevo Producto</p>
        </div>

        <form className="rounded px-5" onSubmit={handleSubmit}>
          <div className="bg-dark text-white p-4 rounded p-5">
            {/* SKU */}
            <div className="mb-3 row align-items-start">
              <label
                htmlFor="sku"
                className="col-sm-3 col-form-label text-sm-start"
              >
                SKU
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control bg-light"
                  id="sku"
                  name="sku"
                  placeholder="Ejemplo: CO001, TO002, AJ003"
                  value={addProd.sku}
                  onChange={updateAddProd}
                />
              </div>
            </div>
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
                  value={addProd.descripcion}
                  onChange={updateAddProd}
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
                  value={addProd.descripciondetallada}
                  onChange={updateAddProd}
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
                  value={addProd.precio_venta}
                  onChange={updateAddProd}
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
                  value={addProd.url_fotografia}
                  onChange={updateAddProd}
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
                  value={addProd.stock_actual}
                  onChange={updateAddProd}
                  min={0}
                />
              </div>
            </div>
            {/* Categoria */}
            <div className="mb-3 row align-items-start">
              <label
                htmlFor="categoriaid"
                className="col-sm-3 col-form-label text-sm-start"
              >
                Categoría
              </label>
              <div className="col-sm-9">
                <select
                  className="form-select"
                  id="categoriaid"
                  name="categoriaid"
                  value={addProd.categoriaid}
                  onChange={updateAddProd}
                >
                  <option value="" disabled>
                    Selecciona
                  </option>
                  <option value="1">Café</option>
                  <option value="2">Ajo</option>
                  <option value="3">Extra</option>
                </select>
              </div>
            </div>
            <div className="btnCreate">
              <button
                type="submit"
                id="registerBtn"
                className="mt-3 btn btn-lg"
              >
                Agregar Producto
              </button>
            </div>
          </div>
        </form>
        <div className="btnBack">
          <button onClick={handleProfile}>Volver</button>
        </div>
      </div>
    </>
  );
};

export default registerProduct;
