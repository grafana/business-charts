import { getAppEvents } from '@grafana/runtime';
import { sceneGraph } from '@grafana/scenes';
import { useCallback } from 'react';

/**
 * Use Dashboard Refresh
 */
export const useDashboardRefresh = () => {
  return useCallback(() => {
    const sceneContext = window.__grafanaSceneContext as Parameters<typeof sceneGraph.getTimeRange>[0] | undefined;

    /**
     * Refresh on scene dashboard
     */
    if (sceneContext) {
      return sceneGraph.getTimeRange(sceneContext)?.onRefresh();
    }

    /**
     * Refresh dashboard
     */
    return getAppEvents().publish({ type: 'variables-changed', payload: { refreshAll: true } });
  }, []);
};
