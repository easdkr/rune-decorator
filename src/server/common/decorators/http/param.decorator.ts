import { append, pipe, toArray } from "@fxts/core";
import { PARAM_METADATA } from "../../../../constants";

export interface RequestMetadata {
  index: number;
  type: "body" | "param" | "query" | "req" | "res" | "headers";
  propertyKey?: string;
}

export function Parameter(
  type: RequestMetadata["type"],
  propertyKey?: string
): ParameterDecorator {
  return (target, propertyKeyOrSymbol, parameterIndex) => {
    const requestMetadata: RequestMetadata[] = pipe(
      Reflect.getOwnMetadata(
        PARAM_METADATA,
        target,
        propertyKeyOrSymbol as string
      ) || [],
      append({ index: parameterIndex, type, propertyKey }),
      toArray
    );

    Reflect.defineMetadata(
      PARAM_METADATA,
      requestMetadata,
      target,
      propertyKeyOrSymbol as string
    );
  };
}

export const Body = (propertyKey?: string) => Parameter("body", propertyKey);
export const Param = (propertyKey?: string) => Parameter("param", propertyKey);
export const Query = (propertyKey?: string) => Parameter("query", propertyKey);
export const Req = () => Parameter("req");
export const Res = () => Parameter("res");
export const Headers = (propertyKey?: string) =>
  Parameter("headers", propertyKey);
