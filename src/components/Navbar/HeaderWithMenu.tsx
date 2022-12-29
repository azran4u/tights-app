import React from "react";
import styled from "styled-components";
import { device } from "../../utils/device.sizes";
import LinkToHome from "./LinkToHome";
import SmallLogo from "./LogoSmall";
import { MenuButton } from "./MenuIcon";

const HeaderWithMenu: React.FC = () => {
  return (
    <Wrapper>
      <LinkToHome>
        <SmallLogo />
      </LinkToHome>
      <MenuButton />
    </Wrapper>
  );
};

export default HeaderWithMenu;

const Wrapper = styled.nav`
  height: 10vh;
  width: 90vw;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: var(--max-width);

  @media ${device.desktop} {
    display: none;
  }
`;
