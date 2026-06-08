/**
 * Inlined from @volkovlabs/jest-selectors to remove the dependency.
 * See: https://github.com/grafana/volkov-packages/tree/main/packages/jest-selectors
 */
import { BoundFunctions, GetByBoundAttribute, Queries, Screen } from '@testing-library/react';

/**
 * Jest Selector
 */
type JestSelector<TArgs extends unknown[]> = (
  noThrowOnNotFound?: boolean,
  ...args: TArgs
) => ReturnType<GetByBoundAttribute>;

/**
 * Check If Selector Object
 */
type IsSelectorObject<TCandidate> = TCandidate extends {
  selector: (...args: unknown[]) => void;
  apply: (...args: unknown[]) => void;
}
  ? TCandidate & { selector: TCandidate['selector']; apply: TCandidate['apply'] }
  : never;

/**
 * Jest Selectors
 */
export type JestSelectors<T> = {
  [K in keyof T]: T[K] extends (...args: infer Args) => void
    ? JestSelector<Args>
    : T[K] extends IsSelectorObject<T[K]>
      ? JestSelector<Parameters<T[K]['selector']>>
      : JestSelector<[]>;
};

/**
 * Selector Function
 */
export type SelectorFn = (...args: unknown[]) => string;

/**
 * Get Jest Selectors
 * @param selectors
 * @param enforceTestIdSelectorForKeys
 */
export const getJestSelectors =
  <TSelectors extends Record<keyof TSelectors, TSelectors[keyof TSelectors]>>(
    selectors: TSelectors,
    enforceTestIdSelectorForKeys: Array<keyof TSelectors> = []
  ): ((screen: Screen | BoundFunctions<Queries>) => JestSelectors<TSelectors>) =>
  (screen) => {
    return Object.entries(selectors).reduce((acc, [key, selector]) => {
      /**
       * Get Element function
       * @param noThrowOnNotFound
       * @param args
       */
      const getElement = (noThrowOnNotFound = false, ...args: unknown[]) => {
        const getValue = typeof selector === 'object' && 'selector' in selector ? selector.selector : selector;
        const value = typeof getValue === 'function' ? getValue(...args) : getValue;

        if (value.startsWith('data-testid') || enforceTestIdSelectorForKeys.includes(key as keyof TSelectors)) {
          return noThrowOnNotFound ? screen.queryByTestId(value) : screen.getByTestId(value);
        }

        return noThrowOnNotFound ? screen.queryByLabelText(value) : screen.getByLabelText(value);
      };

      return {
        ...acc,
        [key]: getElement,
      };
    }, {} as JestSelectors<TSelectors>);
  };

/**
 * Create Selector
 * Function overloading for correct parameters types
 * @param selector
 * @param propName
 */
function createSelector<TSelector extends string>(
  selector: TSelector,
  propName?: string
): { selector: () => string; apply: () => Record<string, string> };
function createSelector<TSelector extends SelectorFn>(
  selector: TSelector,
  propName?: string
): { selector: typeof selector; apply: (...args: Parameters<TSelector>) => Record<string, string> };
function createSelector<TSelector extends () => string>(
  selector: TSelector,
  propName?: string
): { selector: unknown; apply: (...args: unknown[]) => Record<string, string> } {
  const selectorFn = typeof selector === 'string' ? () => selector as string : selector;

  let attrName = 'aria-label';

  /**
   * Attribute name for selector apply
   */
  if (propName) {
    attrName = propName;
  } else if (selectorFn().startsWith('data-testid')) {
    attrName = 'data-testid';
  }

  return {
    selector: selectorFn,
    apply: (...args: Parameters<typeof selectorFn>) => ({
      [attrName]: selectorFn(...args),
    }),
  };
}

export { createSelector };
