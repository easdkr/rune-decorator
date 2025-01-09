import { Enable, View } from "rune-ts";
import { ClassConstructor } from "../../../types";
import { PAGE_METADATA } from "./rune-page.decorator";

/**
 * 2) enables 인스턴스화 담당
 */
export function RuneUseEnables(enables?: ClassConstructor<Enable>[]) {
  return function (target: ClassConstructor<View<any>>) {
    const metadata = Reflect.getMetadata(PAGE_METADATA, target) || [];
    const newConstructor = function (...args: any[]) {
      const instance = new target(...args);

      // enables가 정의되어 있으면 인스턴스 생성
      (instance as any).enables =
        enables?.map((EnableClass) => new EnableClass(instance)) || [];

      return instance;
    };
    newConstructor.prototype = target.prototype;
    Reflect.defineMetadata(PAGE_METADATA, metadata, newConstructor);

    return newConstructor as any;
  };
}
