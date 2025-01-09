import { Container as TypeDiContainer } from "typedi";
import { ClassConstructor } from "../../types";

/**
 * @summary
 * 의존성을 관리하는 컨테이너 클래스
 *
 * @description
 * 현재는 TypeDI를 사용하고 있지만, 추후 직접 구현을 위해 wrap한 클래스
 */
export class Container {
  /**
   * @todo
   * 현재는 클래스 타겟만 받지만, 추후 다양한 타겟을 받을 수 있도록 수정
   */
  resolve<T = any>(target: ClassConstructor<T>): T | null {
    try {
      return TypeDiContainer.get(target);
    } catch {
      return null;
    }
  }

  register(target: any, instance: any): void {
    TypeDiContainer.set(target, instance);
  }

  reset(): void {
    TypeDiContainer.reset();
  }
}
