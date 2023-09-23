import React from "react";
// import Header from "../pages/common/Header";
// import Footer from "../pages/common/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      {/* <Header></Header> */}
      <Outlet />
      {/* <Footer></Footer> */}
    </>
  );
}
