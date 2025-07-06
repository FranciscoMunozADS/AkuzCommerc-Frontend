import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Productos } from "../../data/data";
import "./styles.css";
import { Card } from "../../components";
import { titleCase } from "../../helpers/function";
import { CoffeeBanner, ExtraBanner, GarlicBanner } from "../../assets";

export const productList = () => {
  const [prod, setProd] = useState([]);
  const { categoria } = useParams();

  const getData = async () => {
    const data = Productos.filter((e) => e.categoria === categoria);
    setProd(data);
  };

  useEffect(() => {
    getData();
  }, [categoria]);

  const bannerMap = {
    cafe: CoffeeBanner,
    ajo: GarlicBanner,
    extra: ExtraBanner,
  };

  const bannerImg = bannerMap[categoria];

  
  return (
    <>
      <div className="Container_prod">
        {bannerImg && (
          <div className="header_prod">
            <img src={bannerImg} alt={categoria} />
            <div className="header">
              <p className="text">{titleCase(categoria)}</p>
            </div>
          </div>
        )}

        <div className="content_prod">
          {prod.map((item) => (
            // Componente CARD, se le pasa por props lo que se va a mostrar
            <Card
              key={item.id}
              id={item.id}
              descripcion={item.descripcion}
              precio={item.precio}
              stock={item.stock}
              urlImg={item.urlImg}
              categoria={item.categoria}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default productList;
