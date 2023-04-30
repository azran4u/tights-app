import { ProductLegProps, ProductLeg } from "./ProductLeg";

describe("ProductLeg", () => {
  const productLegProps: ProductLegProps = {
    value: "leg",
    displayName: "with leg",
  };
  const productLegOrError = ProductLeg.create(productLegProps);

  test("basic", () => {
    expect(productLegOrError.isOk()).toBeTruthy;
  });
});

// import { NonEmptyString } from "../NonEmptyString/NonEmptyString";
// import { ProductLeg, ProductLegProps } from "./ProductLeg";

// describe("ProductLeg", () => {
//   const validProductColorProps: ProductLegProps = {
//     value: "leg",
//     displayName: "with leg",
//   };
//   const productColorOrError = ProductLeg.create(validProductColorProps);
//   const validProductColor = productColorOrError.value();

//   test("basic", () => {
//     expect(productColorOrError.isOk()).toBeTruthy;
//   });

//   test("should return values", () => {
//     expect(validProductColor.getValue()).toEqual("leg");
//     expect(validProductColor.getDisplayName()).toEqual("with leg");
//   });

//   test("should fail when props is undefined", () => {
//     // @ts-ignore
//     const valueLabelColorOrError = ProductLeg.create(undefined);
//     expect(valueLabelColorOrError.isFail()).toBeTruthy;
//   });

//   test("should fail when value is undefined", () => {
//     const valueLabelColorOrError = ProductLeg.create({
//       ...validProductColorProps,
//       // @ts-ignore
//       value: undefined,
//     });
//     expect(valueLabelColorOrError.isFail()).toBeTruthy;
//   });

//   test("should fail when displayName is undefined", () => {
//     const valueLabelColorOrError = ProductLeg.create({
//       ...validProductColorProps,
//       // @ts-ignore
//       displayName: undefined,
//     });
//     expect(valueLabelColorOrError.isFail()).toBeTruthy;
//   });
// });
