import React, { FC, PropsWithChildren } from "react";
import Nav from "./Navigation/Navbar";
import Footer from "./Footer.tsx";

const LayoutComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div>
      <Nav />
      {children}
      <Footer />
    </div>
  );
};

export default LayoutComponent;
