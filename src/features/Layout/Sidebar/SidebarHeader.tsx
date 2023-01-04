import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Navbar/Logo";
import styled from "styled-components";
import { useAppDispatch } from "../../../store/hooks";
import { closeSidebar } from "../../../store/sidebarSlice";
import { Close } from "@styled-icons/material/Close";

export const SidebarHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const close = () => dispatch(closeSidebar());

  return (
    <Wrapper>
      <StyledClose onClick={close} />
      <Link to="/" onClick={close}>
        <StyledLogo />
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
`;

const StyledLogo = styled(Logo)`
  width: 3rem;
  height: 3rem;
`;

const StyledClose = styled(Close)`
  color: var(--clr-primary-5);
  width: 3rem;
  height: 3rem;
`;
