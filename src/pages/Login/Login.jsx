import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./../../context/UserContext";

export const Login = () => {
  const navigate = useNavigate();
  const { login, token } = useContext(UserContext);

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // Manejar cambis en inputs
  const updateLoginData = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  /* Botón submit */

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones dentro del botón

    if (!loginData.email || !loginData.password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      await login(loginData.email, loginData.password);
      navigate("/profile");
    } catch (error) {
      alert("Error al iniciar sesión: " + error.message);
    }

    setLoginData({
      email: "",
      password: "",
    });
  };

  // Redirige si ya hay token
  useEffect(() => {
    if (token) {
      navigate("/profile");
    }
  }, [token, navigate]);

  const [showPassword, setShowPassword] = useState(false); // estado para controlar visibilidad de contraseña

  return (
    <>
      <form
        className="m-5 border border-dark p-4 shadow-lg rounded bg-light"
        onSubmit={handleSubmit}
      >
        <h3 className="registerLogo mx-auto text-white px-4 py-2 mb-4">
          Iniciar sesión
        </h3>
        <div className="bg-dark text-white p-4 rounded p-5">
          {/* Email */}
          <div className="mb-3 row align-items-start">
            <label
              htmlFor="email"
              className="col-sm-3 col-form-label text-sm-start"
            >
              Dirección de Email
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control bg-light"
                id="email"
                name="email"
                autoComplete="username"
                placeholder="user@example.com"
                value={loginData.email}
                onChange={updateLoginData}
              />
            </div>
          </div>

          {/* Contraseña */}
          <div className="mb-3 row align-items-start">
            <label
              htmlFor="password"
              className="col-sm-3 col-form-label text-sm-start"
            >
              Contraseña
            </label>
            <div className="col-sm-9">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control bg-light"
                id="password"
                name="password"
                autoComplete="current-password"
                value={loginData.password}
                onChange={updateLoginData}
              />
              <div className="form-check mt-2 d-inline-flex gap-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="showPassword"
                  checked={showPassword}
                  onChange={() => setShowPassword(!showPassword)}
                />
                <label className="form-check-label" htmlFor="showPassword">
                  Mostrar contraseña
                </label>
              </div>
            </div>
          </div>

          <button type="submit" id="loginBtn" className="mt-3 btn btn-lg">
            Iniciar sesión
          </button>
        </div>

        <p className="mt-4">¿No tienes una cuenta?</p>
        <Link to="/register">Regístrate aquí</Link>
      </form>
    </>
  );
};

export default Login;
