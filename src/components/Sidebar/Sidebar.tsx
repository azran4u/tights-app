import React from 'react';
import styled from 'styled-components';
import CartButtons from '../CartButtons';
import { NavLinks } from '../Navbar/NavLinks';
import { SidebarHeader } from './SidebarHeader';
import * as sidebarStore from '../../store/sidebarSlice';
import { useAppSelector } from '../../store/hooks';

const Sidebar: React.FC = () => {
  const isSidebarOpen = useAppSelector(sidebarStore.selectSidebarIsOpen);
  return (
    <Wrapper>
      <aside className={isSidebarOpen ? 'sidebar show-sidebar' : 'sidebar'}>
        <SidebarHeader />
        <NavLinks />
        <CartButtons />
      </aside>
    </Wrapper>
  );
};

export default Sidebar;

const Wrapper = styled.div`
  text-align: center;

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(100%);
    z-index: -1;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
  }
  @media screen and (min-width: 992px) {
    .sidebar {
      display: none;
    }
  }
`;
