import { Guard } from "./Guard";

describe("Guard", () => {
  describe("greaterThan", () => {
    test("should succed when argumant is greater than", () => {
      const guard = Guard.greaterThan(1, 2, "myVal");
      expect(guard.isOk()).toBeTruthy;
    });

    test("should fail when argumant is less than", () => {
      const guard = Guard.greaterThan(1, 0, "myVal");
      expect(guard.isFail()).toBeTruthy;
    });

    test("should fail when argumant is equal", () => {
      const guard = Guard.greaterThan(1, 1, "myVal");
      expect(guard.isFail()).toBeTruthy;
    });
  });

  describe("againstAtLeast", () => {
    test("should succed when argumant is greater than", () => {
      const guard = Guard.againstAtLeast(3, "abcd", "myVal");
      expect(guard.isOk()).toBeTruthy;
    });

    test("should fail when argumant is less than", () => {
      const guard = Guard.againstAtLeast(3, "ab", "myVal");
      expect(guard.isFail()).toBeTruthy;
    });

    test("should fail when argumant is equal", () => {
      const guard = Guard.againstAtLeast(3, "abc", "myVal");
      expect(guard.isFail()).toBeTruthy;
    });
  });

  describe("againstAtMost", () => {
    test("should succed when argumant is less than", () => {
      const guard = Guard.againstAtMost(3, "ab", "myVal");
      expect(guard.isOk()).toBeTruthy;
    });

    test("should fail when argumant is more than", () => {
      const guard = Guard.againstAtMost(3, "abcd", "myVal");
      expect(guard.isFail()).toBeTruthy;
    });

    test("should fail when argumant is equal", () => {
      const guard = Guard.againstAtMost(3, "abc", "myVal");
      expect(guard.isFail()).toBeTruthy;
    });
  });

  describe("againstNullOrUndefined", () => {
    test("should succed when argumant is defined", () => {
      const guard = Guard.againstNullOrUndefined("a", "myVal");
      expect(guard.isOk()).toBeTruthy;
    });

    test("should succed when argumant is zero", () => {
      const guard = Guard.againstNullOrUndefined(0, "myVal");
      expect(guard.isOk()).toBeTruthy;
    });

    test("should fail when argumant is null", () => {
      const guard = Guard.againstNullOrUndefined(null, "myVal");
      expect(guard.isFail()).toBeTruthy;
    });

    test("should fail when argumant is undefined", () => {
      const guard = Guard.againstNullOrUndefined(undefined, "myVal");
      expect(guard.isFail()).toBeTruthy;
    });
  });

  describe("validator", () => {
    test("string", () => {
      const name = "eyal";
      const guard = Guard.validator({ name }, [
        { argumentName: "name", guard: Guard.isRequiered },
      ]);
      expect(guard.isOk()).toBeTruthy;
    });
  });
});
