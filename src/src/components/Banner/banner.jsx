import { BannerAkuz } from "../../assets";
import "./styles.css";

export const banner = () => {
  return (
    <>
      <img className="banner" src={BannerAkuz} alt="Banner Akuz Produit" />
    </>
  );
};

export default banner;
