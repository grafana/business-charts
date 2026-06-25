import { CodeEditor } from '@grafana/ui';
import React from 'react';

type CodeEditorProps = React.ComponentProps<typeof CodeEditor>;

const defaultMinLines = 6;
const defaultMaxLines = 30;
const estimatedLineHeight = 20;

/**
 * Properties
 */
interface Props extends CodeEditorProps {
  minLines?: number;
  maxLines?: number;
}

/**
 * Lightweight autosize wrapper used by the options editors.
 */
export const AutosizeCodeEditor: React.FC<Props> = ({
  minLines = defaultMinLines,
  maxLines = defaultMaxLines,
  ...restProps
}) => {
  const content = typeof restProps.value === 'string' ? restProps.value : '';
  const lineCount = content.split('\n').length + 1;
  const boundedLines = Math.min(Math.max(lineCount, minLines), maxLines);
  const computedHeight = boundedLines * estimatedLineHeight;

  return <CodeEditor {...restProps} height={restProps.height ?? computedHeight} />;
};
