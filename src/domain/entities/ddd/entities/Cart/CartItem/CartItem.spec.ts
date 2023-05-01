import { Amount } from "../../../ValueObjects/Amount/Amount";
import { CartItem, CartItemProps } from "./CartItem";

describe("CartItem", () => {
  const validCartItemProps: CartItemProps = {
    sku: "DLS-LEG-LARGE-BLACK",
    amount: Amount.one(),
  };
  const cartItemOrError = CartItem.create(validCartItemProps);
  const validCartItem = cartItemOrError.value();

  test("basic", () => {
    expect(cartItemOrError.isOk()).toBeTruthy;
  });

  test("should return values", () => {
    expect(validCartItem.getSku()).toEqual("DLS-LEG-LARGE-BLACK");
    expect(validCartItem.getAmount().getValue()).toEqual(
      Amount.one().getValue()
    );
  });

  test("should fail when props is undefined", () => {
    // @ts-ignore
    const cartItemOrError = CartItem.create(undefined);
    expect(cartItemOrError.isFail()).toBeTruthy;
  });

  test("should fail when sku is undefined", () => {
    const cartItemOrError = CartItem.create({
      ...validCartItemProps,
      // @ts-ignore
      sku: undefined,
    });
    expect(cartItemOrError.isFail()).toBeTruthy;
  });

  test("should fail when amount is undefined", () => {
    const cartItemOrError = CartItem.create({
      ...validCartItemProps,
      // @ts-ignore
      amount: undefined,
    });
    expect(cartItemOrError.isFail()).toBeTruthy;
  });
});
