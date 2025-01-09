import { Page } from 'rune-ts';

export class RunePageContainer {
  #pageMap = new Map<string, typeof Page<any>>();

  set(key: string, page: typeof Page<any>) {
    this.#pageMap.set(key, page);

    return this;
  }

  get(key: string) {
    return this.#pageMap.get(key);
  }

  resolveAll() {
    return Object.fromEntries(this.#pageMap);
  }
}
