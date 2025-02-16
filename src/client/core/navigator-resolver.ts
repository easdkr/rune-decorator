import { forEach, pipe } from "@fxts/core";
import { hydrate } from "@rune-ts/server";
import { RunePageContainer } from "./page-container";
import { PAGE_METADATA } from "../common/decorators";
import { DynamicImport } from "../../types";
import { Page } from "rune-ts";

export class NavigatorResolver {
  constructor(private readonly container: RunePageContainer) {}

  // TODO: 코드 정리할 것, 정적 페이지 등록을 지원하지 않을까 고민...
  async resolve(navigator: any) {
    // 정적으로 등록된 페이지를 컨테이너에 등록 및 초기화
    // pipe(
    //   (Reflect.getMetadata("pages", navigator) || []) as any[],
    //   forEach((page) =>
    //     this.container.set(Reflect.getMetadata(PAGE_METADATA, page), page)
    //   )
    // );

    // hydrate(this.container.resolveAll() as Record<string, any>);

    // dynamic import로 등록된 페이지를 바로 hydrate
    const content = JSON.parse(
      document.querySelector("script.__RUNE_DATA__")?.textContent ?? "{}"
    );
    const dynamic = Reflect.getMetadata("dynamic", navigator) as Record<
      string,
      DynamicImport<Page<any>>
    >;

    const target = await dynamic[content.key]();

    hydrate({
      [content.key]: target as any,
    });
  }
}
