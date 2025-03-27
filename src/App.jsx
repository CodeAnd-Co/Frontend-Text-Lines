import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import "./App.css";
import BarraLateral from "./vistas/plantillas/global/barraLateral";

function App() {
  return (
    <Router>
      <div className="app">
        <BarraLateral />

      </div>
    </Router>
  );
}

export default App;
