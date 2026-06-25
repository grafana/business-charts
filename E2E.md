# E2E

## Installation

Install chromium with `npx playwright install` or `npm run test:e2e:install`.

If you are unable to install playwright browsers and the installation hangs indefinitely, you can install your own
browser and run `test:e2e:local:chrome:debug` (on *nix) for local playwright development to debug via the --ui or
--debug flags.
See playwright [channel docs](https://playwright.dev/docs/browsers#google-chrome--microsoft-edge) for running tests
against other locally installed browsers.

## Examples

Check for flake with traces against local chrome:

* `npm run test:e2e:local:chrome -- --repeat-each=10 --trace=on`

Set workers (--maxWorkers 4)

* `npm run test:e2e:local:chrome -- --maxWorkers 1 --repeat-each=10 --trace=on`
