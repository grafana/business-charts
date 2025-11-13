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

`setOption(options)` is the primary function in the Apache ECharts library. It is depicted as a square on the right in the schema below. This function gets called by the Business Charts panel (the Charts Function) with only one required parameter `options`.

The parameter `options` describes the charts in the JSON format.

## Getting started

To configure the Business Charts panel mainly means writing the Charts Function. Generally, this function contains two parts:

- JavaScript to read data points from the data source.
- JSON to specify a graph as `options`.

Both parts can use parameters passed into the Charts function. You can find the complete list of parameters in the table below.

See the schema and the print screen below for illustration.

![The Charts function receives many parameters from Grafana and sends one to the setOption() function.](/media/docs/grafana/panels-visualizations/business-charts/schema.png)

![The Charts function.](/media/docs/grafana/panels-visualizations/business-charts/charts-function.png)

## Options

The `return` clause is where you need to specify the `options` parameter to be passed into the `setOption(options)` Apache ECharts library function.

![The Business Charts panel provides the code editor to specify the Charts function.](/media/docs/grafana/panels-visualizations/business-charts/function.png)

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
| [`context.grafana.notifyError(['Header', 'Error Message'])`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#grafananotifyerrorheader-message)                                                                                                     | Display error notifications. |
| [`context.grafana.notifySuccess(['Header', 'Message'])`](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/context-parameters/#grafananotifysuccessheader-message)                                                                                                   | Display success notifications. |
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
