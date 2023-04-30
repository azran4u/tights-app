import { Ok, Fail, Result, ValueObject } from "types-ddd";
import { ValueLabel } from "../utils/valueLabel/ValueLabel";
import { selectByValue } from "../utils/valueLabel/selectByValue";
import { ProductAttribute } from "./ProductAttribute";

const DENIER_THICKNESS_OPTIONS = ["20", "40", "120", "200"] as const;
type DenierThicknessTuple = typeof DENIER_THICKNESS_OPTIONS;
type DenierThicknessOption = DenierThicknessTuple[number];

function isDenierOption(value: string): value is DenierThicknessOption {
  return DENIER_THICKNESS_OPTIONS.includes(value as DenierThicknessOption);
}

interface Props {
  thickness: DenierThicknessOption;
}

export class DenierThickness extends ProductAttribute<Props> {
  private constructor(props: Props) {
    super(props);
  }

  public static isValidProps({ thickness }: Props): boolean {
    return isDenierOption(thickness);
  }

  public static create({ thickness }: Props): Result<DenierThickness> {
    const isValid = this.isValidProps({ thickness });
    if (!isValid) return Fail("Invalid denier thickness");

    return Ok(new DenierThickness({ thickness }));
  }

  public valueLable() {
    return selectByValue(this.props.thickness, this.labels());
  }

  public label() {
    return this.valueLable().label;
  }

  private labels(): ValueLabel<DenierThicknessOption>[] {
    return [
      {
        value: "200",
        label: "200 דניר",
      },
      {
        value: "120",
        label: "120 דניר",
      },
      {
        value: "40",
        label: "40 דניר",
      },
      {
        value: "20",
        label: "20 דניר",
      },
    ];
  }
}
