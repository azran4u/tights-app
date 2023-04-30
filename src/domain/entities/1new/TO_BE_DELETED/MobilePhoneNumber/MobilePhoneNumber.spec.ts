import { MobilePhoneNumber } from "./MobilePhoneNumber";

describe("MobilePhoneNumber", () => {
  const phoneNumberOrError = MobilePhoneNumber.create("0587171644");
  const phoneNumber = phoneNumberOrError.value();

  test("basic", () => {
    expect(phoneNumberOrError.isOk()).toBeTruthy;
  });

  test("should return values", () => {
    expect(phoneNumber.value()).toEqual("0587171644");
  });

  test("should fail when when is undefined", () => {
    // @ts-ignore
    const phoneNumberOrError = MobilePhoneNumber.create(undefined);
    expect(phoneNumberOrError.isFail()).toBeTruthy;
  });

  test("should fail when value is undefined", () => {
    // @ts-ignore
    const phoneNumberOrError = MobilePhoneNumber.create(undefined);
    expect(phoneNumberOrError.isFail()).toBeTruthy;
  });

  test("should fail when phone number is too short", () => {
    const phoneNumberOrError = MobilePhoneNumber.create("123");
    expect(phoneNumberOrError.isFail()).toBeTruthy;
  });

  test("should fail when phone number is too long", () => {
    const phoneNumberOrError = MobilePhoneNumber.create("12345678910");
    expect(phoneNumberOrError.isFail()).toBeTruthy;
  });
});
