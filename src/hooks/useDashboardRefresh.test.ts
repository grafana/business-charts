import { EventBusSrv } from '@grafana/data';
import { getAppEvents } from '@grafana/runtime';
import { sceneGraph } from '@grafana/scenes';
import { renderHook } from '@testing-library/react';

import { useDashboardRefresh } from './useDashboardRefresh';

/**
 * Mock @grafana/scenes
 */
jest.mock('@grafana/scenes', () => ({
  sceneGraph: {
    getTimeRange: jest.fn(),
  },
}));

/**
 * Mock @grafana/runtime
 */
jest.mock('@grafana/runtime', () => ({
  ...jest.requireActual('@grafana/runtime'),
  getAppEvents: jest.fn(),
}));

describe('useDashboardRefresh', () => {
  /**
   * App Events
   */
  const appEvents = new EventBusSrv();

  /**
   * Enable Scene
   */
  const enableScene = () => {
    Object.defineProperty(global, '__grafanaSceneContext', {
      writable: true,
      value: {},
    });
  };

  beforeEach(() => {
    jest.mocked(getAppEvents).mockReturnValue(appEvents);
  });

  afterEach(() => {
    appEvents.removeAllListeners();
    Object.defineProperty(global, '__grafanaSceneContext', {
      writable: true,
      value: undefined,
    });
  });

  it('Should refresh non scene dashboard', () => {
    const { result } = renderHook(() => useDashboardRefresh());

    let refreshEvent;

    appEvents.getStream({ type: 'variables-changed' } as never).subscribe((event) => (refreshEvent = event));

    result.current();

    expect(refreshEvent).toEqual({
      type: 'variables-changed',
      payload: { refreshAll: true },
    });
  });

  it('Should refresh scene dashboard', () => {
    enableScene();

    const onRefresh = jest.fn();
    jest.mocked(sceneGraph.getTimeRange).mockReturnValue({ onRefresh } as never);

    const { result } = renderHook(() => useDashboardRefresh());

    result.current();

    expect(onRefresh).toHaveBeenCalled();
  });
});
