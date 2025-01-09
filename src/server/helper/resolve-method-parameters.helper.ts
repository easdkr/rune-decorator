import { forEach, pipe } from "@fxts/core";
import { Request } from "express";
import { ClassConstructor } from "../../types";
import { RequestMetadata } from "../common";
import { PARAM_METADATA } from "../../constants";

export function resolveMethodParameters(
  req: Request,
  target: ClassConstructor<any>,
  methodName: string
) {
  const args = new Array<unknown>((target as any)[methodName]?.length ?? 0);
  pipe(
    (Reflect.getOwnMetadata(PARAM_METADATA, target, methodName as string) ||
      []) as RequestMetadata[],
    forEach((param) => {
      switch (param.type) {
        case "body":
          args[param.index] = param.propertyKey
            ? req.body[param.propertyKey]
            : req.body;
          break;
        case "param":
          args[param.index] = param.propertyKey
            ? req.params[param.propertyKey]
            : req.params;
          break;
        case "query":
          args[param.index] = param.propertyKey
            ? req.query[param.propertyKey]
            : req.query;
          break;
        case "headers":
          args[param.index] = param.propertyKey
            ? req.headers[param.propertyKey]
            : req.headers;
          break;
        case "req":
          args[param.index] = req;
          break;
        case "res":
          args[param.index] = req.res;
          break;
        default:
          throw new Error("Invalid parameter type");
      }
    })
  );

  return args;
}
