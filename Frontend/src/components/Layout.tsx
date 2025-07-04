import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const styles = {
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "2rem",
    },
  };

  return (
    <div>
      <Navbar />
      <main style={styles.container}>{children}</main>
    </div>
  );
};

export default Layout;
