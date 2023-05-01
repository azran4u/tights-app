import { Amount } from "../../ValueObjects/Amount/Amount";
import { CartItem } from "./CartItem/CartItem";
import { Cart, CartProps } from "./Cart";

describe("Cart", () => {
  const sku = "DLS-LEG-LARGE-BLACK";
  const amount = Amount.one();
  const item = CartItem.create({ sku, amount }).value();
  const items: CartItem[] = [item];
  const itemsToObjects = items.map((item) => item.toObject());
  const props: CartProps = { items };

  const cartOrError = Cart.create(props);
  const cart = cartOrError.value();

  describe("Cart creation", () => {
    test("create cart", () => {
      expect(Cart.create(props).isOk()).toBeTruthy;
    });

    test("create empty cart", () => {
      expect(Cart.createEmptyCart()).toBeTruthy;
      expect(Cart.createEmptyCart().getItemsArray().length).toEqual(0);
    });

    test("should not create cart when items are undefined", () => {
      // @ts-ignore
      expect(Cart.create(undefined).isFail()).toBeTruthy;
      //@ts-ignore
      expect(Cart.create({ items: undefined }).isFail()).toBeTruthy;
    });
  });

  describe("Cart read operations", () => {
    test("should return items as an array", () => {
      const array = cart.getItemsArray();
      const arrayToObjects = array.map((item) => item.toObject());
      expect(arrayToObjects).toEqual(itemsToObjects);
    });

    test("should return items as map", () => {
      const map = cart.getItemsMap();
      expect(map.size).toEqual(items.length);
    });

    test("should return amount by sku", () => {
      const recievedAmount = cart.getAmountBySku(sku).value();
      expect(recievedAmount.getValue()).toEqual(amount.getValue());
    });

    test("should fail when sku is undefined", () => {
      //@ts-ignore
      const recievedAmount = cart.getAmountBySku(undefined);
      expect(recievedAmount.isFail()).toBeTruthy;
    });
  });

  describe("Cart write operations", () => {
    test("should add item to cart", () => {
      const cart = Cart.createEmptyCart();
      cart.addItem(item);
      expect(cart.getSkuCount()).toEqual(1);
    });

    test("should add multiple items to cart", () => {
      const cart = Cart.createEmptyCart();
      cart.addItems([item, item, item]);
      expect(cart.getTotalAmount().getValue()).toEqual(3);
    });

    test("should remove sku from cart", () => {
      const cart = Cart.createEmptyCart();
      cart.addItems([item, item, item]);
      cart.removeItemBySku(sku);
      expect(cart.getTotalAmount().getValue()).toEqual(0);
    });

    test("should increment sku by one", () => {
      const cart = Cart.createEmptyCart();
      cart.addItem(item);
      cart.increamentSkuByOne(sku);
      expect(cart.getTotalAmount().getValue()).toEqual(2);
    });

    test("should increment sku by amount", () => {
      const cart = Cart.createEmptyCart();
      cart.addItem(item);
      cart.increamentSkuByAmount(sku, Amount.one().addOne());
      expect(cart.getTotalAmount().getValue()).toEqual(3);
    });

    test("should decrement sku by one", () => {
      const cart = Cart.createEmptyCart();
      cart.addItems([item, item]);
      cart.decreamentSkuByOne(sku);
      expect(cart.getTotalAmount().getValue()).toEqual(1);
    });

    test("should decrement sku by amount", () => {
      const cart = Cart.createEmptyCart();
      cart.addItems([item, item, item]);
      cart.decreamentSkuByAmount(sku, Amount.one().addOne());
      expect(cart.getTotalAmount().getValue()).toEqual(1);
    });

    test("should clone the cart", () => {
      const cart = Cart.createEmptyCart();
      cart.addItems([item, item, item]);
      const clonedCart = cart.clone();
      expect(clonedCart.getTotalAmount().getValue()).toEqual(3);
    });
  });
});
