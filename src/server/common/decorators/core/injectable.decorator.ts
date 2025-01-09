import { INJECTABLE_METADATA } from "../../../../constants";

export const Injectable = (): ClassDecorator => {
  return (target: Function) => {
    Reflect.defineMetadata(INJECTABLE_METADATA, true, target);
  };
};
