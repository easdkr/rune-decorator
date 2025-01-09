import { find, pipe } from "@fxts/core";
import {
  IResponseStrategy,
  DefaultResponseStrategy,
} from "./response.strategy";

export class ResponseStrategySelector {
  #strategies = new Map<string, IResponseStrategy>();
  #defaultStrategy = new DefaultResponseStrategy();

  register(key: string, strategy: IResponseStrategy) {
    this.#strategies.set(key, strategy);

    return this;
  }

  select(response: any) {
    const strategy =
      pipe(
        this.#strategies.values(),
        find((strategy) => strategy.isCompatible(response))
      ) ?? this.#defaultStrategy;

    return strategy;
  }
}
