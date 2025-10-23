# Business Charts for Grafana
[![CI](https://github.com/grafana/business-charts/actions/workflows/push.yml/badge.svg)](https://github.com/grafana/business-charts/actions/workflows/push.yml)
[![CD](https://github.com/grafana/business-charts/actions/workflows/publish.yml/badge.svg)](https://github.com/grafana/business-charts/actions/workflows/publish.yml)
[![License](https://img.shields.io/github/license/grafana/business-charts)](https://github.com/grafana/business-charts/blob/main/LICENSE)

>This project was originally contributed by [Volkov Labs](https://github.com/volkovlabs/business-charts) - thanks for all your great work!
>
>We have republished under the same plugin ID, keeping the community signature. This means you can simply update your plugin version. A new ID would have required manual updates to your dashboards. For additional information on the changes, see the [Notices](https://github.com/grafana/business-charts/blob/main/NOTICES).

This project is currently maintained by Grafana Labs. We welcome pull requests and will review them on a best-effort basis. If you're interested in taking on this project long-term, contact [integrations@grafana.com](mailto:integrations@grafana.com). We're eager to work with new maintainers and eventually hand over the project.

**Business Charts** is a powerful Grafana plugin that integrates the [Apache ECharts library](https://echarts.apache.org/en/index.html) to create dynamic, interactive visualizations for your dashboards. Built with pure JavaScript and lightweight rendering via [zrender](http://ecomfe.github.io/zrender/), this plugin offers a wide variety of chart types and advanced statistical tools to enhance business data analysis.

## 🚀 Key Features

- **Monaco Code Editor**: Customize charts using JavaScript for Grafana data frames, JSON for configurations, and theme adjustments.
- **Code Assistance**: Enjoy autocomplete for parameters and variables.
- **Rendering Options**: Choose between SVG and Canvas renderers for optimal performance.
- **Interactivity**: Leverage variables and [locationService](https://grafana.com/docs/grafana/latest/developers/plugins/create-a-grafana-plugin/extend-a-plugin/add-support-for-variables/#set-a-variable-from-your-plugin) for dynamic visualizations.
- **Maps**: Includes USA and World GeoJSON maps, with support for dynamically loading additional maps.
- **External Map APIs**: Integrate with Baidu, Gaode, and Google Maps (API key required).
- **Extensions**:
  - [ECharts-GL](https://github.com/ecomfe/echarts-gl): 3D plots, globe visualizations, and WebGL acceleration.
  - [ecStat](https://github.com/ecomfe/echarts-stat): Advanced statistical and data mining tools.
  - [Liquid Fill Chart](https://github.com/ecomfe/echarts-liquidfill): Visualize percentages with fluid animations.
  - [Wordcloud](https://github.com/ecomfe/echarts-wordcloud): Create engaging word cloud charts.
- **Real-Time Updates**: Support for streaming data sources and Grafana Live.
- **Theming**: Seamlessly adapts to Grafana’s light and dark themes.
- **ECharts Version**: Powered by [Apache ECharts 5.5.1](https://github.com/apache/echarts/releases/tag/5.5.1).

## 📋 Requirements

| Plugin Version             | Compatible Grafana Versions |
| -------------------------- | --------------------------- |
| **Business Charts 7.x**    | Grafana 11 or 12            |
| **Business Charts 6.x**    | Grafana 10 or 11            |
| **Apache ECharts 5.x**     | Grafana 9 or 10             |
| **Apache ECharts 3.x/4.x** | Grafana 8.5 or 9            |

## 🛠️ Installation

Install the Business Charts plugin via the [Grafana Plugins Catalog](https://grafana.com/grafana/plugins/volkovlabs-echarts-panel/) or using the Grafana CLI:

```bash
grafana-cli plugins install volkovlabs-echarts-panel
```

After installation, restart Grafana and add the **Business Charts** panel to your dashboard.

## 📚 Documentation

Dive into detailed guides to make the most of Business Charts:

| Section                                                                      | Description                                        |
| ---------------------------------------------------------------------------- | -------------------------------------------------- |
| [Charts Function](https://volkovlabs.io/plugins/business-charts/options/)    | Configure core Apache ECharts functions.           |
| [Visual Editor](https://volkovlabs.io/plugins/business-charts/visualeditor/) | Create charts effortlessly with the Visual Editor. |
| [Examples](https://volkovlabs.io/plugins/business-charts/examples/)          | Start with ready-made Apache ECharts examples.     |
| [Features](https://volkovlabs.io/plugins/business-charts/features/)          | Explore all plugin capabilities.                   |
| [Maps](https://volkovlabs.io/plugins/business-charts/maps/)                  | Learn to work with various map types.              |
| [Tutorials](https://volkovlabs.io/plugins/business-charts/tutorials/)        | Follow step-by-step guides.                        |
| [Release Notes](https://volkovlabs.io/plugins/business-charts/release/)      | Stay updated with the latest features and fixes.   |

## 🙏 Acknowledgments

Apache ECharts, ECharts, Apache, the Apache feather logo, and the Apache ECharts project logo are registered trademarks or trademarks of The Apache Software Foundation.

## 📜 License

This project is licensed under the [Apache License 2.0](https://github.com/grafana/business-charts/blob/main/LICENSE).
