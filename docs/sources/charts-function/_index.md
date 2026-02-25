---
title: Charts function
description: Learn how to configure the charts function in the Business Charts panel, including the setOption() function, available parameters, and JavaScript code examples.
weight: 100
labels:
  products:
    - cloud
    - enterprise
    - oss
---

# Charts function

The `setOption(options)` function is the primary method in the Apache ECharts library. The Business Charts panel calls this function with one required parameter: `options`.

The `options` parameter describes the chart in JSON format.

## Getting started

To configure the Business Charts panel, write the Charts Function. This function usually has two parts:

- JavaScript to read data points from the data source
- JSON to specify a graph as `options`

Both parts can use parameters passed into the Charts function. The following table lists all available parameters.

See the following schema and screenshot for illustration.

{{< figure src="/media/docs/grafana/panels-visualizations/business-charts/schema.png" class="border" alt="The Charts function receives many parameters from Grafana and sends one to the setOption() function." >}}

{{< figure src="/media/docs/grafana/panels-visualizations/business-charts/charts-function.png" class="border" alt="The Charts function." >}}

## Options

Specify the `options` parameter in the `return` clause. This parameter is passed to the `setOption(options)` function in the Apache ECharts library.

{{< figure src="/media/docs/grafana/panels-visualizations/business-charts/function.png" class="border" alt="The Business Charts panel provides the code editor to specify the Charts function." >}}

## Parameters

<!-- prettier-ignore-start -->

| Parameter                                                                                                                           | Description                                      |
| ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| [`context.echarts`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#contextecharts) | Apache ECharts library. |
| [`context.ecStat`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#contextecstat)   | A statistical and data mining tool for Apache ECharts. |
| [`context.editor.dataset`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#editordataset) | **[Visual mode]** ECharts dataset. |
| [`context.editor.series`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#editorseries) | **[Visual mode]** ECharts series. |
| [`context.grafana.eventBus`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#grafanaeventbus) | Publish and subscribe to application events. |
| [`context.grafana.locationService`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#grafanalocationservice) | Works with browser location and history. |
| [`context.grafana.notifyError(['header', 'message'])`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#grafananotifyerrorheader-message)                                                                                                     | Display error notifications. |
| [`context.grafana.notifySuccess(['header', 'message'])`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#grafananotifysuccessheader-message)                                                                                                   | Display success notifications. |
| [`context.grafana.refresh()`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#grafanarefresh) | Function to refresh dashboard panels using application events. |
| [`context.grafana.replaceVariables()`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#grafanareplacevariables) | Function to interpolate variables. |
| [`context.grafana.theme`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#grafanatheme) | Theme object. |
| [`context.panel.chart`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#panelchart) | Instance of the Apache ECharts library. See the example in the screenshot above. |
| [`context.panel.data`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#paneldata) | Object containing a time range, series, and request information. |

<!-- prettier-ignore-end -->

### Inspect

To inspect those parameters, use the browser's developer console.

```javascript
console.log(
  context.panel.data,
  context.grafana.theme,
  context.panel.chart,
  context.echarts,
  context.grafana.replaceVariables,
  context.grafana.locationService
);
```

## Notifications

You can display success and error notifications when handling specific events.

```javascript
context.grafana.notifySuccess(["Update", "Values updated successfully."]);
context.grafana.notifyError([
  "Update",
  `An error occurred while updating values.`,
]);
```
