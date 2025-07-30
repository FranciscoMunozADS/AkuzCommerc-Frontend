// Hooks de React
import { useEffect, useState } from "react";
// Importar componentes a utilizar en la vista Home
import { Banner, BtnNavigate, Card } from "../../components";
// Imagenes del apartado de detalle de productos
import { CoffeeIcon, GarlicIcon } from "../../assets";
// Documento de Texto, uso principal =>  No llenar tanto el codigo
import { textCoffee } from "./textCoffee";
import { textGarlic } from "./textGarlic";
// Data JS
// import { Productos } from "../../data/data";
// Estilos CSS
import "./styles.css";

export const homePage = () => {
  const [prod, setProd] = useState([]);
  const [random, setRandom] = useState([]);

  const localhost = import.meta.env.VITE_LOCALHOST;

  const getData = async () => {
    try {
      const response = await fetch(`${localhost}products`);
      const data = await response.json();

      if (response.ok) {
        setProd(data);
      } else {
        console.error("Error obteniendo productos:", data.message);
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (prod.length > 0) {
      const limitRandom = [...prod].sort(() => Math.random() - 0.5).slice(0, 3);

      setRandom(limitRandom);
    }
  }, [prod]);

  return (
    <>
      <div className="Container_Home">
        {/* Uso de componente Banner */}
        <Banner />
        <div className="Content_Text">
          <div className="Cafe">
            <div className="title">
              <img className="icon" src={CoffeeIcon} alt="Icono Cafe" />
              <p>{textCoffee.TITLE}</p>
              <img className="icon" src={CoffeeIcon} alt="Icono Cafe" />
            </div>
            <div className="content">
              <p>{textCoffee.TEXTPARTONE}</p>
              <p>{textCoffee.TEXTPARTTWO}</p>
            </div>
          </div>
          <div className="Ajo">
            <div className="title">
              <img className="icon" src={GarlicIcon} alt="Icono Ajo" />
              <p>{textGarlic.TITLE}</p>
              <img className="icon" src={GarlicIcon} alt="Icono Ajo" />
            </div>
            <div className="content">
              <p>{textGarlic.TEXTPARTONE}</p>
              <p>{textGarlic.TEXTPARTTWO}</p>
              <p>{textGarlic.TEXTPARTTHREE}</p>
              <p>{textGarlic.TEXTPARTFOUR}</p>
            </div>
          </div>
        </div>
        <div className="Content_Product">
          {/* Uso de MAP para recorrer los productos y asi mostrarlos en pantalla */}
          {random.map((item, index) => (
            // Componente CARD, se le pasa por props lo que se va a mostrar
            <Card
              key={`${item.id}-${index}`}
              id={item.id}
              descripcion={item.descripcion}
              precio={item.precio_venta}
              stock={item.stock_actual}
              urlImg={item.url_fotografia}
              categoria={item.categoria}
            />
          ))}
        </div>
        <div className="buttons">
          {/* Componente BtnNavigate, para reutilizar los botones para direccionar a las vistas de Productos */}
          <BtnNavigate />
        </div>
      </div>
    </>
  );
};

export default homePage;
