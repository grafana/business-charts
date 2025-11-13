---
title: Baidu maps
menuTitle: Baidu
description: Learn how to use Baidu Maps API v3 with access keys for geographical visualization in business charts.
weight: 20
labels:
  products:
    - cloud
    - enterprise
    - oss
---

# Baidu maps

Baidu Maps is loaded via API v3 and require an access key.

## Access key

You can get the access key at [https://lbsyun.baidu.com/apiconsole/key#/home](https://lbsyun.baidu.com/apiconsole/key#/home).

## Demo

Try the panel with [Baidu Maps in the edit mode](https://echarts.volkovlabs.io/d/X1mkMIFVz/geo-map?orgId=1&editPanel=15).

## Features

- The loading of Baidu Maps takes around 2-3 seconds.
- The `bmapReady` callback function is executed during the loading. You can update the name in the panel options.
- During the loading, you can show an animation using the code below.

![Baidu Maps is supported from Business Charts panel 3.6.0.](/media/docs/grafana/panels-visualizations/business-charts/baidu.png)

## Example

```js
/**
 * Baidu Maps
 */
const bmap = {
  tooltip: {
    trigger: "item",
  },
  bmap: {
    zoom: 5,
    roam: true,
  },
};

/**
 * Loading
 */
const loading = {
  graphic: {
    elements: [
      {
        type: "group",
        left: "center",
        top: "center",
        children: new Array(7).fill(0).map((val, i) => ({
          type: "rect",
          x: i * 20,
          shape: {
            x: 0,
            y: -40,
            width: 10,
            height: 80,
          },
          style: {
            fill: "#5470c6",
          },
          keyframeAnimation: {
            duration: 1000,
            delay: i * 200,
            loop: true,
            keyframes: [
              {
                percent: 0.5,
                scaleY: 0.3,
                easing: "cubicIn",
              },
              {
                percent: 1,
                scaleY: 1,
                easing: "cubicOut",
              },
            ],
          },
        })),
      },
    ],
  },
};

/**
 * Maps are Ready
 */
window.bmapReady = () => {
  context.grafana.notifySuccess(["Baidu Maps", "Loaded..."]);
  context.panel.chart.setOption(bmap, (notmerge = true));
};

return window.BMap ? bmap : loading;
```
