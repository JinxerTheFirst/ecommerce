import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div>
      <NavBar />
      <div className="">
        <Outlet></Outlet>
      </div>
    </div>
  );
}
