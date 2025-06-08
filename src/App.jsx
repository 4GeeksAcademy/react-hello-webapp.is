import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Single from "./pages/Single";
import { AppProvider } from "./context/AppContext";

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:type/:uid" element={<Single />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;
