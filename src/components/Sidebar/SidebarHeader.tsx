import React from 'react';
// import logo from '../../assets/logo_white.png';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useProductsContext } from '../../context/products_context';
import Logo from '../Navbar/Logo';
import styled from 'styled-components';

export const SidebarHeader = () => {
  const { closeSidebar } = useProductsContext();
  return (
    <div className="sidebar-header">
      <Link to="/" onClick={closeSidebar}>
        <StyledLogo />
      </Link>
      <button type="button" className="close-btn" onClick={closeSidebar}>
        <FaTimes />
      </button>
    </div>
  );
};

const StyledLogo = styled(Logo)`
  width: 3rem;
  height: 3rem;
  background-color: red;
`;
