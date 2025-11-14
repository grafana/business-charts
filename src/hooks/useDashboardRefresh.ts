import { getAppEvents } from '@grafana/runtime';
import { sceneGraph } from '@grafana/scenes';
import { useCallback } from 'react';

/**
 * Use Dashboard Refresh
 */
export const useDashboardRefresh = () => {
  return useCallback(() => {
    /**
     * Refresh on scene dashboard
     */
    if (window.__grafanaSceneContext) {
      return sceneGraph.getTimeRange(window.__grafanaSceneContext)?.onRefresh();
    }

    /**
     * Refresh dashboard
     */
    return getAppEvents().publish({ type: 'variables-changed', payload: { refreshAll: true } });
  }, []);
};
