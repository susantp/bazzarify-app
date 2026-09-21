declare module "bun:test" {
  export const beforeEach: typeof import("@jest/globals").beforeEach;
  export const describe: typeof import("@jest/globals").describe;
  export const expect: typeof import("@jest/globals").expect;
  export const it: typeof import("@jest/globals").it;
  export const mock: {
    <T extends (...args: any[]) => any>(
      implementation?: T,
    ): T & {
      mockClear(): void;
    };
    module(moduleName: string, factory: () => unknown): void;
  };
}
