---
title: Exploring annotations
description: Learn how native annotations, alerts, and annotation queries work in Grafana and how they appear on your dashboards.
weight: 650
labels:
  products:
    - cloud
    - enterprise
    - oss
---

# Exploring annotations

Annotations in Grafana highlight key events on your dashboards.
They encompass three core elements:

- Native annotations
- Alerts
- Annotation queries

The following diagram compares them.

{{< figure src="/media/docs/grafana/panels-visualizations/crash-courses/annotations.png" class="border" alt="Comparing annotations, alerts, and annotation queries in Grafana." >}}

{{< admonition type="note" >}}
Native annotations and alerts are stored as records in the Grafana configuration database, while annotation queries are custom requests to fetch and display them on your dashboard.
{{< /admonition >}}

## Annotation queries

Annotation queries come in two flavors:

- **Built-in**: Basic functionality out of the box.
- **User-defined**: Flexible queries that can tap into any database—or even Grafana storage with the [Business Satellite](https://grafana.com/grafana/plugins/volkovlabs-grapi-datasource/) data source.

Refer to the dataflow schema below for detail.

{{< figure src="/media/docs/grafana/panels-visualizations/crash-courses/alerts-schema.png" class="border" alt="Dataflow of annotations, alerts, and annotation queries." >}}

Despite their names, native annotations and alerts share a lot under the hood.
With the [Business Satellite data source](https://grafana.com/grafana/plugins/volkovlabs-grapi-datasource/), you can manage both seamlessly.

## Annotation types

The following video walks through the comparative schema.

{{< youtube id="4asWJ_Dhcmw" >}}

## Hands-on tutorial: annotations and alerts with Timescale

This tutorial offers step-by-step practice with Grafana annotations.
Follow the video through the dataflow schema to see how each piece fits together.

{{< youtube id="bmOkirtC65w" >}}

## Business Satellite

The [Business Satellite data source](https://grafana.com/grafana/plugins/volkovlabs-grapi-datasource/) helps tackle a real-world production challenge.
It lets you pull native annotations and alerts from local or remote Grafana instances, with flexible filtering options. For a demo, refer to the tutorial above.

{{< figure src="/media/docs/grafana/panels-visualizations/crash-courses/alerts.png" class="border" alt="Visualizing built-in and user-defined annotation queries on a time-series graph." >}}
