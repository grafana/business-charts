---
title: Grafana events
description: Learn how to handle Grafana events using the EventBus for publishing and subscribing to application events.
weight: 70
labels:
  products:
    - cloud
    - enterprise
    - oss
---

# Grafana events

Grafana uses an event bus to publish application events and notify different parts of Grafana when users interact with a chart. The Business Charts panel can react to these actions by subscribing to one or more events.

{{< admonition type="note" >}}
Business Charts 5.0.0 lets you unsubscribe from events to avoid memory leaks by returning an [extended result object](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/features/extended-result/).
{{< /admonition >}}

## Predefined events

A full list of events is available in the [Grafana Crash Course](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/exploring-eventbus/).

## Subscribe to events

To subscribe and unsubscribe from events, create an extended result object.

```
const subscription = context.grafana.eventBus.subscribe({ type: 'data-hover' }, () => {
  console.log('React to Data Hover')
})

return {
  version: 2,
  config: { notMerge: true },
  option: {},
  unsubscribe: () => {
    subscription.unsubscribe();
    console.log('Unsubscribed');
  }
}
```
