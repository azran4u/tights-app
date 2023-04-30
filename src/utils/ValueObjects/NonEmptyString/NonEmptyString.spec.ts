import { repeat } from "lodash";
import { NonEmptyString } from "./NonEmptyString";

describe("NonEmptyString", () => {
  test("create should succed when value is a valid string between 1 to 20", () => {
    const value = NonEmptyString.create("valid-value");
    expect(value.isOk()).toBeTruthy;
  });

  test("create should succed when value's length is 20", () => {
    const value = NonEmptyString.create(repeat("a", 20));
    expect(value.isOk()).toBeTruthy;
  });

  test("create should fail when value is undefined", () => {
    // @ts-ignore
    const value = NonEmptyString.create(undefined);
    expect(value.isFail()).toBeTruthy;
  });

  test("create should fail when value length is greater than 20", () => {
    const value = NonEmptyString.create(repeat("a", 21));
    expect(value.isFail()).toBeTruthy;
  });

  test("create should fail when value length is zero", () => {
    const value = NonEmptyString.create("");
    expect(value.isFail()).toBeTruthy;
  });
});
