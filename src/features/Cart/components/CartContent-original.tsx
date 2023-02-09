import React from "react";
import styled from "styled-components";
import {
  cartActions,
  selectCartProductsWithAmount,
  selectCartTotalCost,
  selectCartTotalCostAfterDiscount,
} from "../store/cartSlice";
import { OptionalClassName } from "../../../utils/classNameInterface";
import Button from "../../../shared/Button";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Underline from "../../../shared/Underline";
import ProductAmountButtons from "../../../shared/ProductAmountButtons";
import { FaTrash } from "react-icons/fa";
import { device } from "../../../utils/device.sizes";
import CartItemDescription from "./CartItemDescription";
import { useHistory } from "react-router";

interface CartContentProps extends OptionalClassName {}

const CartContent1: React.FC<CartContentProps> = (props) => {
  const dispatch = useAppDispatch();

  const cartProductsWithAmount = useAppSelector(selectCartProductsWithAmount);

  const totalCost = useAppSelector(selectCartTotalCost);
  const totalCostAfterDiscount = useAppSelector(
    selectCartTotalCostAfterDiscount
  );

  const history = useHistory();

  return (
    <Wrapper className={props.className}>
      <div className="top-buttons">
        <Button
          className="top-buttons-item"
          text="להמשך קניות"
          onClick={() => history.push("/")}
        />
        <Button
          className="clear-cart"
          text="רוקן עגלה"
          onClick={() => dispatch(cartActions.clear())}
        />
      </div>
      <div className="cart-items-list">
        <div className="header" key="header-item">
          <h5>פריט</h5>
          <Underline className="underline" />
        </div>
        <div className="header" key="header-quantity">
          <h5>כמות</h5>
          <Underline className="underline" />
        </div>
        <div className="header" key="header-price">
          <h5>מחיר</h5>
          <Underline className="underline" />
        </div>
        <div className="header" key="header-total">
          <h5>סיכום</h5>
          <Underline className="underline" />
        </div>
        <div key="header-trash"> </div>
        {cartProductsWithAmount.length > 0 &&
          cartProductsWithAmount.map((cartItem) => {
            return (
              <>
                <div className="row-value" key={cartItem.sku + "description"}>
                  <CartItemDescription
                    sku={cartItem.sku}
                    key={cartItem.sku + "description-comp"}
                  />
                </div>
                <h5 className="row-value" key={cartItem.sku + "buttons"}>
                  <ProductAmountButtons
                    className="amount-buttons"
                    amount={cartItem.amount}
                    increase={() =>
                      dispatch(cartActions.increaseAmount({ sku: cartItem.sku }))
                    }
                    decrease={() => {
                      if (cartItem.amount > 1)
                        dispatch(cartActions.decreaseAmount({ sku: cartItem.sku }));
                    }}
                  />
                </h5>
                <h5 className="row-value" key={cartItem.sku + "price"}>
                  {cartItem.price}
                </h5>
                <h5 className="row-value" key={cartItem.sku + "amount"}>
                  {cartItem.amount * cartItem.price}
                </h5>

                <div
                  className="row-value change-mouse"
                  onClick={() => dispatch(cartActions.removeItem(cartItem.sku))}
                  key={cartItem.sku + "trash"}
                >
                  <FaTrash />
                </div>
              </>
            );
          })}
      </div>

      <div className="cart-summary">
        <h5> סכום כולל: {totalCost} ש"ח</h5>
        <h5>בקנייה זו חסכת: {totalCost - totalCostAfterDiscount} ש"ח</h5>
        <h5 className="final-price">סכום סופי: {totalCostAfterDiscount} ש"ח</h5>
      </div>

      <div className="place-order">
        <Button
          className="place-order-button"
          text="ביצוע הזמנה"
          onClick={() => {
            history.push("/checkout");
          }}
        />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .cart-items-list {
    display: grid;
    grid-template-columns: auto auto auto auto auto;
  }
  .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h5 {
      margin-bottom: 0.5rem;
      text-align: center;
      @media ${device.mobile} {
        font-size: 0.75rem;
      }
    }
  }

  .row-value {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
  }

  .underline {
    width: 6rem;

    @media ${device.mobile} {
      width: 2rem;
    }
  }
  .amount-buttons {
    .amount {
      font-size: 1rem;
    }
  }

  .clear-cart {
    background: var(--clr-black);
  }

  .top-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .top-buttons-item {
    display: block;
  }

  .place-order {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .place-order-button {
    width: 20rem;
    height: 2rem;
  }

  .cart-summary {
    margin: 0 auto;
    margin-top: 1rem;
    width: 15rem;
    height: 6rem;
    border-radius: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--clr-grey-9);

    h5 {
      font-weight: 400;
    }
    .final-price {
      margin-top: 1rem;
      font-weight: bold;
    }
  }

  .change-mouse :hover {
    cursor: pointer;
  }
`;
export default CartContent1;
