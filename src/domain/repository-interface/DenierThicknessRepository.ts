import { IResult } from "types-ddd";
import { DenierThickness } from "../entities/ddd/TO_BE_DELETED/DenierThickness/DenierThickness";

export interface DenierThicknessRepository {
  getAll(): Promise<IResult<DenierThickness[]>>;
}
