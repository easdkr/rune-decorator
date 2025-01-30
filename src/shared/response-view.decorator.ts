import { Request, Response } from "express";
import { View } from "rune-ts";
import { ClassConstructor } from "../types";
import { RESPONSE_VIEW_TOKEN } from "../constants";

export interface ResponseViewMiddleware {
  use(req: Request, res: Response, next: Function): void;
}

export interface ResponseViewOptions {
  path: string;
  // middlewares?: (typeof ResponseViewMiddleware)[];
}

export function ResponseView(options: ResponseViewOptions) {
  return (target: ClassConstructor<View<any>>) => {
    const runeKey = target.name;

    const newConstructor = function (...args: any[]) {
      const instance = new target(...args);
      instance.key = runeKey;
      return instance;
    };

    newConstructor.prototype = target.prototype;

    Reflect.defineMetadata(RESPONSE_VIEW_TOKEN, options, newConstructor);
    return newConstructor as any;
  };
}
