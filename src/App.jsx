import "./styles.css";

function App() {
  return (
    <>
      <div className="grid-container">
        {/* <Context> */}
        <header id="header"></header>
        <main id="main">
          <Routes>
            <Route path="/" element={console.log("Home")} />
            <Route path="/*" element={console.log("Crear Error")} />
          </Routes>
        </main>
        <footer id="footer"></footer>
        {/* </Context> */}
      </div>
    </>
  );
}

export default App;
