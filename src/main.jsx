import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import CV from "./CV";
import Portfolio from "./Portfolio";
import InfoAsistente from "./InfoAsistente";
import InfoWeb from "./InfoWeb";
import Contacto from "./Contacto";

 
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<CV />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/infoasistente" element={<InfoAsistente />} />
        <Route path="/infoweb" element={<InfoWeb />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </Layout>
  </BrowserRouter>
);
 