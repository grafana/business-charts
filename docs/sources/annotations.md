---
title: Exploring annotations
weight: 650
---


# Exploring annotations

Annotations in Grafana bring your dashboards to life by highlighting key events. They encompass three core elements:

- Native annotations
- Alerts
- Annotation queries

Curious about how they stack up? The schema below breaks it down.

<Image
  title="Comparing Annotations, Alerts, and Annotation Queries in Grafana."
  src="/img/grafana/getting-started/annotations.png"
/>

:::info Key Distinction
Native annotations and Alerts are stored as records in Grafana’s configuration database, while Annotation queries are custom requests to fetch and display them on your dashboard.
:::

## Understanding annotation queries

Annotation queries come in two flavors:

- **Built-in**: Basic functionality out of the box.
- **User-defined**: Flexible queries that can tap into any database—or even Grafana’s own storage with the [Business Satellite](/plugins/business-satellite/) data source.

Check out the dataflow schema below for a closer look.

<Image
  title="Dataflow of Annotations, Alerts, and Annotation Queries."
  src="/img/grafana/getting-started/alerts-schema.png"
/>

Despite their names, native annotations and Alerts share a lot under the hood. With the [Business Satellite data source](/plugins/business-satellite), you can manage both seamlessly.

## Annotation types explained

Dive into the video below for a walkthrough of the comparative schema.

<Youtube
  id="4asWJ_Dhcmw"
  title="Annotations, Alerts, and Annotation Queries in Grafana Explained."
/>

## Hands-on tutorial: annotations and alerts with timescale

This is hands-down the best way to master Grafana annotations. Follow along as I guide you through the dataflow schema with step-by-step instructions—learn by doing!

<Youtube
  id="bmOkirtC65w"
  title="Annotations and Alerts Tutorial with Timescale in Grafana."
/>

## Power up with business satellite

We built the [Business Satellite data source](/plugins/business-satellite) to tackle a real-world production challenge. It lets you pull native annotations and Alerts from local or remote Grafana instances, with flexible filtering options. See it in action in the tutorial above.

<Image
  title="Visualizing built-in and user-defined annotation queries on a time-series graph."
  src="/img/grafana/getting-started/alerts.png"
/>

## Prefer reading? check the blog post

If videos aren’t your thing, our blog post covers the same ground from a fresh perspective. Dig in!
