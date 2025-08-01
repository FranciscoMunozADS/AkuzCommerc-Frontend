import { useContext, useState } from "react";
import { useCart } from "../../context/CartContext";
import { UserContext } from "../../context/UserContext";
import { formatClp } from "../../helpers/function";
import "./Cart.css";

export const Cart = () => {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeProduct,
    totalPrice,
    clearCart,
  } = useCart();
  const { user, token } = useContext(UserContext); // Token de usuario simulado
  const [successMessage, setSuccessMessage] = useState("");
  const localhost = import.meta.env.VITE_LOCALHOST;

  /***** Metodo FETCH para conectarse a la API (si hubiese backend)*****/

  const handleCheckout = async () => {
    setSuccessMessage("");
    if (!token) return; // para evitar ejecutar sin autenticación

    try {
      const response = await fetch(`${localhost}checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer FAKE_TOKEN_123`,
          // Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          products: cart.map((item) => ({
            product_id: item.id,
            quantity: item.count,
          })),
        }),
      });

      await response.json();
      if (response.ok) {
        setSuccessMessage("Pedido realizado con éxito.");
        clearCart();
      } else {
        setSuccessMessage("Hubo un problema con el pago.");
      }
    } catch (error) {
      console.error("Error en el checkout:", error);
      setSuccessMessage("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="container my-4 p-4 border rounded">
      <h2 className="header text-center text-white mb-4">
        🛒 Carrito de Compras
      </h2>

      <div className="bg-dark text-white p-2 rounded">
        {cart.length === 0 ? (
          <p className="text-center">El carrito está vacío.</p>
        ) : (
          cart.map((item) => (
            <div
              key={item.id}
              className="row align-items-center mb-4 gx-2 gy-3"
            >
              {/* Imagen */}
              <div className="col-3 col-md-2 text-center mb-3 mb-md-0">
                <div className="bg-white p-2 rounded-circle d-inline-block">
                  <img
                    src={item.urlImg}
                    alt={item.descripcion}
                    className="img-fluid rounded-circle"
                    style={{
                      width: "90px",
                      height: "90px",
                    }}
                  />
                </div>
              </div>
              {/* Descripción */}
              <div className="col-9 col-md-4 mb-2 mb-md-0">
                <div className="bg-light rounded p-2 text-center text-black h-100 d-flex align-items-center justify-content-center text-break">
                  {item.descripcion}
                </div>
              </div>

              {/* Precio */}
              <div className="col-6 col-md-2 mb-md-0">
                <div className="precioCart rounded p-2 text-center text-white d-flex align-items-center justify-content-center text-nowrap">
                  {formatClp(item.precio)}
                </div>
              </div>

              {/* Botones */}
              <div className="col-6 col-md-4 d-flex flex-wrap justify-content-center align-items-center gap-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => decreaseQuantity(item.id)}
                >
                  -
                </button>
                <span>{item.count}</span>
                <button
                  className="btn btn-sm btn-success"
                  onClick={() => increaseQuantity(item.id)}
                >
                  +
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeProduct(item.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sección inferior con total */}
      {cart.length > 0 && (
        <div className="d-flex justify-content-between align-items-center bg-light mt-4 p-3 rounded text-nowrap">
          <div className="total-left px-3 py-2 bg-white border rounded">
            <strong>Total a pagar:</strong>
          </div>

          <div className="total-right d-flex align-items-center gap-3">
            <div className="p-2 bg-white border rounded">
              <strong>{formatClp(totalPrice)}</strong>
            </div>
            <button
              className="btn btn-success"
              onClick={handleCheckout}
              disabled={!token}
            >
              {token ? "Pagar" : "Inicia sesión para pagar"}
            </button>
          </div>
        </div>
      )}

      {successMessage && <p className="text-center mt-3">{successMessage}</p>}
    </div>
  );
};

export default Cart;
