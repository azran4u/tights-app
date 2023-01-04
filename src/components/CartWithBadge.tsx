import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { OptionalClassName } from "../utils/classNameInterface";
import { useAppDispatch } from "../store/hooks";
import { selectCartItemsTotalAmount } from "../store/cartSlice";
import { closeSidebar } from "../store/sidebarSlice";

const CartWithBadge: React.FC<OptionalClassName> = (props) => {
  const dispatch = useAppDispatch();
  const itemsCount = useSelector(selectCartItemsTotalAmount);

  return (
    <Wrapper
      to="/cart"
      className={`${props?.className}`}
      onClick={() => dispatch(closeSidebar)}
    >
      <span className="cart-container">
        <FaShoppingCart />
        <span className="cart-value">{itemsCount}</span>
      </span>
    </Wrapper>
  );
};

const Wrapper = styled(Link)`
  font-size: 1.5rem;
  color: var(--clr-grey-1);

  .cart-container {
    position: relative;
  }
  .cart-value {
    position: absolute;
    top: -10px;
    right: -16px;
    background: var(--clr-primary-5);
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: var(--clr-white);
    padding: 12px;
  }
`;
export default CartWithBadge;
