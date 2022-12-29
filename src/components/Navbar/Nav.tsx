import React from "react";
import HeaderWithLinks from "./HeaderWithLinks";
import HeaderWithMenu from "./HeaderWithMenu";

const Nav: React.FC = () => {
  return (
    <>
      <HeaderWithMenu />
      <HeaderWithLinks />
    </>
  );
};

export default Nav;
