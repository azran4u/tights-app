import { DenierThickness, DenierThicknessProps } from "./DenierThickness";

describe("DenierThickness", () => {
  const denierThicknessProps: DenierThicknessProps = {
    value: "120",
    displayName: "120 denier",
  };
  const denierThicknessOrError = DenierThickness.create(denierThicknessProps);

  test("basic", () => {
    expect(denierThicknessOrError.isOk()).toBeTruthy;
  });
});

// import { NonEmptyString } from "../NonEmptyString/NonEmptyString";
// import { DenierThickness, DenierThicknessProps } from "./DenierThickness";

// describe("DenierThickness", () => {
//   const validProductColorProps: DenierThicknessProps = {
//     value: "120",
//     displayName: "120 denier",
//   };
//   const productColorOrError = DenierThickness.create(validProductColorProps);
//   const validProductColor = productColorOrError.value();

//   test("basic", () => {
//     expect(productColorOrError.isOk()).toBeTruthy;
//   });

//   test("should return values", () => {
//     expect(validProductColor.getValue()).toEqual("120");
//     expect(validProductColor.getDisplayName()).toEqual("120 denier");
//   });

//   test("should fail when props is undefined", () => {
//     // @ts-ignore
//     const valueLabelColorOrError = DenierThickness.create(undefined);
//     expect(valueLabelColorOrError.isFail()).toBeTruthy;
//   });

//   test("should fail when value is undefined", () => {
//     const valueLabelColorOrError = DenierThickness.create({
//       ...validProductColorProps,
//       // @ts-ignore
//       value: undefined,
//     });
//     expect(valueLabelColorOrError.isFail()).toBeTruthy;
//   });

//   test("should fail when displayName is undefined", () => {
//     const valueLabelColorOrError = DenierThickness.create({
//       ...validProductColorProps,
//       // @ts-ignore
//       displayName: undefined,
//     });
//     expect(valueLabelColorOrError.isFail()).toBeTruthy;
//   });
// });
