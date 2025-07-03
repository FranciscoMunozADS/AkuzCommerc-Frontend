import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

const Profile = () => {
  const { logout } = useContext(UserContext);

  return (
    <>
    <h1>Perfil de usuario</h1>
    <button className="mt-3 btn btn-danger btn-lg" onClick={logout}>
        Cerrar sesión
    </button>
    </>
  );

};

export default Profile;