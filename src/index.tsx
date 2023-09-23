import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Helmet } from "react-helmet";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Helmet>
      <script src="https://tpay.smartropay.co.kr/asset/js/SmartroPAY-1.0.min.js?version=현재일자" />
    </Helmet>
    <App />
  </React.StrictMode>
);
