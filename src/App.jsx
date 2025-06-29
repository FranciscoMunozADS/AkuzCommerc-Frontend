import { Route, Routes } from "react-router-dom";
import { HomePage } from "./src/pages";
import { Footer, Navbar } from "./src/components";
import "./styles.css";

function App() {
  return (
    <>
      <div className="grid-container">
        {/* <Context> */}
        <header id="header">
          <Navbar />
        </header>
        <main id="main">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={console.log("Crear Error")} />
          </Routes>
        </main>
        <footer id="footer">
          <Footer />
        </footer>
        {/* </Context> */}
      </div>
    </>
  );
}

export default App;
