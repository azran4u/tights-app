import React from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import { CartItem } from "../../../model";
import { useAppDispatch } from "../../../store/hooks";
import { OptionalClassName } from "../../../utils/classNameInterface";
import { addItem } from "../store/cartSlice";

interface AddToCartProps extends OptionalClassName {
  item: CartItem;
}
const AddToCart: React.FC<AddToCartProps> = (props) => {
  const dispatch = useAppDispatch();
  return (
    <Button
      className={props.className}
      text="הוסף לעגלה"
      onClick={() => {
        console.log(`add to cart ${JSON.stringify(props.item, null, 4)}`);
        dispatch(addItem(props.item));
      }}
    />
  );
};

export default AddToCart;
