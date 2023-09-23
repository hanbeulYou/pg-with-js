import React from "react";
import { Route, Routes } from "react-router-dom";
import Complete from "./Complete";
import Home from "./Home";
import Layout from "./Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="complete" element={<Complete />} />
      </Route>
    </Routes>
  );
}

export default App;
