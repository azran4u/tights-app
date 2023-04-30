import { isArray, isNumber } from "lodash";
import { Fail, IResult, Ok } from "types-ddd";

export type GuardResponse = boolean;

export interface IGuardArgument {
  argument: any;
  argumentName: string;
}

export type GuardArgumentCollection = IGuardArgument[];

export class Guard {
  public static combine(
    guardIResults: IResult<GuardResponse>[]
  ): IResult<GuardResponse> {
    for (let result of guardIResults) {
      if (result.isFail()) return Fail(result.error());
    }
    return Ok(true);
  }

  public static greaterThan(
    minValue: number,
    actualValue: number,
    argumentName: string
  ): IResult<GuardResponse> {
    return actualValue > minValue
      ? Ok(true)
      : Fail(
          `Number given {${actualValue}} for ${argumentName} is not greater than {${minValue}}`
        );
  }

  public static againstAtLeast(
    numChars: number,
    text: string,
    argumentName: string
  ): IResult<GuardResponse> {
    return text?.length >= numChars
      ? Ok(true)
      : Fail(`Text of ${argumentName} is not at least ${numChars} chars.`);
  }

  public static againstAtMost(
    numChars: number,
    text: string,
    argumentName: string
  ): IResult<GuardResponse> {
    return text?.length <= numChars
      ? Ok(true)
      : Fail(`Text ${argumentName} is greater than ${numChars} chars.`);
  }

  public static againstNullOrUndefined(
    argument: any,
    argumentName: string
  ): IResult<GuardResponse> {
    if (argument === null || argument === undefined) {
      return Fail(`${argumentName} is null or undefined`);
    } else {
      return Ok(true);
    }
  }

  public static againstNullOrUndefinedBulk(
    args: GuardArgumentCollection
  ): IResult<GuardResponse> {
    for (let arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName
      );
      if (result.isFail()) return Fail(result.error());
    }

    return Ok(true);
  }

  public static isOneOf(
    value: any,
    validValues: any[],
    argumentName: string
  ): IResult<GuardResponse> {
    let isValid = false;
    for (let validValue of validValues) {
      if (value === validValue) {
        isValid = true;
      }
    }

    if (isValid) {
      return Ok(true);
    } else {
      return Fail(
        `${argumentName} isn't oneOf the correct types in ${JSON.stringify(
          validValues
        )}. Got "${value}".`
      );
    }
  }

  public static isArray(
    value: any,
    argumentName: string
  ): IResult<GuardResponse> {
    let isValid = isArray(value);

    if (isValid) {
      return Ok(true);
    } else {
      return Fail(`${argumentName} isn't an array. Got "${value}".`);
    }
  }

  public static isNumber(
    value: any,
    argumentName: string
  ): IResult<GuardResponse> {
    let isValid = isNumber(value);

    if (isValid) {
      return Ok(true);
    } else {
      return Fail(`${argumentName} isn't a number. Got "${value}".`);
    }
  }

  public static inRange(
    num: number,
    min: number,
    max: number,
    argumentName: string
  ): IResult<GuardResponse> {
    const isInRange = num >= min && num <= max;
    if (!isInRange) {
      return Fail(`${argumentName} is not within range ${min} to ${max}.`);
    } else {
      return Ok(true);
    }
  }

  public static allInRange(
    numbers: number[],
    min: number,
    max: number,
    argumentName: string
  ): IResult<GuardResponse> {
    for (let num of numbers) {
      const numIsInRangeIResult = this.inRange(num, min, max, argumentName);
      if (numIsInRangeIResult.isFail())
        return Fail(`${argumentName} is not within the range.`);
    }
    return Ok(true);
  }
}
