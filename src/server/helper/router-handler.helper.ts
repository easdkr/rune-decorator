import { NextFunction, Request, Response } from "express";
import { AnonymousFunction, ClassConstructor } from "../../types";
import { resolveMethodParameters } from "./resolve-method-parameters.helper";
import { ResponseStrategySelector } from "./response.strategy.selector";

export function handleRouter(
  handler: AnonymousFunction,
  target: ClassConstructor<any>,
  methodName: string,
  responseStrategySelector: ResponseStrategySelector
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const args = resolveMethodParameters(req, target.prototype, methodName);
      const result = await handler.apply(target, args);
      if (res.headersSent) {
        return;
      }

      responseStrategySelector.select(result).handle(res, result);
    } catch (error) {
      next(error);
    }
  };
}
