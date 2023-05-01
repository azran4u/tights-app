import { ProductSize, ProductSizeProps } from "./ProductSize";

describe("ProductSize", () => {
  const productSizeProps: ProductSizeProps = {
    value: "leg",
    displayName: "with leg",
  };
  const productSizeOrError = ProductSize.create(productSizeProps);

  test("basic", () => {
    expect(productSizeOrError.isOk()).toBeTruthy;
  });
});

// import { NonEmptyString } from "../NonEmptyString/NonEmptyString";
// import { ProductSize, ProductSizeProps } from "./ProductSize";

// describe("ProductSize", () => {
//   const validProductColorProps: ProductSizeProps = {
//     value: "L",
//     displayName: "Large",
//   };
//   const productColorOrError = ProductSize.create(validProductColorProps);
//   const validProductColor = productColorOrError.value();

//   test("basic", () => {
//     expect(productColorOrError.isOk()).toBeTruthy;
//   });

//   test("should return values", () => {
//     expect(validProductColor.getValue()).toEqual("L");
//     expect(validProductColor.getDisplayName()).toEqual("Large");
//   });

//   test("should fail when props is undefined", () => {
//     // @ts-ignore
//     const valueLabelColorOrError = ProductSize.create(undefined);
//     expect(valueLabelColorOrError.isFail()).toBeTruthy;
//   });

//   test("should fail when value is undefined", () => {
//     const valueLabelColorOrError = ProductSize.create({
//       ...validProductColorProps,
//       // @ts-ignore
//       value: undefined,
//     });
//     expect(valueLabelColorOrError.isFail()).toBeTruthy;
//   });

//   test("should fail when displayName is undefined", () => {
//     const valueLabelColorOrError = ProductSize.create({
//       ...validProductColorProps,
//       // @ts-ignore
//       displayName: undefined,
//     });
//     expect(valueLabelColorOrError.isFail()).toBeTruthy;
//   });
// });
