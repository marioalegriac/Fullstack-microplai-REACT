import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children, usuario, setUsuario }) {
  return (
    <div className="layout">
      <Header usuario={usuario} setUsuario={setUsuario} />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
}
