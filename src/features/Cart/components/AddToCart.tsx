import React from "react";
import { CartItem } from "../../../model/cart/CartItem";
import Button from "../../../shared/Button";
import { useAppDispatch } from "../../../store/hooks";
import { OptionalClassName } from "../../../utils/classNameInterface";
import { upsertItem } from "../store/cartSlice";

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
        dispatch(upsertItem(props.item));
      }}
    />
  );
};

export default AddToCart;
