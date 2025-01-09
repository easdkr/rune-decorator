# rune-decorator

### Client

- **@Rune.Page()**
  - hydrate 할 페이지를 등록하기 위한 데코레이터
  - key 를 지정하지 않으면 클래스명을 key 로 사용

```ts
import { Html, html, Page } from "rune-ts";
import style from "./app.page.module.scss";
import { Rune } from "rune-decorator/client";

export interface PageProps {
  message: string;
}

/**
 * Page 데코레이터를 사용하여 페이지 등록, 데코레이터의 parameter 로 페이지의 custom key 를 지정할 수 있다.
 */
@Rune.Page()
export class AppPage extends Page<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  template(): Html {
    return html` <div class="${style.container}">
      <span class="${style.title}">${this.data.message}</span>
      <button class="${style.action}">Click</button>
    </div>`;
  }
}
```

- **@Rune.UseEnables()**
  - View 에서 사용할 Enable 들을 등록하기 위한 데코레이터
  - Class 를 등록하면 View 내부에서 인스턴스화된다.

```ts
// app.enable.ts
import { Rune } from "rune-decorator/client";
import { Enable } from "rune-ts";
import style from "./app.page.module.scss";

export class AppEnable extends Enable {
  @Rune.On("click", `.${style.action}`)
  handleClick() {
    alert("Rune is working!");
  }
}

// app.page.ts
import { Html, html, Page } from "rune-ts";
import style from "./app.page.module.scss";
import { Rune } from "rune-decorator/client";
import { AppEnable } from "./app.enable";

export interface PageProps {
  message: string;
}

/**
 * UseEnables 데코레이터를 사용하여 AppEnable 을 등록
 */
@Rune.UseEnables([AppEnable])
@Rune.Page()
export class AppPage extends Page<PageProps> {
  constructor(props: PageProps) {
    super(props);
  }

  template(): Html {
    return html` <div class="${style.container}">
      <span class="${style.title}">${this.data.message}</span>
      <button class="${style.action}">Click</button>
    </div>`;
  }
}
```

- **@Rune.Navigator()**
  - 애플리케이션에 페이지들을 등록하기 위한 데코레이터
  - 해당 Navigator 를 Rune.Factory 에 등록하면 hydration 이 가능

```ts
import { AppPage } from "../page/app.page";
import { SubPage } from "../page/sub.page";
import { Rune } from "rune-decorator/client";

@Rune.Navigator({
  pages: [AppPage, SubPage],
})
export class AppNavigator {}
```

- **Client 실행**
  - client application의 진입점으로 AppNavigator 에 등록된 페이지들을 hydration 작업 등을 수행한다.

```ts
import "reflect-metadata";
import { Rune } from "rune-decorator/client";
import { AppNavigator } from "./client/app.navigator";

function bootstrap() {
  Rune.Factory.create(AppNavigator);
}

bootstrap();
```
