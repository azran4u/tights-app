import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CartColumns from "./CartColumns";
import CartTotals from "./CartTotals";
import { CartItemSku } from "../../../model";
import CartItemComponent from "./CartItem";
import { cartActions, cartSelectors } from "../store/cartSlice";
import { OptionalClassName } from "../../../utils/classNameInterface";
import Button from "../../../components/Button";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

interface CartContentProps extends OptionalClassName {}

const CartContent: React.FC<CartContentProps> = (props) => {
  const items = useAppSelector(cartSelectors.selectCartItemsMap);
  const dispatch = useAppDispatch();

  return (
    <Wrapper className={props.className}>
      <CartColumns />
      {items.forEach((cartItem) => {
        return (
          <CartItemComponent key={CartItemSku(cartItem)} cartItem={cartItem} />
        );
      })}
      <hr />
      <Button
        className="center"
        text="רוקן עגלה"
        onClick={() => {
          dispatch(cartActions.clear);
          console.log(`cart cleared`);
        }}
      />
      {/* <Buttons clearCart={dispatch(cartActions.clear)} /> */}
      <CartTotals />
    </Wrapper>
  );
};

const Buttons: React.FC<{ clearCart: () => void }> = ({ clearCart }) => {
  return (
    <div className="link-container">
      <Link to="/products" className="link-btn">
        continue shopping
      </Link>
      <button type="button" className="link-btn clear-btn" onClick={clearCart}>
        clear shopping cart
      </button>
    </div>
  );
};

const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    column-gap: 0.25rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`;
export default CartContent;
