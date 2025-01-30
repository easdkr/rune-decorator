import { NavigatorResolver } from "./navigator-resolver";
import { RunePageContainer } from "./page-container";

export class RuneClientFactory {
  #navigatorResolver: NavigatorResolver;

  constructor(private readonly navigator: any) {
    this.#navigatorResolver = new NavigatorResolver(new RunePageContainer());
  }

  public static create(navigator: any) {
    return new RuneClientFactory(navigator);
  }

  public resolve() {
    return this.#navigatorResolver.resolve(this.navigator);
  }
}
