import { useNavigate } from "react-router-dom";
import "./styles.css";

export const btnNavigate = () => {
  const navigate = useNavigate();

  const handleCoffee = () => {
    navigate("/categoria/cafe");
  };

  const handleGarlic = () => {
    navigate("/categoria/ajo");
  };

  const handleExtra = () => {
    navigate("/categoria/extra");
  };

  return (
    <>
      <div className="Container_Btns">
        <button className="btn btnCafe" onClick={handleCoffee}>
          Cafés
        </button>
        <button className="btn btnAjo" onClick={handleGarlic}>
          Ajos
        </button>
        <button className="btn btnExtra" onClick={handleExtra}>
          Extras
        </button>
      </div>
    </>
  );
};

export default btnNavigate;
