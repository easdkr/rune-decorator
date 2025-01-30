import { Page } from "rune-ts";
import { ClassConstructor } from "../../../types";

export const PAGE_METADATA = Symbol("__rune:page__");

export function RunePage(key?: string) {
  return (
    target: ClassConstructor<Page<any>>,
    propertyKey?: string,
    descriptor?: PropertyDescriptor
  ) => {
    const runeKey = key || target.name;
    console.log({
      target,
      propertyKey,
      descriptor,
      runeKey,
    });
    const wrapped = function (...args: any[]) {
      const instance = new target(...args);
      instance.key = runeKey;
      return instance;
    };

    wrapped.prototype = target.prototype;

    Reflect.defineMetadata(PAGE_METADATA, runeKey, wrapped);
    return wrapped as any;
  };
}
