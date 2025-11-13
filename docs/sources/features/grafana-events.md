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

Grafana uses an event bus to publish application events for notifying different parts of Grafana when the user interacts with the chart. Business Charts panel can react to these actions by subscribing to one or more events.

{{< admonition type="note" >}}
The Business Charts 5.0.0 allows you to unsubscribe from events to avoid memory leaks by returning an [extended result object](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/features/extended-result/).
{{< /admonition >}}

## Predefined events

A full list of events is available in our [Grafana Crash Course](https://volkovlabs.io/grafana/developer/eventbus/).

## Subscribe to events

To subscribe and unsubscribe from events, you can create an extended result object.

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

## Panels interconnectivity in Grafana via EventBus

This article describes the possibility of using ECharts Instance, Grafana Events, and Extended Result for panel communication by sending and receiving events in Grafana.

[Panels interconnectivity in Grafana via EventBus](https://volkovlabs.io/blog/echarts-shared-crosshair-and-eventbus-20240520/)
