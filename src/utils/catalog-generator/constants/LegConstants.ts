import { LegOption } from "../../../domain/entities/leg/LegOption";

export class LegConstants {
  public static withLeg: { leg: LegOption } = { leg: "with-leg" };
  public static withoutLeg: { leg: LegOption } = { leg: "without-leg" };
}
