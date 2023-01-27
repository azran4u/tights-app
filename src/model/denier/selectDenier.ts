import { Denier } from "./Denier";
import { DenierOption } from "./DenierOption";
import { deniers } from "./deniers";
import { selectByValue } from "../../utils/valueLabel/selectByValue";

export function selectDenier(denier: DenierOption): Denier {
  return selectByValue(denier, deniers);
}
