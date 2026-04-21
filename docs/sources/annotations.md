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

Annotations in Grafana bring your dashboards to life by highlighting key events. They encompass three core elements:

- Native annotations
- Alerts
- Annotation queries

Curious about how they stack up? The schema below breaks it down.

{{< figure src="/media/docs/grafana/panels-visualizations/business-input/annotations.png" class="border" alt="Comparing Annotations, Alerts, and Annotation Queries in Grafana." >}}

{{< admonition type="note" >}}
**Key distinction.** Native annotations and Alerts are stored as records in Grafana’s configuration database, while annotation queries are custom requests to fetch and display them on your dashboard.
{{< /admonition >}}

## Understanding annotation queries

Annotation queries come in two flavors:

- **Built-in**: Basic functionality out of the box.
- **User-defined**: Flexible queries that can tap into any database—or even Grafana’s own storage with the [Business Satellite](/plugins/business-satellite/) data source.

Check out the dataflow schema below for a closer look.

{{< figure src="/media/docs/grafana/panels-visualizations/business-input/alerts-schema.png" class="border" alt="Dataflow of Annotations, Alerts, and Annotation Queries." >}}

Despite their names, native annotations and Alerts share a lot under the hood. With the [Business Satellite data source](/plugins/business-satellite), you can manage both seamlessly.

## Annotation types explained

Dive into the video below for a walkthrough of the comparative schema.

{{< youtube id="4asWJ_Dhcmw" >}}

## Hands-on tutorial: annotations and alerts with timescale

This is hands-down the best way to master Grafana annotations. Follow along as I guide you through the dataflow schema with step-by-step instructions—learn by doing!

{{< youtube id="bmOkirtC65w" >}}

## Power up with business satellite

We built the [Business Satellite data source](/plugins/business-satellite) to tackle a real-world production challenge. It lets you pull native annotations and Alerts from local or remote Grafana instances, with flexible filtering options. See it in action in the tutorial above.

{{< figure src="/media/docs/grafana/panels-visualizations/business-input/alerts.png" class="border" alt="Visualizing built-in and user-defined annotation queries on a time-series graph." >}}

## Prefer reading? Check the blog post

If videos aren’t your thing, our blog post covers the same ground from a fresh perspective. Dig in!
