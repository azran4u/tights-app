import React from "react";
import NavbarForDesktop from "./NavbarForDesktop";
import NavbarForMobile from "./NavbarForMobile";

const Nav: React.FC = () => {
  return (
    <>
      <NavbarForMobile />
      <NavbarForDesktop />
    </>
  );
};

export default Nav;
