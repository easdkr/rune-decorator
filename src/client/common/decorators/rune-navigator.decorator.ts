import { Page } from "rune-ts";

export interface NavigatorOptions {
  pages: (typeof Page<any>)[];
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
