import { ValueDisplayName, ValueDisplayNameProps } from "./ValueDisplayName";

describe("ValueDisplayName", () => {
  const validValueDisplayNameProps: ValueDisplayNameProps = {
    value: "L",
    displayName: "Large",
  };
  const valueDisplayNameOrError = ValueDisplayName.create(
    validValueDisplayNameProps
  );
  const validValueDisplayName = valueDisplayNameOrError.value();

  test("basic", () => {
    expect(valueDisplayNameOrError.isOk()).toBeTruthy;
  });

  test("should return values", () => {
    expect(validValueDisplayName.getValue()).toEqual("L");
    expect(validValueDisplayName.getDisplayName()).toEqual("Large");
  });

  test("should fail when props is undefined", () => {
    // @ts-ignore
    const valueDisplayNameOrError = ValueDisplayName.create(undefined);
    expect(valueDisplayNameOrError.isFail()).toBeTruthy;
  });

  test("should fail when value is undefined", () => {
    const valueDisplayNameOrError = ValueDisplayName.create({
      ...validValueDisplayNameProps,
      // @ts-ignore
      value: undefined,
    });
    expect(valueDisplayNameOrError.isFail()).toBeTruthy;
  });

  test("should fail when displayName is undefined", () => {
    const valueDisplayNameOrError = ValueDisplayName.create({
      ...validValueDisplayNameProps,
      // @ts-ignore
      displayName: undefined,
    });
    expect(valueDisplayNameOrError.isFail()).toBeTruthy;
  });
});
