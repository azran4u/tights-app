import { EmailValueObject } from "types-ddd";
import { Customer, CustomerProps } from "./Customer";
import { MobilePhoneNumber } from "../../TO_BE_DELETED/MobilePhoneNumber/MobilePhoneNumber";

describe("Customer", () => {
  const customerProps: CustomerProps = {
    firstName: "eyal",
    lastName: "azran",
    email: EmailValueObject.create("a@a.com").value(),
    phoneNumber: MobilePhoneNumber.create("0587171644").value(),
  };
  const valueOrError = Customer.create(customerProps);
  const customer = valueOrError.value();

  test("basic", () => {
    expect(valueOrError.isOk()).toBeTruthy;
  });

  test("should return values", () => {
    expect(customer.firstName()).toEqual("eyal");
    expect(customer.lastName()).toEqual("azran");
    expect(customer.email()).toEqual("a@a.com");
    expect(customer.phoneNumber()).toEqual("0587171644");
  });

  test("should fail when props is undefined", () => {
    // @ts-ignore
    const customerOrError = Customer.create(undefined);
    expect(customerOrError.isFail()).toBeTruthy;
  });

  test("should fail when value is undefined", () => {
    const customerOrError = Customer.create({
      ...customerProps,
      // @ts-ignore
      firstName: undefined,
    });
    expect(customerOrError.isFail()).toBeTruthy;
  });

  test("should fail when hebrewName is undefined", () => {
    const customerOrError = Customer.create({
      ...customerProps,
      // @ts-ignore
      lastName: undefined,
    });
    expect(customerOrError.isFail()).toBeTruthy;
  });

  test("should fail when cssColor is undefined", () => {
    const customerOrError = Customer.create({
      ...customerProps,
      // @ts-ignore
      email: undefined,
    });
    expect(customerOrError.isFail()).toBeTruthy;
  });

  test("should fail when cssColor is undefined", () => {
    const customerOrError = Customer.create({
      ...customerProps,
      // @ts-ignore
      phoneNumber: undefined,
    });
    expect(customerOrError.isFail()).toBeTruthy;
  });
});
