import React from "react";
import styled, { css } from "styled-components";
import { NavLinks } from "../../Navbar/NavLinks";
import { SidebarHeader } from "./SidebarHeader";
import * as sidebarStore from "../store/sidebarSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { device } from "../../../../utils/device.sizes";
import { Link } from "react-router-dom";
import { closeSidebar } from "../store/sidebarSlice";
import CartWithBadge from "../../../../shared/CartWithBadge";

const Sidebar: React.FC = () => {
  const isSidebarOpen = useAppSelector(sidebarStore.selectSidebarIsOpen);
  const dispatch = useAppDispatch();
  const close = () => dispatch(closeSidebar());
  return (
    <Wrapper isSidebarOpen={isSidebarOpen}>
      <SidebarHeader />
      <NavLinks isSidebar={true} />
      <Link to="/cart" onClick={close}>
        <CartWithBadge />
      </Link>
    </Wrapper>
  );
};

export default Sidebar;

interface WrapperProps {
  isSidebarOpen: boolean;
}

const Wrapper = styled.aside.attrs<WrapperProps>({})<WrapperProps>`
  text-align: center;
  z-index: -1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--clr-white);
  transition: var(--transition);
  transform: translate(100%);
  ${({ isSidebarOpen }) =>
    isSidebarOpen &&
    css`
      z-index: 999;
      transform: translate(0);
    `}

  @media ${device.desktop} {
    display: none;
  }
`;
