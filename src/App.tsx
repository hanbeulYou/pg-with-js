import React from "react";
import { Route, Routes } from "react-router-dom";
import Complete from "./Smartro/SmartroComplete";
import Home from "./Home";
import Layout from "./Layout";
import TossFail from "./TossPayments/TossFail";
import TossSuccess from "./TossPayments/TossSuccess";
import TossBillingSuccess from "./TossBilling/TossBillingSuccess";
import TossBillingFail from "./TossBilling/TossBillingFail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="smartro/complete" element={<Complete />} />
        <Route path="toss/success" element={<TossSuccess />} />
        <Route path="toss/fail" element={<TossFail />} />
        <Route path="toss-billing/success" element={<TossBillingSuccess />} />
        <Route path="toss-billing/fail" element={<TossBillingFail />} />
      </Route>
    </Routes>
  );
}

export default App;
