---
title: Business Charts
menuTitle: Business Charts
description: Learn how to integrate Apache ECharts library charts and graphs into your Grafana dashboard using the Business Charts panel.
---

# Business Charts

The Business Charts panel allows you to integrate charts and graphs created by the [Apache ECharts library](https://echarts.apache.org/en/index.html) into your Grafana dashboard.

Apache ECharts is a powerful and versatile data visualization library providing a wide range of chart types including statistical capabilities. It is written in pure JavaScript and based on [zrender](http://ecomfe.github.io/zrender/), a lightweight graphic library for chart rendering.

The Business Charts plugin offers an easy way of adding intuitive, interactive, and highly customizable charts to your Grafana dashboard.

## Requirements

- Business Charts panel 7.X requires **Grafana 11** or **Grafana 12**.
- Business Charts panel 6.X requires **Grafana 10** or **Grafana 11**.
- Apache ECharts panel 5.X requires **Grafana 9** or **Grafana 10**.
- Apache ECharts panel 3.X and 4.X require **Grafana 8.5** or **Grafana 9**.

## Getting started

You can install the Business Charts panel from the [Grafana Plugins catalog](https://grafana.com/grafana/plugins/volkovlabs-echarts-panel/) or using the Grafana command line tool.

{{< youtube id="1qYzHfPXJF8" >}}

_Install Business Suite plugins in Cloud, OSS, Enterprise. Getting started with the Business Suite._

For the latter, please use the following command.

```sh
grafana cli plugins install volkovlabs-echarts-panel
```

## Highlights

- Provides [Monaco Code Editor](https://microsoft.github.io/monaco-editor/) for:
  - Working with Grafana data frames (JavaScript).
  - Updating chart configurations in the JSON format.
  - Customizing theme configurations.
- Supports Code Editor suggestions for parameters and variables.
- Supports SVG and Canvas renderers.
- Supports variables and [locationService](https://grafana.com/docs/grafana/latest/developers/plugins/create-a-grafana-plugin/extend-a-plugin/add-support-for-variables/#set-a-variable-from-your-plugin) to make charts interactive.
- Includes USA and World GeoJSON maps. Additional maps can be loaded dynamically.
- Supports Baidu, Gaode, and Google Maps using API with required provision of the access key.
- Includes [ECharts-GL](https://github.com/ecomfe/echarts-gl) proving 3D plots, globe visualization, and WebGL acceleration.
- Includes [ecStat](https://github.com/ecomfe/echarts-stat), a statistical and data mining tool.
- Includes [Liquid Fill Chart](https://github.com/ecomfe/echarts-liquidfill) to represent data in percentage.
- Supports real-time data updates using streaming data sources and Grafana Live.
- Supports light and dark themes adjusted to the Grafana theme.
- Based on [Apache ECharts 5.5.1](https://github.com/apache/echarts/releases/tag/5.5.1).
- Provides 100+ ready-to-use examples at [echarts.volkovlabs.io](https://echarts.volkovlabs.io).
- Supports the [Wordcloud extension](https://github.com/ecomfe/echarts-wordcloud).

![A few examples of the Business Charts panel.](/media/docs/grafana/panels-visualizations/business-charts/business-charts.gif)

## Tutorial

This is the first video we created about Business Charts after the plugin rebranding. It features dazzling chart examples followed by a high-level plugin architecture. Knowing the basics of plugin architecture will help you create your custom charts.

To get you started quicker we prepared the [web resource](https://echarts.volkovlabs.io/) with numerous ready-to-use examples. In the video, Daria demonstrates how to work with this resource.

The main obstacle for many plugin users is the data transmission from the Grafana data frame(s) into the [Charts function](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/). In the video, in addition to the resource with how-to examples, Daria introduces the Visual Editor - the mechanism we started to work on to simplify the transmission.

{{< youtube id="adOjUxrfysc" >}}

We have many other tutorials that you can find helpful. You can review all related to this plugin tutorials [here](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/tutorials/).

## Documentation

| Section                       | Description                                                              |
| ----------------------------- | ------------------------------------------------------------------------ |
| [Charts function](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/)    | Explains how to configure the main Apache ECharts library function.      |
| [Visual editor](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/visual-editor/) | Explains how to work with the Visual Editor.                             |
| [Examples](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/examples/)          | Explains how to get started with the Apache ECharts Examples in Grafana. |
| [Features](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/features/)          | Demonstrates the Business Charts panel features.                         |
| [Maps](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/maps/)                  | Demonstrates how to work with different maps.                            |
| [Tutorials](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/tutorials/)        | Tutorials for the Business Charts panel.                                 |
| [Release notes](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/release/)      | Stay up to date with the latest features and updates.                    |

## Acknowledgment

The Apache Software Foundation Apache ECharts, ECharts, Apache, the Apache feather, and the Apache ECharts project logo are either registered trademarks or trademarks of the Apache Software Foundation.

## License

Apache License Version 2.0, see [LICENSE](https://github.com/grafana/business-charts/blob/main/LICENSE).
