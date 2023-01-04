import React from "react";
import styled from "styled-components";
import { OptionalClassName } from "../../../utils/classNameInterface";
import Underline from "../../../components/Underline";

interface HeaderProps extends OptionalClassName {
  text: string;
}
const Header: React.FC<HeaderProps> = (props) => {
  return (
    <Wrapper className={props.className}>
      <h2>{props.text}</h2>
      <Underline />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
`;

export default Header;
