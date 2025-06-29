import { CoffeeIcon, GarlicIcon } from "../../assets";
import { Banner, BtnNavigate, Card } from "../../components";
import { textCoffee } from "./textCoffee";
import { textGarlic } from "./textGarlic";
import "./styles.css";
import { Productos } from "../../data/data";

export const homePage = () => {
  return (
    <>
      <div className="Container_Home">
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
          {Productos.map((item) => (
            <Card
              descripcion={item.descripcion}
              precio={item.precio}
              stock={item.stock}
              urlImg={item.urlImg}
            />
          ))}
        </div>
        <div className="buttons">
          <BtnNavigate />
        </div>
      </div>
    </>
  );
};

export default homePage;
