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

Annotations in Grafana bring your dashboards to life by highlighting key events.
They encompass three core elements:

- Native annotations
- Alerts
- Annotation queries

Curious about how they stack up?
The schema below breaks it down.

{{< figure src="/media/docs/grafana/panels-visualizations/crash-courses/annotations.png" class="border" alt="Comparing annotations, alerts, and annotation queries in Grafana." >}}

{{< admonition type="note" >}}
Native annotations and alerts are stored as records in the Grafana configuration database, while annotation queries are custom requests to fetch and display them on your dashboard.
{{< /admonition >}}

## Understanding annotation queries

Annotation queries come in two flavors:

- **Built-in**: Basic functionality out of the box.
- **User-defined**: Flexible queries that can tap into any database—or even Grafana storage with the [Business Satellite](https://grafana.com/grafana/plugins/volkovlabs-grapi-datasource/) data source.

Check out the dataflow schema below for a closer look.

{{< figure src="/media/docs/grafana/panels-visualizations/crash-courses/alerts-schema.png" class="border" alt="Dataflow of annotations, alerts, and annotation queries." >}}

Despite their names, native annotations and Alerts share a lot under the hood.
With the [Business Satellite data source](https://grafana.com/grafana/plugins/volkovlabs-grapi-datasource/), you can manage both seamlessly.

## Annotation types explained

Dive into the video below for a walkthrough of the comparative schema.

{{< youtube id="4asWJ_Dhcmw" >}}

## Hands-on tutorial: annotations and alerts with timescale

This is hands-down the best way to master Grafana annotations.
Follow along as the video guides you through the dataflow schema with step-by-step instructions.

{{< youtube id="bmOkirtC65w" >}}

## Power up with business satellite

The [Business Satellite data source](https://grafana.com/grafana/plugins/volkovlabs-grapi-datasource/) helps tackle a real-world production challenge.
It lets you pull native annotations and Alerts from local or remote Grafana instances, with flexible filtering options. See it in action in the tutorial above.

{{< figure src="/media/docs/grafana/panels-visualizations/crash-courses/alerts.png" class="border" alt="Visualizing built-in and user-defined annotation queries on a time-series graph." >}}
