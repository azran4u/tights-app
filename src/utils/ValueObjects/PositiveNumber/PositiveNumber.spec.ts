import { PositiveNumber } from "./PositiveNumber";

describe("Amount", () => {
  test("create should succed when amount is positive", () => {
    const amount = PositiveNumber.create(1);
    expect(amount.isOk()).toBeTruthy;
  });

  test("create should succed when amount is zero", () => {
    const amount = PositiveNumber.create(0);
    expect(amount.isOk()).toBeTruthy;
  });

  test("create should fail when amount is negative", () => {
    const amount = PositiveNumber.create(-1);
    expect(amount.isFail()).toBeTruthy;
  });

  test("should increament value", () => {
    const amount = PositiveNumber.create(1).value();
    const plusOne = amount.increament().getValue();
    expect(plusOne).toEqual(2);
  });

  test("should not increament value", () => {
    const amount = PositiveNumber.create(Number.MAX_SAFE_INTEGER).value();
    const plusOne = amount.increament().getValue();
    expect(plusOne).toEqual(Number.MAX_SAFE_INTEGER);
  });

  test("should decreament value", () => {
    const amount = PositiveNumber.create(1).value();
    const minusOne = amount.decreament().getValue();
    expect(minusOne).toEqual(0);
  });

  test("should not decreament value", () => {
    const amount = PositiveNumber.create(0).value();
    const minusOne = amount.decreament().getValue();
    expect(minusOne).toEqual(0);
  });
});
