---
title: Exploring variables
description: Learn how dashboard, global, and environment variables work in Grafana, how they differ, and where to find more examples.
weight: 690
labels:
  products:
    - cloud
    - enterprise
    - oss
---

# Exploring variables

Variables in Grafana come in three types: dashboard, global, and environment.
This page breaks them down and shows how they fit into your Grafana deployment.

{{< figure src="/media/docs/grafana/panels-visualizations/business-charts/variables.png" class="border" alt="Three layers of variables in Grafana." >}}

## Your video guide to variables

This video walks through dashboard, global, and environment variables step by step:

{{< youtube id="sczRq2lI3e4" >}}

## Dashboard variables

Dashboard variables live within a single dashboard, powering filters and dynamic controls.
They are your go-to for tailoring what users see.

{{< figure src="/media/docs/grafana/panels-visualizations/business-charts/variables-edit.png" class="border" alt="Different types of dashboard variables." >}}

## Global variables

Global variables tap into Grafana-wide settings, ready to use across your dashboards.
This is a list of the most common ones:

| Variable          | Description                        |
| ----------------- | ---------------------------------- |
| `${__dashboard}`  | Name of the current dashboard      |
| `${__from}`       | Start of the time range (epoch ms) |
| `${__interval}`   | Time grouping parameter            |
| `${__org.name}`   | Name of the current organization   |
| `${__org}`        | ID of the current organization     |
| `${__to}`         | End of the time range (epoch ms)   |
| `${__user.email}` | Email of the current user          |
| `${__user.id}`    | ID of the current user             |
| `${__user.login}` | Login handle of the current user   |

For the full list, refer to [Grafana global variable documentation](https://grafana.com/docs/grafana/<GRAFANA_VERSION>/visualizations/dashboards/variables/add-template-variables/#global-variables).

## Environment variables

Environment variables pull from the system where Grafana runs (for example, operating system or device settings).
Dashboards cannot read them directly by default.
To use them, add a data source that exposes environment variables to Grafana.

## Variables at a glance

For Business Charts variable substitution in the Charts function, refer to [Variables](https://grafana.com/docs/plugins/volkovlabs-echarts-panel/<PLUGINS_VERSION>/features/variables/).
