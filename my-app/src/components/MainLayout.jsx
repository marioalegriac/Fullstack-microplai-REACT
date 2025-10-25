import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main className="content">{children}</main>
      <Footer />
    </div>
  );
}
