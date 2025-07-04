import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./../../context/UserContext";

/***** Recordatorio *****/
// useState para manejar datos del formulario
// useEffect para redirigir si el usuario ya está autenticado
// useNavigate para redirigir después del registro (como /profile o /login)
// Link para navegar entre páginas sin recargar
// UserContext para traer las funciones de registro y datos desde el contexto (register y token)

export const Register = () => {
  const navigate = useNavigate();
  const { register, token } = useContext(UserContext);
  const [signupData, setSignupData] = useState({
    email: "",
    phone: "",
    urlAvatar: "",
    password: "",
    confirmPassword: "",
  });

  /* Funcion genérica para onchange(en el return) */
  // maneja los cambios en los imputs

  const updateSignupData = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  /* Boton submit */

  const handleSubmit = async (e) => {
    e.preventDefault(); // de esta manera no se actualiza la página (default de submit)

    // Validaciones dentro del botón

    if (
      !signupData.email ||
      !signupData.password ||
      !signupData.confirmPassword ||
      !signupData.phone ||
      !signupData.urlAvatar
    ) {
      alert("Completa todos los campos.");
      return;
    }
    if (signupData.password.length < 6) {
      alert("La constraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // método register desde el contexto
    try {
      await register(
        signupData.email,
        signupData.password,
        signupData.phone,
        signupData.urlAvatar
      );
      navigate("/profile");
    } catch (error) {
      alert(error.message);
    }

    //Limpia los campos del input despues del registro
    setSignupData({
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      urlAvatar: "",
    });
  };

  // Redirección automatica si ya hay token

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
          Regístrate
        </h3>
        {/* email */}
        <div className="bg-dark text-white p-4 rounded p-5">
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
                value={signupData.email}
                onChange={updateSignupData}
              />
              <div id="emailHelp" className="form-text text-white">
                No compartiremos tu email con nadie.
              </div>
            </div>
          </div>
          {/* teléfono */}
          <div className="mb-3 row align-items-start">
            <label
              htmlFor="phone"
              className="col-sm-3 col-form-label text-sm-start"
            >
              Número de Teléfono
            </label>
            <div className="col-sm-9">
              <input
                type="number"
                className="form-control bg-light"
                id="phone"
                name="phone"
                placeholder="987654321"
                value={signupData.phone}
                onChange={updateSignupData}
              />
              <div id="phoneHelp" className="form-text text-white">
                No compartiremos tu número con nadie.
              </div>
            </div>
          </div>
          {/* Url Avatar */}
          <div className="mb-3 row align-items-center">
            <label
              htmlFor="urlAvatar"
              className="col-sm-3 col-form-label text-sm-start"
            >
              Foto de Perfil
            </label>
            <div className="col-sm-9">
              <input
                type="url"
                className="form-control bg-light"
                id="urlAvatar"
                name="urlAvatar"
                placeholder="https://ejemplo.com/tu-avatar.jpg"
                value={signupData.urlAvatar}
                onChange={updateSignupData}
              />
            </div>
          </div>
          {/* Password */}
          <div className="mb-3 row align-items-center">
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
                autoComplete="new-password"
                value={signupData.password}
                onChange={updateSignupData}
              />
            </div>
          </div>
          {/* Confirmar Password */}
          <div className="mb-3 row align-items-start">
            <label
              htmlFor="confirmPassword"
              className="col-sm-3 col-form-label text-sm-start"
            >
              Confirmar Contraseña
            </label>
            <div className="col-sm-9">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control bg-light"
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="confirm-password"
                value={signupData.confirmPassword}
                onChange={updateSignupData}
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
          <button type="submit" id="registerBtn" className="mt-3 btn btn-lg">
            Crear cuenta
          </button>
        </div>
        <p className="mt-4">Ya tienes una cuenta?</p>
        <Link to="/login">Inicia Sesión</Link>
      </form>
    </>
  );
};

export default Register;
