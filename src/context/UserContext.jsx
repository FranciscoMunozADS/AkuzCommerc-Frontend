import { createContext, useState } from "react";
import { Usuario } from "../data/data.js"; // Database ficticia

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Simulación de registro con token

  const register = async (email, password) => {
    /* 
        try {
        const response = await fetch("URL API", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        await getProfile(data.token);
      } else {
        console.error("error en registro:", data.message);
      }
    } catch (error) {
      console.error("error de conexión:", error);
    }
    */

    // Validación de si existe el correo
    const correoExiste = Usuario.some ((user) => user.email === email);

    if (correoExiste) {
        throw new Error("Este correo ya está registrado.");
    }
    // Validación de si existe número telefónico
    const telefonoExiste = Usuario.some((user) => user.telefono === Number(telefono));

    if (telefonoExiste) {
        throw new Error("Este número ya está registrado.");
    }

    // Simulación de respuesta exitosa
    const fakeToken = "fake-token-12345";
    const fakeUser = { email };

    localStorage.setItem("token", fakeToken);
    localStorage.setItem("user", JSON.stringify(fakeUser));
    setToken(fakeToken);
    setUser(fakeUser);
  };

  // logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ token, user, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};
