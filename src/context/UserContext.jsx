import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const localhost = import.meta.env.VITE_LOCALHOST

  const navigate = useNavigate();

  // Obtener perfil

  const getProfile = async (currentToken) => {
    if (!currentToken) return;

    try {
      const response = await fetch(`${localhost}profile`, {
        headers: { Authorization: `Bearer ${currentToken}` },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error al obtener el perfil.");
      }

      setUser(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));

      return data.user;
    } catch (error) {
      console.error("Error al obtener perfil:", error.message);
      throw error;
    }
  };

  // Register real con fetch

  const generateIdUsuario = () => {
    return `user${Date.now()}${Math.floor(Math.random() * 1000)}`;
  };

  const register = async (name, email, password, phone, picture) => {
    try {
      // Registro
      const response = await fetch(`${localhost}register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idUsuario: generateIdUsuario(),
          nombre_completo: name,
          telefono: phone,
          e_mail: email,
          password,
          url_avatar: picture,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Error en el registro.");
      }

      // console.log("Usuario registrado:", data);

      // Hacer login automáticamente
      const loginResponse = await fetch(`${localhost}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ e_mail: email, password }),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(
          loginData.error || "Error al iniciar sesión después del registro."
        );
      }

      // Guardar token y obtener perfil
      localStorage.setItem("token", loginData.token);
      setToken(loginData.token);

      const perfil = await getProfile(loginData.token);
      return perfil;
    } catch (error) {
      console.error("Error en registro:", error.message);
      throw error;
    }
  };

  /****** ******/

  const login = async (email, password) => {
    if (!email || !password) {
      throw new Error("Debes ingresar email y contraseña.");
    }

    try {
      const response = await fetch(`${localhost}login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ e_mail: email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Credenciales incorrectas.");
      }

      // Guardar token y obtener perfil
      localStorage.setItem("token", data.token);
      setToken(data.token);

      const perfil = await getProfile(data.token);
      return perfil;
    } catch (error) {
      throw new Error(error.message || "Error al iniciar sesión.");
    }
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
