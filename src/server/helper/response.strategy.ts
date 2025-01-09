import { MetaView } from "@rune-ts/server";
import { Page } from "rune-ts";
import { Response } from "express";

export interface IResponseStrategy {
  isCompatible(response: any): boolean;
  handle(res: Response, response: any, statusCode?: number): void;
}

export class RuneResponseStrategy implements IResponseStrategy {
  isCompatible(response: any): boolean {
    return response instanceof Page;
  }

  // TODO: MetaView의 Layout을 사용할 수 있도록 수정
  handle(res: Response, response: any, statusCode = 200): void {
    res.status(statusCode).send(new MetaView(response, {}).toHtml());
  }
}

export class JsonResponseStrategy implements IResponseStrategy {
  isCompatible(response: any): boolean {
    return !(response instanceof Page) && typeof response === "object";
  }

  handle(res: Response, response: any, statusCode = 200): void {
    res.status(statusCode).json(response);
  }
}

export class DefaultResponseStrategy implements IResponseStrategy {
  isCompatible(): boolean {
    return true;
  }

  handle(res: Response, response: any, statusCode = 200): void {
    res.status(statusCode).send(response);
  }
}
