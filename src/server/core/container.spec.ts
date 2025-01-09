import { Container } from "./container";

describe(Container.name, () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
  });

  describe("resolve", () => {
    it("class 의존성 처리", () => {
      // Given
      class TestClass {}
      const instance = new TestClass();
      container.register(TestClass, instance);

      // When
      const result = container.resolve(TestClass);

      // Then
      expect(result).toBe(instance);
    });
  });

  describe("register", () => {
    it("class 의존성 등록", () => {
      // Given
      class TestClass {}
      const instance = new TestClass();

      // When
      container.register(TestClass, instance);
      const result = container.resolve(TestClass);

      // Then
      expect(result).toBe(instance);
    });
  });
});
