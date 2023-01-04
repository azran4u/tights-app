import React from "react";
import styled from "styled-components";
import { OptionalClassName } from "../utils/classNameInterface";

const Loading: React.FC<OptionalClassName> = (props) => {
  return <Wrapper className={props.className} />;
};

const Wrapper = styled.div`
  width: 6rem;
  height: 6rem;
  margin: 0 auto;
  margin-top: 10rem;
  border-radius: 50%;
  border: 4px solid #ccc;
  border-top-color: var(--clr-primary-5);
  animation: spinner 0.6s linear infinite;
`;

export default Loading;
