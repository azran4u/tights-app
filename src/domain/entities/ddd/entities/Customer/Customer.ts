import {
  Ok,
  Fail,
  IResult,
  Result,
  EmailValueObject,
  Entity,
  UID,
} from "types-ddd";
import { Guard } from "../../../../../utils/Guard/Guard";
import { MobilePhoneNumber } from "../../TO_BE_DELETED/MobilePhoneNumber/MobilePhoneNumber";

export interface CustomerProps {
  id?: UID;
  firstName: string;
  lastName: string;
  email: EmailValueObject;
  phoneNumber: MobilePhoneNumber;
}

export class Customer extends Entity<CustomerProps> {
  private constructor(props: CustomerProps) {
    super(props, { disableSetters: true });
  }

  public static create(props: CustomerProps): Result<Customer> {
    const validOrError = this.validateProps(props);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new Customer(props));
  }

  private static validateProps(props: CustomerProps): IResult<any> {
    return Result.combine([
      Guard.againstNullOrUndefinedBulk([
        { argument: props?.firstName, argumentName: "firstName" },
        { argument: props?.lastName, argumentName: "lastName" },
        { argument: props?.email, argumentName: "email" },
        { argument: props?.phoneNumber, argumentName: "phoneNumber" },
      ]),
      Guard.againstAtLeast(1, props?.firstName, "firstName"),
      Guard.againstAtLeast(1, props?.lastName, "lastName"),
    ]);
  }

  public firstName() {
    return this.get("firstName");
  }

  public lastName() {
    return this.get("lastName");
  }

  public email() {
    return this.get("email").value();
  }

  public phoneNumber() {
    return this.get("phoneNumber").value();
  }
}
