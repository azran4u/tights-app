import { Amount } from "./Amount";

describe("Amount", () => {
  test("create should succed when amount is 1 or above", () => {
    const amount = Amount.create(5);
    expect(amount.isOk()).toBeTruthy;
  });

  test("create should succed when amount is one", () => {
    const amount = Amount.create(1);
    expect(amount.isOk()).toBeTruthy;
  });

  test("create should succed when amount is MAX_SAFE_INTEGER", () => {
    const amount = Amount.create(Number.MAX_SAFE_INTEGER);
    expect(amount.isOk()).toBeTruthy;
  });

  test("create should fail when amount is negative", () => {
    const amount = Amount.create(-1);
    expect(amount.isFail()).toBeTruthy;
  });

  test("create should fail when amount is zero", () => {
    const amount = Amount.create(0);
    expect(amount.isFail()).toBeTruthy;
  });

  test("should increament value by one", () => {
    const amount = Amount.create(1).value();
    const plusOne = amount.addOne();
    expect(plusOne.getValue()).toEqual(2);
  });

  test("should increament value by more than one", () => {
    const amount = Amount.create(1).value();
    const afterAdd = amount.add(Amount.create(10).value());
    expect(afterAdd.getValue()).toEqual(11);
  });

  test("when add result is greater than MAX_SAFE_INTEGER return MAX_SAFE_INTEGER", () => {
    const amount = Amount.maxAmount();
    const afterAdd = amount.add(Amount.one());
    expect(afterAdd.getValue()).toEqual(Number.MAX_SAFE_INTEGER);
  });

  test("should decreament value by one", () => {
    const amount = Amount.create(2).value();
    const plusOne = amount.subtractOne();
    expect(plusOne.getValue()).toEqual(1);
  });

  test("should decreament value by more than one", () => {
    const amount = Amount.create(10).value();
    const afterAdd = amount.subtract(Amount.create(5).value());
    expect(afterAdd.getValue()).toEqual(5);
  });

  test("when subtract result is less than minValue return zero", () => {
    const amount = Amount.create(10).value();
    const afterAdd = amount.subtract(Amount.create(11).value());
    expect(afterAdd.getValue()).toEqual(0);
  });
});
