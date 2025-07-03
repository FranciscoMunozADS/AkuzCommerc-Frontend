import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { user, logout } = useContext(UserContext);

  return (
    <>
      <div>
        <h1>Perfil de {user?.nombre_completo}</h1>
        <p>Email: {user?.email}</p>
        <p>Teléfono: {user?.telefono}</p>
      </div>
      <button className="mt-3 btn btn-danger btn-lg" onClick={logout}>
        Cerrar sesión
      </button>
    </>
  );
};

export default Profile;