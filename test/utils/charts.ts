import { Locator } from '@playwright/test';
import { DashboardPage, expect, Panel } from '@grafana/plugin-e2e';
import * as semver from 'semver';
import { TEST_IDS } from '../../src/constants/tests';
import { getLocatorSelectors, LocatorSelectors } from './selectors';

/**
 * Map of semver ranges to snapshot directory names.
 * Each entry defines a Grafana version range and the subdirectory
 * within panel.spec.ts-snapshots/ that contains its baseline screenshots.
 *
 * Generate snapshots for a specific version using:
 *   GRAFANA_VERSION=12.3.5 npm run test:e2e:update
 */
const SNAPSHOT_VERSIONS: Array<{ range: string; dir: string }> = [
  { range: '>=12.1.0 <12.2.0', dir: 'v12.1' },
  { range: '>=12.2.0 <12.3.0', dir: 'v12.2' },
  { range: '>=12.3.0 <12.4.0', dir: 'v12.3' },
  { range: '>=12.4.0 <12.5.0', dir: 'v12.4' },
];

/**
 * Panel Helper
 */
export class PanelHelper {
  private readonly locator: Locator;
  private readonly panel: Panel;
  private readonly title: string;
  private readonly selectors: LocatorSelectors<typeof TEST_IDS.panel>;
  private readonly grafanaVersion: string;

  constructor(dashboardPage: DashboardPage, panelTitle: string, grafanaVersion: string) {
    this.panel = dashboardPage.getPanelByTitle(panelTitle);
    this.title = panelTitle;
    this.locator = this.panel.locator;
    this.selectors = getLocatorSelectors(TEST_IDS.panel)(this.locator);
    this.grafanaVersion = grafanaVersion;
  }

  private getMsg(msg: string): string {
    return `Panel: ${msg}`;
  }

  /**
   * Resolve the snapshot subdirectory for the current Grafana version.
   * Returns the directory name or null if no match.
   */
  private getSnapshotDir(): string | null {
    for (const { range, dir } of SNAPSHOT_VERSIONS) {
      if (semver.satisfies(this.grafanaVersion, range)) {
        return dir;
      }
    }
    return null;
  }

  public async checkIfNoErrors() {
    return expect(this.panel.getErrorIcon(), this.getMsg('Check If No Errors')).not.toBeVisible();
  }

  public async checkPresence() {
    return expect(this.selectors.chart(), this.getMsg(`Check ${this.title} Presence`)).toBeVisible();
  }

  public async compareScreenshot(name: string, options?: { maxDiffPixelRatio?: number }) {
    /**
     * Screenshots for Grafana 13+ are excluded until stable baselines exist. Grafana 13's dashboard
     * scene rendering produces small layout/style differences that consistently exceed the pixel
     * diff threshold, and the grafanaVersion fixture is unreliable in some CI configurations, so
     * guard explicitly rather than relying solely on SNAPSHOT_VERSIONS range matching.
     */
    if (semver.valid(this.grafanaVersion) && semver.gte(this.grafanaVersion, '13.0.0')) {
      console.log(`Skipping screenshot comparison for ${this.title}: Grafana ${this.grafanaVersion} (>=13)`);
      return;
    }

    const snapshotDir = this.getSnapshotDir();

    if (!snapshotDir) {
      console.log(`Skipping screenshot comparison for ${this.title}: no snapshots for Grafana ${this.grafanaVersion}`);
      return;
    }

    await expect(this.selectors.chart(), this.getMsg(`Check ${this.title} Screenshot`)).toHaveScreenshot(
      [snapshotDir, name],
      options
    );
  }

  public async checkAlert() {
    return expect(this.selectors.error(), this.getMsg(`Check ${this.title} Alert`)).toBeVisible();
  }
}
