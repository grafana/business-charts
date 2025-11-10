---
title: Variables
description: Learn how to replace dashboard and global variables in business charts using the replaceVariables function.
weight: 130
labels:
  products:
    - cloud
    - enterprise
    - oss
---

# Variables

Use the `context.grafana.replaceVariables()` function to replace dashboard and global variables.

```javascript
const email = context.grafana.replaceVariables("${__user.email}");
```

You can get familiar with three types of variables in our [Grafana Crash Course](https://volkovlabs.io/grafana/variables/).

## Replace variables

In the following example, we replaced the series's name with a value from the variable.

![Replace Dashboard Variables.](/media/docs/grafana/panels-visualizations/business-charts/variables.png)

### Example

```js
let names = [];
let amounts = [];

context.panel.data.series.map((s) => {
  names = s.fields.find((f) => f.name === "Name").values;
  amounts = s.fields.find((f) => f.name === "Amount").values;
});

return {
  grid: {
    bottom: "3%",
    containLabel: true,
    left: "3%",
    right: "4%",
    top: "4%",
  },
  tooltip: {},
  legend: {},
  xAxis: {
    data: names,
  },
  yAxis: {},
  toolbox: { feature: { restore: {} } },
  series: [
    {
      name: context.grafana.replaceVariables("$var"),
      type: "bar",
      data: amounts,
    },
  ],
};
```

## Update variables

You can update dashboard variables with [event handlers](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/features/event-handling/), where

- `name` is the name of the variable. Add `var-` to update the variable value in the URL.
- `value` is the updated value.

```js
context.panel.chart.on("click", (params) => {
  context.grafana.locationService.partial({ "var-name": value }, true);
});
```
