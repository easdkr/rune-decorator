export * from "./core";
import { on } from "rune-ts";
import { RunePage, RuneUseEnables, RuneNavigator } from "./common/decorators";
import { RuneClientFactory } from "./core";

export namespace Rune {
  export const Page = RunePage;
  export const UseEnables = RuneUseEnables;
  export const Navigator = RuneNavigator;
  export class Factory extends RuneClientFactory {}
  export const On = on;
}
