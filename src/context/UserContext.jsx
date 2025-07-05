import { createContext, useState } from "react";
import { Usuario } from "../data/data.js"; // Database ficticia
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const navigate = useNavigate();

  // Obtener perfil real con fetch

  /*
  const getProfile = async (currentToken) => {
    if (!currentToken) return; // para evitar llamados innecesarios

    try {
      const response = await fetch("URL API PERFIL", {
        headers: { Authorization: `Bearer ${currentToken || token}` },
      });
      const data = await response.json();
      if (response.ok) {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
    } else {
      console.error("Error obteniendo perfil:", data.message);
    }
  } catch (error) {
    console.error("Error de conexión:", error);
  }
  };
*/

  // Login real con fetch

  /*
  const login = async (email, password) => {
 
    try {
      const response = await fetch("RUTA API LOGIN", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        await getProfile(data.token); // <-- recuerda crear esta función si usas backend real
    } else {
      console.error("error en login:", data.message);
    }
    } catch (error) {
      console.error("error de conexión:", error);
    }
  };
*/

  // Register real con fetch
  /*  
  const register = async (email, password) => {
    
    try {
      const response = await fetch("URL API REGISTER", {
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

  // Simulación de Login con token

  const login = async (email, password) => {
    const usuarioEncontrado = Usuario.find(
      (user) => user.email === email && user.password === password
    );

    if (!usuarioEncontrado) {
      throw new Error("Credenciales inválidas.");
    }

    const fakeToken = "fake-token-12345";
    const fakeUser = {
      email: usuarioEncontrado.email,
      nombre_completo: usuarioEncontrado.nombre_completo,
      telefono: usuarioEncontrado.telefono,
      urlAvatar: usuarioEncontrado.url_avatar,
      historial: usuarioEncontrado.historial,
    };

    localStorage.setItem("token", fakeToken);
    localStorage.setItem("user", JSON.stringify(fakeUser));
    setToken(fakeToken);
    setUser(fakeUser);
  };

  // Simulación de registro con token
  const register = async (nombre_completo,email, password, telefono, urlAvatar) => {
    // Validación de si existe el correo
    const correoExiste = await Usuario.filter((user) => user.email === email);
    /*  console.log(email);
    console.log(user.email); */
    console.log(correoExiste);

    if (correoExiste[0]) {
      throw new Error("Este correo ya está registrado.");
    }
    // Validación de si existe número telefónico
    const telefonoExiste = await Usuario.filter(
      (user) => user.telefono === Number(telefono)
    );

    if (telefonoExiste[0]) {
      throw new Error("Este número ya está registrado.");
    }

    // Se crea un usuario falso con datos minimos para simular Registro
    const fakeToken = "fake-token-12345";
    const fakeUser = {
      email,
      nombre_completo,
      telefono,
      urlAvatar,
    };

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
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ token, user, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
