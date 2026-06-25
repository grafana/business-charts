---
title: Examples
description: Learn how to get started with recovered Apache ECharts example dashboards and copy Charts function code into your panels.
weight: 300
labels:
  products:
    - cloud
    - enterprise
    - oss
---

# Examples

The original Business Charts demo site was hosted externally and was taken down when Volkov Labs discontinued support for this plugin.

This repository includes recovered example dashboards under the [`echarts/`](https://github.com/grafana/business-charts/tree/main/echarts) directory. Each dashboard contains one or more Business Charts panels with ready-to-use [Charts function](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/) code.

## Browse examples locally

The fastest way to explore the examples is to run the local Grafana development environment:

```sh
npm install
npm run build
npm run start:dev
```

Open Grafana at `http://localhost:3000`, then go to **Dashboards** and open the **echarts** folder. The **Home** dashboard is the default landing page.

The example dashboards are provisioned from the `echarts/` directory in this repository. Each JSON file is a dashboard; open a panel in edit mode to inspect or copy its Charts function.

## Get started

1. Find a chart similar to the one you want to build in the **echarts** folder, or browse the [`echarts/`](https://github.com/grafana/business-charts/tree/main/echarts) directory on GitHub.
1. Open the dashboard and panel in edit mode.
   - On the right, find the **Code** section, then the **Function** parameter. This is the [Charts function](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/).
   - Review and experiment with the code.
   - Copy the Charts function code (everything in the **Function** parameter).
1. Paste the copied code into the code editor of your Business Charts visualization panel.
1. Refresh the chart to update its state if it does not render instantly.

{{< figure src="/media/docs/grafana/panels-visualizations/business-charts/copy-paste.gif" class="border" alt="To get started: copy from one of the examples and paste to your dashboard." >}}

If you do not run the local development environment, you can still copy Charts function code directly from the `getOption` field in the example dashboard JSON files under `echarts/`.

## Available example dashboards

| Dashboard | Chart types |
| --------- | ----------- |
| [Home](https://github.com/grafana/business-charts/blob/main/echarts/home.json) | Overview and links to other examples |
| [3D Bar / Scatter / Surface](https://github.com/grafana/business-charts/blob/main/echarts/3d.json) | 3D bar, scatter, and surface charts |
| [Bar](https://github.com/grafana/business-charts/blob/main/echarts/bar.json) | Bar and column charts |
| [Boxplot](https://github.com/grafana/business-charts/blob/main/echarts/boxplot.json) | Boxplot charts |
| [Calendar](https://github.com/grafana/business-charts/blob/main/echarts/calendar.json) | Calendar heatmaps |
| [Candlestick](https://github.com/grafana/business-charts/blob/main/echarts/candlestick.json) | Candlestick and financial charts |
| [Gauge](https://github.com/grafana/business-charts/blob/main/echarts/gauge.json) | Gauge and progress charts |
| [Geo/Map](https://github.com/grafana/business-charts/blob/main/echarts/geo-map.json) | GeoJSON and map visualizations |
| [Graph](https://github.com/grafana/business-charts/blob/main/echarts/graph.json) | Graph and network charts |
| [Imports](https://github.com/grafana/business-charts/blob/main/echarts/imports.json) | Library import examples |
| [Line](https://github.com/grafana/business-charts/blob/main/echarts/line.json) | Line and area charts |
| [Liquid Fill](https://github.com/grafana/business-charts/blob/main/echarts/liquid-fill.json) | Liquid fill charts |
| [Pie](https://github.com/grafana/business-charts/blob/main/echarts/pie.json) | Pie and donut charts |
| [Radar](https://github.com/grafana/business-charts/blob/main/echarts/radar.json) | Radar charts |
| [Sankey](https://github.com/grafana/business-charts/blob/main/echarts/sankey.json) | Sankey diagrams |
| [Scatter](https://github.com/grafana/business-charts/blob/main/echarts/scatter.json) | Scatter plots |
| [Sunburst](https://github.com/grafana/business-charts/blob/main/echarts/sunburst.json) | Sunburst charts |
| [Treemap](https://github.com/grafana/business-charts/blob/main/echarts/treemap.json) | Treemap charts |

## Adapt charts from Apache ECharts

You can also start from any chart on the [Apache ECharts examples site](https://echarts.apache.org/examples/en/index.html). Copy the example `option` object and paste it into a Business Charts panel **Function** parameter with one change: replace `option = { ... }` with `return { ... };`.

For example, the [Basic Radar Chart](https://echarts.apache.org/examples/en/editor.html?c=radar) becomes:

```js
return {
  legend: {
    data: ['Allocated Budget', 'Actual Spending'],
  },
  radar: {
    indicator: [
      { name: 'Sales', max: 6500 },
      { name: 'Administration', max: 16000 },
      { name: 'Information Technology', max: 30000 },
      { name: 'Customer Support', max: 38000 },
      { name: 'Development', max: 52000 },
      { name: 'Marketing', max: 25000 },
    ],
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget',
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending',
        },
      ],
    },
  ],
};
```

The recovered **Radar** example dashboard includes this chart and several more advanced radar variants.
