/**
 * Extend window interface
 */
interface Window {
  /**
   * Gaode Maps
   */
  AMap?: unknown;

  /**
   * Baidu Maps
   */
  BMap?: unknown;

  /**
   * Grafana scene context used by dashboard refresh.
   */
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
