import { Lace } from "./Lace";
import { LaceOption } from "./LaceOption";
import { laces } from "./laces";
import { selectByValue } from "../../utils/valueLabel/selectByValue";

export function selectLace(lace: LaceOption): Lace {
  return selectByValue(lace, laces);
}
