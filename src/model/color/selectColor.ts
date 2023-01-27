import { Color } from "./Color";
import { ColorOption } from "./ColorOption";
import { colors } from "./colors";
import { selectByValue } from "../../utils/valueLabel/selectByValue";

export function selectColor(color: ColorOption): Color {
  return selectByValue(color, colors);
}
