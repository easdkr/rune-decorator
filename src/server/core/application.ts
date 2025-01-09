import { RuneServer } from "@rune-ts/server";
import { ModuleResolver } from "./module-resolver";
import { Container } from "./container";

export class RuneApplication {
  #moduleResolver: ModuleResolver;
  #rootContainer = new Container();

  constructor(
    private readonly app: RuneServer,
    module: any
  ) {
    this.#moduleResolver = new ModuleResolver(this.#rootContainer);
    this.#moduleResolver.instantiate(module);
    this.app.use(this.#moduleResolver.router);
  }

  public static create(app: RuneServer, module: any) {
    return new RuneApplication(app, module).app;
  }
}
