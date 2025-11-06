---
title: Context parameters
description: Learn about the context parameters available in the Business Charts panel including echarts, ecStat, panel data, and Grafana services.
---

# Context parameters

## `context.echarts`

Apache ECharts library.

### Usage

```javascript
context.echarts;
```

### Example

```javascript
const libraryECharts = context.echarts;
```

## `context.ecStat`

A statistical and data mining tool for Apache ECharts.

### Usage

```javascript
context.ecStat;
```

### Example

```javascript
context.echarts.registerTransform(context.ecStat.transform.regression);
```

## Visual Editor

### `editor.dataset`

ECharts dataset in Visual mode.

#### Usage

```javascript
context.editor.dataset;
```

#### Example

```javascript
return {
  dataset: context.editor.dataset,
  series: context.editor.series,
  grid: {
    bottom: "3%",
    containLabel: true,
    left: "3%",
    right: "4%",
    top: "4%",
  },
  toolbox: {
    left: "center",
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      restore: {},
    },
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    type: "value",
  },
};
```

### `editor.series`

ECharts series in Visual mode.

#### Usage

```javascript
context.editor.series;
```

#### Example

```javascript
return {
  dataset: context.editor.dataset,
  series: context.editor.series,
  grid: {
    bottom: "3%",
    containLabel: true,
    left: "3%",
    right: "4%",
    top: "4%",
  },
  toolbox: {
    left: "center",
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      restore: {},
    },
  },
  xAxis: {
    type: "category",
  },
  yAxis: {
    type: "value",
  },
};
```

## Grafana

### `grafana.eventBus`

Publish and subscribe to application events.

#### Usage

```javascript
context.grafana.eventBus;
```

#### Example

```javascript
const subscriber = eventBus.getStream(RefreshEvent).subscribe(() => {
  // to do
});
```

### `grafana.locationService`

The `locationService` works with the browser location and history.

#### Usage

```javascript
context.grafana.locationService;
```

#### Example

```javascript
context.grafana.locationService.reload();

const history = context.grafana.locationService.history;
```

### `grafana.notifyError([header, message])`

Displays an error notification.

#### Usage

```javascript
context.grafana.notifyError([header, message]);
```

#### Example

```javascript
//
context.grafana.notifyError(["Error Title", `Show error message`]);
```

#### Arguments

- `header` _string_. Error title
- `message` _string_. Error message

### `grafana.notifySuccess([header, message])`

Displays a success notification.

#### Usage

```javascript
context.grafana.notifySuccess([header, message]);
```

#### Example

```javascript
context.grafana.notifySuccess(["Success Title", `Success message`]);
```

#### Arguments

- `header` _string_. Success title
- `message` _string_. Success message

### `grafana.refresh()`

Function to refresh dashboard panels using application events.

#### Usage

```javascript
context.grafana.refresh();
```

### `grafana.replaceVariables()`

The `replaceVariables()` function to interpolate variables.

#### Usage

```javascript
context.grafana.replaceVariables();
```

#### Example

```javascript
const variable = context.grafana.replaceVariables("${variable}");
console.log(variable.toUpperCase());
```

### `grafana.theme`

Contains grafana Theme object.

#### Usage

```javascript
context.grafana.theme;
```

#### Example

```javascript
const theme = context.grafana.theme;
console.log(theme);
```

## Panel

### `panel.chart`

Instance of the Apache ECharts library.

#### Usage

```javascript
context.panel.chart;
```

#### Example

```javascript
context.panel.chart.on("brushSelected", function (params) {
  var brushed = [];
  var brushComponent = params.batch[0];
  for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
    var rawIndices = brushComponent.selected[sIdx].dataIndex;
    brushed.push("[Series " + sIdx + "] " + rawIndices.join(", "));
  }
  context.panel.chart.setOption({
    title: {
      backgroundColor: "#333",
      text: "SELECTED DATA INDICES: \n" + brushed.join("\n"),
      bottom: 0,
      right: "10%",
      width: 100,
      textStyle: {
        fontSize: 12,
        color: "#fff",
      },
    },
  });
});
```

### `panel.data`

Object containing a time range, series, and request information.

#### Usage

```javascript
context.panel.data;
```

#### Example

```javascript
context.panel.data.series.map((s) => {
  categories = s.fields.find((f) => f.name === "Category").values;
  values = s.fields.find((f) => f.name === "Value").values;
});
```