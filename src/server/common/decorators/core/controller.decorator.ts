import { CONTROLLER_METADATA } from "../../../../constants";

export function Controller(path = ""): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(CONTROLLER_METADATA, path, target);
  };
}
