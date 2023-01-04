import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/images/logo.svg";
import { OptionalClassName } from "../../../utils/classNameInterface";
import Logo from "./Logo";

const LogoNavigateHome = (props: OptionalClassName) => {
  return (
    <Link to="/">
      <Logo />
    </Link>
  );
};

const StyledLogo = styled.img`
  width: 3rem;
  height: 3rem;
`;

export default LogoNavigateHome;
