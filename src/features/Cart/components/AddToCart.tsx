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
        console.log(`add to cart ${JSON.stringify(props.item, null, 4)}`);
        dispatch(upsertItem(props.item));
      }}
    />
  );
};

export default AddToCart;
