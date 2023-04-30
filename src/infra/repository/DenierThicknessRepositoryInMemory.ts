import { Fail, Ok, IResult, Result } from "types-ddd";
import { DenierThickness } from "../../domain/entities/1new/TO_BE_DELETED/DenierThickness/DenierThickness";
import { DenierThicknessRepository } from "../../domain/repository-interface/DenierThicknessRepository";

export class DenierThicknessRepositoryInMemory
  implements DenierThicknessRepository
{
  getAll(): Promise<IResult<DenierThickness[], string, {}>> {
    throw new Error("Method not implemented.");
  }
  // async getAll(): Promise<IResult<DenierThickness[]>> {
  //   const resultOrError = this.allValues().map(v=>DenierThickness.create(v));
  //   const hasErrors = Result.combine(resultOrError);
  //   if(hasErrors.isFail()) return Fail(hasErrors.error());
  //   return Ok(resultOrError);
  // }

  private allValues() {
    return [
      {
        englishName: "200",
        displayName: "200 דניר",
      },
      {
        englishName: "120",
        displayName: "120 דניר",
      },
      {
        englishName: "40",
        displayName: "40 דניר",
      },
      {
        englishName: "20",
        displayName: "20 דניר",
      },
    ];
  }
}

export default new DenierThicknessRepositoryInMemory();
