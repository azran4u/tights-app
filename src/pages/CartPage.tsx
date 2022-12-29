import React from "react";
import { CartContent } from "../components";
import { useSelector } from "react-redux";
import { selectCartItemsTotalAmount } from "../store/cartSlice";
import EmptyCart from "../components/EmptyCart";
import styled from "styled-components";

const CartPage: React.FC = () => {
  const itemsCount = useSelector(selectCartItemsTotalAmount);
  const isCartEmpty = itemsCount === 0;

  return (
    <Wrapper>
      <h1 className="title">עגלה</h1>
      {isCartEmpty && <EmptyCart className="content" />}
      {!isCartEmpty && <CartContent className="content" />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 90vw;
  margin: 0 auto;

  .title {
    min-height: 15vh;
    text-align: center;
  }

  .content {
    min-height: 65vh;
  }
`;

export default CartPage;
