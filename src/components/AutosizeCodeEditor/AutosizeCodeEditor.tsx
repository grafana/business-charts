import { CodeEditor } from '@grafana/ui';
import React from 'react';

type Props = React.ComponentProps<typeof CodeEditor> & {
  maxLines?: number;
  minLines?: number;
};

const defaultMinLines = 6;
const defaultMaxLines = 30;
const estimatedLineHeight = 20;

/**
 * Lightweight autosize wrapper used by the options editors.
 */
export const AutosizeCodeEditor: React.FC<Props> = ({
  value,
  height,
  minLines = defaultMinLines,
  maxLines = defaultMaxLines,
  ...restProps
}) => {
  const content = typeof value === 'string' ? value : '';
  const lineCount = content.split('\n').length + 1;
  const boundedLines = Math.min(Math.max(lineCount, minLines), maxLines);
  const computedHeight = `${boundedLines * estimatedLineHeight}px`;

  return <CodeEditor value={value} height={height ?? computedHeight} {...restProps} />;
};
