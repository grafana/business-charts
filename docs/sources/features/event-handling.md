---
title: Event handling
description: Learn how to handle triggered events in Business Charts including brush events, click interactions, and user interface events.
weight: 50
---

# Event handling

You can handle specific events while viewing charts, for example, handle mouse events or any other event with the `context.panel.chart` ( early `echartsInstance` ) instance.

For more examples and detailed descriptions, please check the Apache ECharts documentation about [Events and Actions](https://apache.github.io/echarts-handbook/en/concepts/event/).

## Mouse click

To prevent the event handling multiple times, all previous event handlers may be disabled.

```js
/**
 * On Mouse Click
 */
context.panel.chart.off("click");
context.panel.chart.on("click", (params) => {
  context.grafana.notifySuccess(["Event", "On Click"]);
  context.panel.chart.resize(); // to redraw visualization
});
```

```js
/**
 * On Double Click
 */
context.panel.chart.off("dblclick");
context.panel.chart.on("dblclick", (params) => {
  context.panel.chart.resize();
});
```

## Update of time range

The Data Zoom feature allows you to select a time period on the chart for zooming in.

Once the time range is selected, the event can trigger the update of the dashboard's time range using the `context.grafana.locationService` parameter similar to the functionality in native Time Series panel.

![Data Zoom feature for Random Walk.](/media/docs/grafana/panels-visualizations/business-charts/data-zoom.png)

### Example

```js
const series = context.panel.data.series.map((s) => {
  const sData = s.fields.find((f) => f.type === "number").values;
  const sTime = s.fields.find((f) => f.type === "time").values;

  return {
    name: s.refId,
    type: "line",
    showSymbol: false,
    areaStyle: {
      opacity: 0.1,
    },
    lineStyle: {
      width: 1,
    },
    data: sData.map((d, i) => [sTime[i], d.toFixed(2)]),
  };
});

/**
 * Enable Data Zoom by default
 */
setTimeout(
  () =>
    context.panel.chart.dispatchAction({
      type: "takeGlobalCursor",
      key: "dataZoomSelect",
      dataZoomSelectActive: true,
    }),
  500
);

/**
 * Update Time Range on Zoom
 */
context.panel.chart.on("datazoom", function (params) {
  const startValue = params.batch[0]?.startValue;
  const endValue = params.batch[0]?.endValue;
  context.grafana.locationService.partial({ from: startValue, to: endValue });
});

return {
  backgroundColor: "transparent",
  tooltip: {
    trigger: "axis",
  },
  legend: {
    left: "0",
    bottom: "0",
    data: context.panel.data.series.map((s) => s.refId),
    textStyle: {
      color: "rgba(128, 128, 128, .9)",
    },
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: "none",
        icon: {
          zoom: "path://",
          back: "path://",
        },
      },
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "time",
  },
  yAxis: {
    type: "value",
    min: "dataMin",
  },
  grid: {
    left: "2%",
    right: "2%",
    top: "2%",
    bottom: 24,
    containLabel: true,
  },
  series,
};
```
