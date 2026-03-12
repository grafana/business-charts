import { CodeEditor } from '@grafana/ui';
import React from 'react';

type Props = React.ComponentProps<typeof CodeEditor> & {
  maxLines?: number;
  minLines?: number;
};

const DEFAULT_MIN_LINES = 6;
const DEFAULT_MAX_LINES = 30;
const ESTIMATED_LINE_HEIGHT = 20;

/**
 * Lightweight autosize wrapper used by the options editors.
 */
export const AutosizeCodeEditor: React.FC<Props> = ({
  value,
  height,
  minLines = DEFAULT_MIN_LINES,
  maxLines = DEFAULT_MAX_LINES,
  ...restProps
}) => {
  const content = typeof value === 'string' ? value : '';
  const lineCount = content.split('\n').length + 1;
  const boundedLines = Math.min(Math.max(lineCount, minLines), maxLines);
  const computedHeight = `${boundedLines * ESTIMATED_LINE_HEIGHT}px`;

  return <CodeEditor value={value} height={height ?? computedHeight} {...restProps} />;
};
