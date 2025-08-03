import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  /*** Agregar producto al carrito ***/

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Verificación si el producto ya existe en el carrito
      const exist = prevCart.find((item) => item.id === product.id);
      if (exist) {
        // si existe, incrementa la cantidad
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        );
      } else {
        // si no existe, lo agrega con count = 1
        return [...prevCart, { ...product, count: 1 }];
      }
    });
  };

  /*** Funciones para manejar el carrito ***/

  // Aumenta la cantidad de un producto en el carrito
  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
  };

  // Disminuye la cantidad de un producto en el carrito
  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  // Elimina un producto del carrito
  const removeProduct = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Vacía el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Calcula el total a pagar (precio * cantidad de cada producto)
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.precio * item.count,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeProduct,
        clearCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
