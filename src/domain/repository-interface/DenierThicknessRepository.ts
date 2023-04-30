import { IResult } from "types-ddd";
import { DenierThickness } from "../entities/1new/TO_BE_DELETED/DenierThickness/DenierThickness";

export interface DenierThicknessRepository {
  getAll(): Promise<IResult<DenierThickness[]>>;
}
