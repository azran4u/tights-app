import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { OptionalClassName } from "../utils/classNameInterface";
import Button from "./Button";

interface EmptyCartProps extends OptionalClassName {}

const EmptyCart: React.FC<EmptyCartProps> = (props) => {
  const history = useHistory();

  return (
    <Wrapper className={`${props?.className}`}>
      <h5>נראה שאין פריטים עדיין בעגלה</h5>
      <Button
        text="מלאי את העגלה"
        onClick={() => {
          history.push("/");
        }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: center;
`;

export default EmptyCart;
