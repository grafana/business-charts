/**
 * Extend window interface
 */
interface Window {
  /**
   * Gaode Maps
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  AMap?: unknown;

  /**
   * Baidu Maps
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  BMap?: unknown;

  /**
   * Grafana scene context used by dashboard refresh.
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention
  __grafanaSceneContext?: unknown;
}

/**
 * Webpack require context typing.
 */
interface RequireContext {
  keys(): string[];
  <TModule = unknown>(id: string): TModule;
}

/**
 * Extend require with webpack context helper.
 */
interface Require {
  context(path: string, deep?: boolean, filter?: RegExp): RequireContext;
}
