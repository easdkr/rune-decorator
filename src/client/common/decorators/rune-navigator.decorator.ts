import { Page } from "rune-ts";
import { DynamicImport } from "../../../types";

export interface NavigatorOptions {
  pages?: (typeof Page<any>)[];
  dynamic?: Record<string, DynamicImport<Page<any>>>;
}

export function RuneNavigator(options: NavigatorOptions): ClassDecorator {
  return (target) => {
    for (const property in options) {
      if (options.hasOwnProperty(property)) {
        Reflect.defineMetadata(property, (options as any)[property], target);
      }
    }
  };
}
