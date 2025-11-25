import { SelectableValue } from '@grafana/data';

import { SunburstSeriesOptions } from '../types';

/**
 * Sunburst label rotate
 */
export enum SunburstLabelRotate {
  RADIAL = 'radial',
  TANGENTIAL = 'tangential',
}

/**
 * Sunburst emphasis focus option
 */
export enum SunburstEmphasisFocusOption {
  SELF = 'self',
  SERIES = 'series',
  ANCESTOR = 'ancestor',
  DESCENDANT = 'descendant',
  NONE = 'none',
}

/**
 * Sunburst sort option
 */
export enum SunburstSortOption {
  ASC = 'asc',
  DESC = 'desc',
  NONE = 'none',
}

/**
 * Sunburst label rotate options
 */
export const SUNBURST_LABEL_ROTATE_OPTIONS: SelectableValue[] = [
  {
    description: 'Radial',
    label: 'Radial',
    value: SunburstLabelRotate.RADIAL,
  },
  {
    description: 'Tangential',
    label: 'Tangential',
    value: SunburstLabelRotate.TANGENTIAL,
  },
];

/**
 * Sunburst sort options
 */
export const SUNBURST_SORT_OPTIONS: SelectableValue[] = [
  {
    description: 'Ascending order.',
    label: 'A to Z',
    value: SunburstSortOption.ASC,
  },
  {
    description: 'Descending order.',
    label: 'Z to A',
    value: SunburstSortOption.DESC,
  },
  {
    description: 'Sorting disabled.',
    label: 'None',
    value: SunburstSortOption.NONE,
  },
];

/**
 * Show label options
 */
export const SUNBURST_SHOW_LABEL_OPTIONS: SelectableValue[] = [
  {
    description: 'Show label',
    label: 'True',
    value: true,
  },
  {
    description: 'Hide Label',
    label: 'False',
    value: false,
  },
];

/**
 * Sunburst focus options
 */
export const SUNBURST_EMPHASIS_FOCUS_OPTIONS: SelectableValue[] = [
  {
    description: 'Focus on all ancestor nodes.',
    label: 'Ancestor',
    value: SunburstEmphasisFocusOption.ANCESTOR,
  },
  {
    description: 'Focus on all descendants nodes.',
    label: 'Descendants',
    value: SunburstEmphasisFocusOption.DESCENDANT,
  },
  {
    description: 'Do not fade out other data, it`s by default.',
    label: 'None',
    value: SunburstEmphasisFocusOption.NONE,
  },
  {
    description: 'Only focus (not fade out) the element of the currently highlighted data.',
    label: 'Self',
    value: SunburstEmphasisFocusOption.SELF,
  },
  {
    description: 'Focus on all elements of the series which the currently highlighted data belongs to.',
    label: 'Series',
    value: SunburstEmphasisFocusOption.SERIES,
  },
];

/**
 * Sunburst Default
 */
export const SUNBURST_DEFAULT: SunburstSeriesOptions = {
  groups: [],
  sort: SunburstSortOption.DESC,
  label: {
    show: true,
    rotate: SunburstLabelRotate.RADIAL,
  },
  emphasis: {
    focus: SunburstEmphasisFocusOption.NONE,
  },
  innerRadius: '0',
  outerRadius: '100%',
  levelValue: '1',
};
