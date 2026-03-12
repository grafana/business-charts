import { Locator } from '@playwright/test';
import { DashboardPage, expect, Panel } from '@grafana/plugin-e2e';
import { TEST_IDS } from '../../src/constants/tests';
import { getLocatorSelectors, LocatorSelectors } from './selectors';

/**
 * Grafana versions that snapshots are validated against.
 * Semver entries match by major.minor (e.g. '12.4' matches '12.4.0', '12.4.1', etc.).
 * Non-semver entries match exactly (e.g. 'dev-preview-react19').
 * Snapshots are generated using Docker Linux with these specific versions.
 * Other versions will skip screenshot comparison and only verify chart presence.
 */
const SNAPSHOT_GRAFANA_VERSIONS = ['12.4', '13.0'];

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

  public async checkIfNoErrors() {
    return expect(this.panel.getErrorIcon(), this.getMsg('Check If No Errors')).not.toBeVisible();
  }

  public async checkPresence() {
    return expect(this.selectors.chart(), this.getMsg(`Check ${this.title} Presence`)).toBeVisible();
  }

  /**
   * Extract major.minor from a full version string (e.g. '12.4.0' -> '12.4')
   */
  private getMajorMinor(version: string): string {
    const parts = version.split('.');
    return `${parts[0]}.${parts[1]}`;
  }

  public async compareScreenshot(name: string, options?: { maxDiffPixelRatio?: number }) {
    const majorMinor = this.getMajorMinor(this.grafanaVersion);
    const isMatchingVersion =
      SNAPSHOT_GRAFANA_VERSIONS.includes(majorMinor) || SNAPSHOT_GRAFANA_VERSIONS.includes(this.grafanaVersion);

    if (!isMatchingVersion) {
      console.log(
        `Skipping screenshot comparison for ${this.title}: Grafana ${this.grafanaVersion} is not in snapshot versions [${SNAPSHOT_GRAFANA_VERSIONS.join(', ')}]`
      );
      return;
    }

    await expect(this.selectors.chart(), this.getMsg(`Check ${this.title} Screenshot`)).toHaveScreenshot(name, options);
  }

  public async checkAlert() {
    return expect(this.selectors.error(), this.getMsg(`Check ${this.title} Alert`)).toBeVisible();
  }
}
