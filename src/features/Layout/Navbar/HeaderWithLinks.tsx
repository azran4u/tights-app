import React from "react";
import styled from "styled-components";
import { device } from "../../../utils/device.sizes";
import { NavLinks } from "./NavLinks";
import SmallLogo from "./LogoSmall";
import LinkToHome from "./LinkToHome";
import CartWithBadge from "../../../components/CartWithBadge";

const HeaderWithLinks: React.FC = () => {
  return (
    <NavContainer>
      <LinkToHome>
        <SmallLogo />
      </LinkToHome>
      <NavLinks />
      <CartWithBadge />
    </NavContainer>
  );
};

export default HeaderWithLinks;

const NavContainer = styled.nav`
  height: 10vh;
  width: 90vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;

  @media ${device.mobile} {
    display: none;
  }
`;
