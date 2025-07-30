import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { Productos } from "../../data/data";
import "./styles.css";
import { Card } from "../../components";
import { titleCase } from "../../helpers/function";
import { CoffeeBanner, ExtraBanner, GarlicBanner } from "../../assets";

export const productList = () => {
  const [prod, setProd] = useState([]);
  const { categoria } = useParams();

  const localhost = import.meta.env.VITE_LOCALHOST;
  
  const getData = async () => {
    try {
      const response = await fetch(`${localhost}products/${categoria}`);
      const data = await response.json();

      console.log(data);
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
  }, [categoria]);

  const bannerMap = {
    1: CoffeeBanner,
    2: GarlicBanner,
    3: ExtraBanner,
  };

  const textMap = {
    1: "Café",
    2: "Ajos",
    3: "Extras",
  };

  const bannerImg = bannerMap[categoria];

  const textDesc = textMap[categoria];

  return (
    <>
      <div className="Container_prod">
        {bannerImg && (
          <div className="header_prod">
            <img src={bannerImg} alt={categoria} />
            <div className="header">
              <p className="text">{titleCase(textDesc)}</p>
            </div>
          </div>
        )}

        <div className="content_prod">
          {prod.map((item, index) => (
            // Componente CARD, se le pasa por props lo que se va a mostrar
            <Card
              key={`${item.id}-${index}`}
              id={item.id}
              descripcion={item.descripcion}
              precio={item.precio_venta}
              stock={item.stock_actual}
              urlImg={item.url_fotografia}
              categoria={item.categoriaid}
            />

          ))}
        </div>
      </div>
    </>
  );
};

export default productList;
