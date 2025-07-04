import { useNavigate } from "react-router-dom";
import { ErrorIcon } from "../../assets";
import { textError } from "./textError";
import "./styles.css";

export const errorPage = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate("/");
  };

  return (
    <>
      <div className="Container">
        <div className="content">
          <img className="imgSeccion" src={ErrorIcon} alt="Imagen de Error" />
          <div className="textSeccion">
            <p>{textError.TITLE}</p>
            <p>{textError.CONTENT}</p>
            <p>{textError.RETURN}</p>
          </div>
          <div className="btnSeccion">
            <button onClick={handleReturn}>Volver al Inicio</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default errorPage;
