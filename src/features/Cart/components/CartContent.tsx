import React from "react";
import styled from "styled-components";
import {
  cartActions,
  cartSelectors,
  decreaseAmount,
  increaseAmount,
} from "../store/cartSlice";
import { OptionalClassName } from "../../../utils/classNameInterface";
import Button from "../../../shared/Button";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Underline from "../../../shared/Underline";
import ProductAmountButtons from "../../../shared/ProductAmountButtons";
import { FaTrash } from "react-icons/fa";
import { device } from "../../../utils/device.sizes";
import { catalog } from "../../../utils/catalog-generator/catalog";
import CartItemDescription from "./CartItemDescription";
import { ProductInstance } from "../../../model/productInstance/ProductInstance";
import { DiscountKind } from "../../../model/discount/DiscountKind";

interface CartContentProps extends OptionalClassName {}

const CartContent: React.FC<CartContentProps> = (props) => {
  const items = useAppSelector(cartSelectors.selectCartItemsArray);
  const dispatch = useAppDispatch();

  function productInstanceBySku(sku: string): ProductInstance {
    return catalog.find((x) => x.sku === sku)!;
  }
  const totalCost = items.reduce((prev, curr) => {
    const productInstace = productInstanceBySku(curr.sku);
    return prev + productInstace.price * curr.amount;
  }, 0);

  const totalCostAfterDiscount = items.reduce((prev, curr) => {
    const productInstace = productInstanceBySku(curr.sku);

    if (productInstace.discount.kind === DiscountKind.COUNT_DISCOUNT) {
      const { group, count, pricePerCount } = productInstace.discount;
      const totalCount = items.reduce((prev, curr) => {
        const productInstaceInCart = productInstanceBySku(curr.sku);
        if (
          productInstaceInCart.discount.kind === DiscountKind.COUNT_DISCOUNT &&
          productInstaceInCart.discount.group === group
        ) {
          return prev + curr.amount;
        }
        return prev;
      }, 0);

      if (totalCount >= count) {
        return prev + (pricePerCount / count) * curr.amount;
      }
    }

    return prev + productInstace.price * curr.amount;
  }, 0);

  return (
    <Wrapper className={props.className}>
      <div className="top-buttons">
        <Button
          className="top-buttons-item"
          text="להמשך קניות"
          onClick={() => {
            dispatch(cartActions.clear);
          }}
        />
        <Button
          className="clear-cart"
          text="רוקן עגלה"
          onClick={() => {
            dispatch(cartActions.clear);
          }}
        />
      </div>
      <div className="cart-items-list">
        <div className="header">
          <h5>פריט</h5>
          <Underline className="underline" />
        </div>
        <div className="header">
          <h5>כמות</h5>
          <Underline className="underline" />
        </div>
        <div className="header">
          <h5>מחיר</h5>
          <Underline className="underline" />
        </div>
        <div className="header">
          <h5>סיכום</h5>
          <Underline className="underline" />
        </div>
        <div> </div>
        {items.length > 0 &&
          items.map((cartItem) => {
            const productInstance = catalog.find(
              (x) => x.sku === cartItem.sku
            )!;
            return (
              <>
                <div className="row-value">
                  <CartItemDescription sku={cartItem.sku} />
                </div>
                <h5 className="row-value">
                  <ProductAmountButtons
                    className="amount-buttons"
                    amount={cartItem.amount}
                    increase={() =>
                      dispatch(increaseAmount({ sku: cartItem.sku }))
                    }
                    decrease={() => {
                      if (cartItem.amount > 1)
                        dispatch(decreaseAmount({ sku: cartItem.sku }));
                    }}
                  />
                </h5>
                <h5 className="row-value">{productInstance.price}</h5>
                <h5 className="row-value">
                  {cartItem.amount * productInstance.price}
                </h5>

                <div className="row-value">
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
            dispatch(cartActions.clear);
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

  /* .buttons-group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 1rem;
  }

  .continue-shopping {
  }

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
  } */
`;
export default CartContent;
