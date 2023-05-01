import { PickupLocationProps, PickupLocation } from "./PickupLocation";

describe("PickupLocation", () => {
  const pickupLocationProps: PickupLocationProps = {
    value: "hadera",
    displayName: "חדרה גוש חלב",
  };
  const pickupLocationOrError = PickupLocation.create(pickupLocationProps);

  test("basic", () => {
    expect(pickupLocationOrError.isOk()).toBeTruthy;
  });
});

// import { PickupLocation, PickupLocationProps } from "./PickupLocation";

// describe("PickupLocation", () => {
//   const validPickupLocationProps: PickupLocationProps = {
//     value: "hadera",
//     displayName: "חדרה רחוב גוש חלב",
//   };
//   const pickupLocationOrError = PickupLocation.create(validPickupLocationProps);
//   if (pickupLocationOrError.isFail())
//     console.log(pickupLocationOrError.error());
//   const validPickupLocation = pickupLocationOrError.value();

//   test("basic", () => {
//     expect(pickupLocationOrError.isOk()).toBeTruthy;
//   });

//   test("should return values", () => {
//     expect(validPickupLocation.getValue()).toEqual("hadera");
//     expect(validPickupLocation.getDisplayName()).toEqual("חדרה רחוב גוש חלב");
//   });

//   test("should fail when props is undefined", () => {
//     // @ts-ignore
//     const pickupLocationOrError = PickupLocation.create(undefined);
//     expect(pickupLocationOrError.isFail()).toBeTruthy;
//   });

//   test("should fail when value is undefined", () => {
//     const pickupLocationOrError = PickupLocation.create({
//       ...validPickupLocationProps,
//       // @ts-ignore
//       value: undefined,
//     });
//     expect(pickupLocationOrError.isFail()).toBeTruthy;
//   });

//   test("should fail when displayName is undefined", () => {
//     const pickupLocationOrError = PickupLocation.create({
//       ...validPickupLocationProps,
//       // @ts-ignore
//       displayName: undefined,
//     });
//     expect(pickupLocationOrError.isFail()).toBeTruthy;
//   });
// });
