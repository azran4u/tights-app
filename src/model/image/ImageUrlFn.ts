import { ImageUrl } from "./ImageUrl";
import { ColorOption } from "../color/ColorOption";
import { SizeOption } from "../size/SizeOption";
import { DenierOption } from "../denier/DenierOption";
import { LegOption } from "../leg/LegOption";

export type ImageUrlFn = (input: {
  denier?: DenierOption;
  leg?: LegOption;
  size?: SizeOption;
  color?: ColorOption;
}) => ImageUrl[];
