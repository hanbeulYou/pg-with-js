import React from "react";
import { Route, Routes } from "react-router-dom";
import Complete from "./Complete";
import Home from "./Home";
import Layout from "./Layout";
import TossFail from "./TossFail";
import TossSuccess from "./TossSuccess";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="complete" element={<Complete />} />
        <Route path="toss/success" element={<TossSuccess />} />
        <Route path="toss/fail" element={<TossFail />} />
      </Route>
    </Routes>
  );
}

export default App;
