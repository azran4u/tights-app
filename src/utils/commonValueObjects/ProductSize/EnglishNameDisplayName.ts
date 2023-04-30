import { Ok, Result, ValueObject, IResult, Fail } from "types-ddd";
import { isNil } from "lodash";
import { TextUtil } from "../../TextUtil";

export interface EnglishNameDisplayNameProps {
  englishName: string;
  displayName: string;
}

export class EnglishNameDisplayName extends ValueObject<EnglishNameDisplayNameProps> {
  protected constructor(props: EnglishNameDisplayNameProps) {
    super(props, { disableSetters: true });
  }

  public static create(
    props: EnglishNameDisplayNameProps
  ): Result<EnglishNameDisplayName> {
    const validOrError = this.validateProps(props);
    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(new EnglishNameDisplayName(props));
  }

  private static validateProps(
    props: EnglishNameDisplayNameProps
  ): IResult<boolean> {
    const isValidPropsOrError = this.isValidPropsNomad(props);

    const isValidEnglishNameOrError = this.isValidEnglishName(
      props?.englishName
    );
    const isValidHebrewNameOrError = this.isValidDisplayName(
      props?.displayName
    );

    const validOrError = Result.combine([
      isValidPropsOrError,
      isValidEnglishNameOrError,
      isValidHebrewNameOrError,
    ]);

    if (validOrError.isFail()) return Fail(validOrError.error());
    return Ok(true);
  }

  private static isValidPropsNomad(
    props: EnglishNameDisplayNameProps
  ): IResult<boolean> {
    if (isNil(props)) return Fail(`props must be defined`);
    return Ok(true);
  }

  private static isValidEnglishName(englishName: string): IResult<boolean> {
    return TextUtil.isString(englishName, "englishName");
  }

  private static isValidDisplayName(hebrewName: string): IResult<boolean> {
    return TextUtil.isString(hebrewName, "hebrewName");
  }

  public getEnglishName() {
    return this.get("englishName");
  }

  public getDisplayName() {
    return this.get("displayName");
  }
}
