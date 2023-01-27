import { Leg } from "./Leg";
import { LegOption } from "./LegOption";
import { legs } from "./legs";
import { selectByValue } from "../../utils/valueLabel/selectByValue";

export function selectLeg(legOption: LegOption): Leg {
  return selectByValue(legOption, legs);
}
