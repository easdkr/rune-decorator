import { NavigatorResolver } from "./navigator-resolver";
import { RunePageContainer } from "./page-container";

export class RuneClientFactory {
  #navigatorResolver: NavigatorResolver;

  constructor(navigator: any) {
    this.#navigatorResolver = new NavigatorResolver(new RunePageContainer());
    this.#navigatorResolver.resolve(navigator);
  }

  public static create(navigator: any) {
    return new RuneClientFactory(navigator);
  }
}
