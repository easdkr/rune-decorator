# rune-decorator

> 전체 예시는 [여기](https://github.com/easdkr/rune-decorator-example)에서 확인할 수 있습니다.

### Client

#### @Rune.Page()

- hydrate 할 페이지를 애플리케이션에 등록하기 위한 데코레이터입니다.
- key 를 지정하지 않으면 클래스명을 key 로 hydration 을 위한 페이지를 찾습니다.

```ts
import { Html, html, Page } from "rune-ts";
import style from "./app.page.module.scss";
import { Rune } from "rune-decorator/client";

export interface PageProps {
  key: string;
}

/**
 * Page 데코레이터를 사용하여 애플리케이션에 페이지를 등록합니다.
 * 데코레이터의 인자로 key 를 지정하지 않으면 클래스명을 key 로 사용하여 페이지를 찾습니다.
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

#### @Rune.UseEnables()

- View 에서 사용할 Enable 들을 등록하기 위한 데코레이터입니다.
- Enable Class 를 등록하면 View 내부에서 등록된 Enable 이 인스턴스화 되어 사용할 수 있습니다.

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
 * UseEnables 데코레이터를 사용하여 AppEnable 을 등록합니다.
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

#### @Rune.Navigator()

- 애플리케이션에 페이지들을 등록하기 위한 데코레이터입니다.
- client의 entry에서 해당 Navigator 를 Rune.Factory 에 등록하면 페이지들이 필요한 시점에 hydration 됩니다.

```ts
import { AppPage } from "../page/app.page";
import { SubPage } from "../page/sub.page";
import { Rune } from "rune-decorator/client";

@Rune.Navigator({
  pages: [AppPage, SubPage], // 등록할 페이지 클래스 목록을 지정합니다.
})
export class AppNavigator {}
```

#### Client 실행

- client application의 진입점으로 AppNavigator 에 등록된 페이지들을 hydration 작업 등을 수행합니다.

```ts
import { Rune } from "rune-decorator/client";
import { AppNavigator } from "./client/app.navigator";

function bootstrap() {
  Rune.Factory.create(AppNavigator);
}

bootstrap();
```

### Server

#### @Injectable()

- rune 서버 애플리케이션에서 사용할 클래스를 등록하기 위한 데코레이터입니다.
- Injectable 데코레이터를 사용하여 애플리케이션을 등록하면 singleton 으로 사용할 수 있습니다.

```ts
import { Injectable } from "rune-decorator/server";

@Injectable()
export class AppService {
  getHello(): string {
    return "Hello World!";
  }
}
```

#### @Controller()

- rune 서버 애플리케이션에서 외부 클라이언트의 요청을 처리하기 위한 데코레이터입니다.
- Controller 데코레이터를 사용하여 애플리케이션을 등록하고 routing 데코레이터를 사용하여 라우팅을 지정할 수 있습니다.
- Controller 의 라우터 함수에서 rune page 를 반환하면 해당 페이지가 MetaView 로 warping 되어 클라이언트에 페이지가 렌더링됩니다.

```ts
import { Controller, Get } from "rune-decorator/server";
import { AppService } from "./app.service";
import { AppPage } from "../pages/app.page";

@Controller("")
export class AppController {
  // @Injectable 데코레이터로 등록된 클래스를 주입받을 수 있습니다.
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): AppPage {
    const page = new AppPage({ message: this.appService.getHello() });

    return page;
  }
}
```

#### @Get(), @Post(), @Put(), @Delete()

- rune 서버 애플리케이션에서 외부 클라이언트의 요청을 처리하는 라우터 함수를 지정하기 위한 데코레이터입니다.
- 해당 데코레이터의 파라미터로 path를 지정하면 클라이언트가 해당 path로 요청시 등록된 라우터 함수가 실행됩니다.

#### @Module()

- rune 서버 애플리케이션이 애플리케이션 구조를 만들 때 사용하는 데코레이터입니다.
- 해당 데코레이터의 provider, controller 클래스들의 인스턴스가 생성되어 애플리케이션에 등록됩니다.

```ts
import { Module } from "rune-decorator/server";

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

- Server 실행
  - server application의 진입점으로 AppModule 을 RuneApplication 에 등록하면 서버가 실행됩니다.

```ts
import { RuneApplication } from "rune-decorator/server";
import { AppModule } from "./app.module";
import { app } from "@rune-ts/server";

function bootstrap() {
  const rune = RuneApplication.create(app(), AppModule);
}

bootstrap();
```

#### Parameter Decorator

- rune 서버 애플리케이션에서 외부 클라이언트의 요청을 처리할 때, 요청의 파라미터를 받아오기 위한 데코레이터 목록입니다.

  - @Query() : query string 을 받아오기 위한 데코레이터입니다.
  - @Body() : body 를 받아오기 위한 데코레이터입니다.
  - @Param() : path parameter 를 받아오기 위한 데코레이터입니다.
  - @Req() : request 객체를 받아오기 위한 데코레이터입니다. (express request 객체)
  - @Res() : response 객체를 받아오기 위한 데코레이터입니다. (express response 객체)
  - @Headers() : request headers 를 받아오기 위한 데코레이터입니다.
