// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Demo from "./pages/Demo";
import Single from "./pages/Single";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="demo" element={<Demo />} />
          <Route path=":type/:uid" element={<Single />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
