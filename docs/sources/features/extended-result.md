---
title: Extended result
description: Learn how to return extended result objects with additional properties and subscribe functions for enhanced chart functionality.
weight: 60
---

# Extended result

{{< admonition type="note" >}}
The Business Charts panel supports the extended result object starting from version 5.0.0.
{{< /admonition >}}

The extended result object allows you to return:

- Configuration
- Options
- Unsubscribe function

```json
return {
  version: 2,
  config: { notMerge: true },
  option: {
    tooltip: {
      formatter: '{a} <br/>{b} : {c}%'
    },
    series: [
      {
        name: 'Pressure',
        type: 'gauge',
        detail: {
          formatter: '{value}'
        },
        data: [
          {
            value: 50,
            name: 'SCORE'
          }
        ]
      }
    ]
  },
  unsubscribe: () => {
    console.log('unsubscribeFunction')
  }
};
```

## Version

The version is reserved for future improvements. The only supported version is 2.

## Configuration

| Option       | Description                                                                            | Default |
| ------------ | -------------------------------------------------------------------------------------- | ------- |
| `lazyUpdate` | Specifies whether it's required to update the modified chart instantly or not.         | `false` |
| `notMerge`   | Specifies whether it's required to merge the current option with a previous one.       | `true`  |
| `silent`     | Specifies whether it's required to prevent triggering events when calling `setOption`. | `false` |

{{< admonition type="note" >}}
To find more details on configuration options, please see the [Apache ECharts library documentation](https://echarts.apache.org/en/api.html#echartsInstance.setOption).
{{< /admonition >}}

## Option

The option is the chart configuration in the JSON format described in the [Charts Functions](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/charts-function/).

## Unsubscribe

The unsubscribe section allows the addition of JavaScript code which is executed before the object is destroyed.

One of the use cases relates to unsubscription from [Grafana events using an event bus](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/features/grafana-events/).
