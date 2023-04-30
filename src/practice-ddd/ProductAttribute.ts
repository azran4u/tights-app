import { ValueObject } from "types-ddd";

export abstract class ProductAttribute<T = any> extends ValueObject<T> {
    abstract label(): string;
}
