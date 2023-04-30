import { DenierThickness } from "./DenierThicknessValueObject";
import { ProductAttribute } from "./ProductAttribute";

interface Props {
  denier: DenierThickness;
}

export class ProductDLSAttributesFactory {
  static create(props: Props): Record<string, ProductAttribute> {
    return {
      denierThickness: props.denier,
    };
  }
}

const denier1 = DenierThickness.create({ thickness: "20" });
denier1.value().label();
