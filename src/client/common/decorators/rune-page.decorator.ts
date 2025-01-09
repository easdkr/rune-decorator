import { Page } from "rune-ts";
import { ClassConstructor } from "../../../types";

export const PAGE_METADATA = Symbol("__rune:page__");

export function RunePage(key?: string) {
  return (target: ClassConstructor<Page<any>>) => {
    const runeKey = key || target.name;

    const newConstructor = function (...args: any[]) {
      const instance = new target(...args);
      instance.key = runeKey;
      return instance;
    };

    newConstructor.prototype = target.prototype;

    Reflect.defineMetadata(PAGE_METADATA, runeKey, newConstructor);
    return newConstructor as any;
  };
}
