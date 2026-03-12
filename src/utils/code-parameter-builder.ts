import { CodeEditorSuggestionItem, CodeEditorSuggestionItemKind } from '@grafana/ui';

type CodeParametersNode = {
  detail?: string;
  items?: Record<string, CodeParameterItem<unknown> | CodeParametersNode>;
};

/**
 * Defines a single item exposed in the context payload.
 */
export class CodeParameterItem<T> {
  constructor(
    public readonly detail: string,
    public readonly kind: CodeEditorSuggestionItemKind = CodeEditorSuggestionItemKind.Property
  ) {}
}

/**
 * Builds editor suggestions from a nested context definition.
 */
export class CodeParametersBuilder<TConfig extends CodeParametersNode = CodeParametersNode> {
  public readonly suggestions: CodeEditorSuggestionItem[];

  constructor(config: TConfig) {
    this.suggestions = this.getSuggestions(config, 'context');
  }

  create<TContext extends object>(context: TContext): TContext {
    return context;
  }

  private getSuggestions(node: CodeParametersNode, path: string): CodeEditorSuggestionItem[] {
    const suggestions: CodeEditorSuggestionItem[] = [];

    if (!node.items) {
      return suggestions;
    }

    for (const [key, value] of Object.entries(node.items)) {
      const label = `${path}.${key}`;

      if (value instanceof CodeParameterItem) {
        suggestions.push({
          label,
          detail: value.detail,
          kind: value.kind,
        });
        continue;
      }

      suggestions.push({
        label,
        detail: value.detail ?? 'Nested context object.',
        kind: CodeEditorSuggestionItemKind.Property,
      });
      suggestions.push(...this.getSuggestions(value, label));
    }

    return suggestions;
  }
}
