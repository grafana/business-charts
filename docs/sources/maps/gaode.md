---
title: Gaode maps
menuTitle: Gaode
description: Learn how to use Gaode Maps API v1.4.15 with access keys for geographical visualization in business charts.
weight: 30
labels:
  products:
    - cloud
    - enterprise
    - oss
---

# Gaode maps

Gaode Maps is loaded via API v1.4.15 and require an access key.

## Access key

You can get the access key at [https://console.amap.com/dev/key/app](https://console.amap.com/dev/key/app).

## Demo

Try the panel with [Gaode Maps in the edit mode](https://echarts.volkovlabs.io/d/X1mkMIFVz/geo-map?orgId=1&editPanel=17).

## Features

- The loading of Gaode Maps takes around 2-3 seconds.
- No callback function is available. You need to check the status using the timeout.
- During the loading, you can show an animation using the code below.
- You can load additional plugins through the panel options.

![Gaode Maps is supported from Business Charts panel 3.8.0.](/media/docs/grafana/panels-visualizations/business-charts/gaode.png)

## Example

```js
const amap = {
  backgroundColor: "transparent",
  amap: {
    viewMode: "3D",
    center: [108.39, 39.9],
    zoom: 4,
    resizeEnable: true,
    mapStyle: "amap://styles/dark",
    renderOnMoving: true,
    echartsLayerInteractive: true,
    largeMode: false,
  },
  series: [
    {
      type: "scatter",
      coordinateSystem: "amap",
      data: [
        [120, 30, 8],
        [120.1, 30.2, 20],
      ],
      encode: {
        value: 2,
      },
    },
  ],
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
amapReady = () => {
  if (!window.AMap) {
    return setTimeout(() => {
      amapReady();
    }, 100);
  }

  context.grafana.notifySuccess(["Gaode Maps", "Loaded..."]);
  context.panel.chart.setOption(amap, (notmerge = true));

  /**
   * Get AMap extension component
   */
  const amapComponent = context.panel.chart.getModel().getComponent("amap");
  const amapInstance = amapComponent.getAMap();
  amapInstance.addControl(new AMap.Scale());
  amapInstance.addControl(new AMap.ToolBar());

  /**
   * Add SatelliteLayer and RoadNetLayer to map
   */
  const satelliteLayer = new AMap.TileLayer.Satellite();
  const roadNetLayer = new AMap.TileLayer.RoadNet();
  amapInstance.add([satelliteLayer, roadNetLayer]);

  return;
};

setTimeout(() => {
  amapReady();
}, 100);

return loading;
```
