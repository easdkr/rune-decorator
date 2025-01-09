import { RequestMethod } from "../enums";

export interface IRequest {
  path: string;
  method: RequestMethod;
  methodName: string;
}
