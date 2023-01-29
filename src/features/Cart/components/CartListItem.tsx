import React, { useState } from "react";
import styled from "styled-components";
import { CartItem } from "../../../model/cart/CartItem";
import { ProductSchema } from "../../../model/product/ProductSchema";
import { AmountButtons } from "../../../shared";

const CartListItem: React.FC<{ cartItem: CartItem }> = ({ cartItem }) => {
  const [amount, setAmount] = useState(cartItem.amount);
  return (
    <Wrapper>
      {/* item column */}
      {/* <div className="title"> */}
      {/* <Link to={`/products/${slug}`}> */}
      {/* {cartItem.schema === ProductSchema.BY_DENIER_LEG_SIZE && (
        <div>
          <h6>{cartItem.denier} denier</h6>
          <h6>{cartItem.leg}</h6>
          <h6>{cartItem.color}</h6>
        </div>
      )} */}
      <h6>22</h6>
      <AmountButtons
        className="amount-buttons"
        amount={amount}
        increase={() => setAmount(amount + 1)}
        decrease={() => setAmount(amount - 1)}
      />
      <h6>{amount * 22}</h6>

      {/* <img src={imageSrcByCartItem(cartItem)[0]} alt={"image"} /> */}

      {/* </Link> */}
      {/* <div> */}
      {/* <h5 className='name'>{name}</h5> */}

      {/* <h5 className='price-small'>{formatPrice(price)}</h5> */}
      {/* </div> */}
      {/* </div> */}
      {/* price column */}
      {/* <div className='price'>{formatPrice(price)}</div> */}
      {/* quantity column */}
      {/* <AmountButtons amount={amount} increase={increase} decrease={decrease} /> */}
      {/* subtotal column */}
      {/* <h5 className='subtotal'>{formatPrice(price * amount)}</h5> */}
      {/* remove icon */}
      {/* <button
        type='button'
        className='remove-btn'
        onClick={() => 
          removeItem(id)}
      > */}
      {/* <FaTrash /> */}
      {/* </button> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  .amount-buttons {
    .amount {
      font-size: 1rem;
    }
  }
  /* .subtotal {
    display: none;
  }
  .price {
    display: none;
  }
  display: grid;
  grid-template-columns: 200px auto auto;
  grid-template-rows: 75px;
  gap: 3rem 1rem;
  justify-items: center;
  margin-bottom: 3rem;
  align-items: center;
  .title {
    grid-template-rows: 75px;
    display: grid;
    grid-template-columns: 75px 125px;
    align-items: center;
    text-align: left;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  h5 {
    font-size: 0.75rem;
    margin-bottom: 0;
  }

  .color {
    color: var(--clr-grey-5);
    font-size: 0.75rem;
    letter-spacing: var(--spacing);
    text-transform: capitalize;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    span {
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: red;
      margin-left: 0.5rem;
      border-radius: var(--radius);
    }
  }
  .price-small {
    color: var(--clr-primary-5);
  }
  .amount-btns {
    width: 75px;
    button {
      width: 1rem;
      height: 0.5rem;
      font-size: 0.75rem;
    }
    h2 {
      font-size: 1rem;
    }
  }
  .remove-btn {
    color: var(--clr-white);
    background: transparent;
    border: transparent;
    letter-spacing: var(--spacing);
    background: var(--clr-red-dark);
    width: 1.5rem;
    height: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    font-size: 0.75rem;
    cursor: pointer;
  }
  @media (min-width: 776px) {
    .subtotal {
      display: block;
      margin-bottom: 0;
      color: var(--clr-grey-5);
      font-weight: 400;
      font-size: 1rem;
    }
    .price-small {
      display: none;
    }
    .price {
      display: block;
      font-size: 1rem;
      color: var(--clr-primary-5);
      font-weight: 400;
    }
    .name {
      font-size: 0.85rem;
    }
    .color {
      font-size: 0.85rem;
      span {
        width: 0.75rem;
        height: 0.75rem;
      }
    }
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
    align-items: center;
    grid-template-rows: 75px;
    img {
      height: 100%;
    }
    .title {
      height: 100%;
      display: grid;
      grid-template-columns: 100px 200px;
      align-items: center;
      gap: 1rem;
      text-align: left;
    }
    .amount-btns {
      width: 100px;
      button {
        width: 1.5rem;
        height: 1rem;
        font-size: 1rem;
      }
      h2 {
        font-size: 1.5rem;
      }
    }
  } */
`;

export default CartListItem;
