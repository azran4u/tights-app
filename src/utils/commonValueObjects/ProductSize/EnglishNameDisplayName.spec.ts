import { EnglishNameDisplayName } from "./EnglishNameDisplayName";

describe("CartItemAmount", () => {
  test("create should succed when amount is positive", () => {
    const englishNameDisplayName = EnglishNameDisplayName.create({
      englishName: "L",
      displayName: "Large",
    });
    expect(englishNameDisplayName.isOk()).toBeTruthy;
  });

  test("create should fail when props is undefined", () => {
    // @ts-ignore
    const englishNameDisplayName = EnglishNameDisplayName.create(undefined);
    expect(englishNameDisplayName.isFail()).toBeTruthy;
  });

  test("create should fail when english name is undefined", () => {
    const englishNameDisplayName = EnglishNameDisplayName.create({
      // @ts-ignore
      englishName: undefined,
      displayName: "",
    });
    expect(englishNameDisplayName.isFail()).toBeTruthy;
  });

  test("create should fail when display name is not a string", () => {
    const englishNameDisplayName = EnglishNameDisplayName.create({
      englishName: "",
      // @ts-ignore
      displayName: undefined,
    });
    expect(englishNameDisplayName.isFail()).toBeTruthy;
  });
});
