import { useState } from "react";
import { Banner } from "..";
import "./styles.css";

export const registerProduct = () => {
  const [addProd, setAddProd] = useState({
    titulo: "",
    descripcion: "",
    precio: 0,
    imagen: "",
    stock: 0,
    categoria: "",
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

    if (
      !addProd.titulo ||
      !addProd.descripcion ||
      !addProd.precio ||
      !addProd.imagen ||
      !addProd.stock ||
      !addProd.categoria
    ) {
      alert("Completa todos los campos.");
      return;
    }

    //TODO: Implementar subida de data a la BD
    alert("Producto Agregado con exito.")

    //Limpia los campos del input despues del registro
    setAddProd({
      titulo: "",
      descripcion: "",
      precio: "",
      imagen: "",
      stock: "",
      categoria: "",
    });
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
            {/* Titulo */}
            <div className="mb-3 row align-items-start">
              <label
                htmlFor="titulo"
                className="col-sm-3 col-form-label text-sm-start"
              >
                Titulo
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control bg-light"
                  id="titulo"
                  name="titulo"
                  placeholder="Ejemplo: Tomates, Lechuga, Ajos, Cafes"
                  value={addProd.titulo}
                  onChange={updateAddProd}
                />
              </div>
            </div>
            {/* Descripción */}
            <div className="mb-3 row align-items-start">
              <label
                htmlFor="descripcion"
                className="col-sm-3 col-form-label text-sm-start"
              >
                Descripcion
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control bg-light"
                  id="descripcion"
                  name="descripcion"
                  placeholder="Ejemplo : Producto 100% natural proveniente de xxx sector..."
                  value={addProd.descripcion}
                  onChange={updateAddProd}
                />
              </div>
            </div>
            {/* Precio */}
            <div className="mb-3 row align-items-start">
              <label
                htmlFor="precio"
                className="col-sm-3 col-form-label text-sm-start"
              >
                Precio
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control bg-light"
                  id="precio"
                  name="precio"
                  value={addProd.precio}
                  onChange={updateAddProd}
                  min={0}
                />
              </div>
            </div>
            {/* Imagen */}
            <div className="mb-3 row align-items-start">
              <label
                htmlFor="imagen"
                className="col-sm-3 col-form-label text-sm-start"
              >
                Imagen
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control bg-light"
                  id="imagen"
                  name="imagen"
                  placeholder="Ejemplo : https://pbs.twimg.com/media/FRn1TQ0XMAAHx4.."
                  value={addProd.imagen}
                  onChange={updateAddProd}
                />
              </div>
            </div>
            {/* Stock */}
            <div className="mb-3 row align-items-start">
              <label
                htmlFor="stock"
                className="col-sm-3 col-form-label text-sm-start"
              >
                Stock
              </label>
              <div className="col-sm-9">
                <input
                  type="number"
                  className="form-control bg-light"
                  id="stock"
                  name="stock"
                  value={addProd.stock}
                  onChange={updateAddProd}
                  min={0}
                />
              </div>
            </div>
            {/* Categoria */}
            <div className="mb-3 row align-items-start">
              <label
                htmlFor="categoria"
                className="col-sm-3 col-form-label text-sm-start"
              >
                Categoría
              </label>
              <div className="col-sm-9">
                <select
                  className="form-select"
                  id="categoria"
                  name="categoria"
                  value={addProd.categoria}
                  onChange={updateAddProd}
                >
                  <option value="" disabled>Selecciona</option>
                  <option value="cafe">Café</option>
                  <option value="ajo">Ajo</option>
                  <option value="extra">Extra</option>
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
      </div>
    </>
  );
};

export default registerProduct;
