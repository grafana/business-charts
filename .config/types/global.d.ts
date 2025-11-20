import { SceneObject } from '@grafana/scenes';

/**
 * __grafanaSceneContext type to prevent TS error
 */
declare global {
  interface Window {
    __grafanaSceneContext?: SceneObject;
  }
}
