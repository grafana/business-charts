---
title: Exploring variables
description: Learn how dashboard, global, and environment variables work in Grafana and how they fit together.
weight: 690
labels:
  products:
    - cloud
    - enterprise
    - oss
---

# Exploring variables

Variables in Grafana can spark a lot of questions—especially for newcomers. Simply put, they come in three flavors: Dashboard, Global, and Environment. Let’s break them down and see how they fit into Grafana’s world.

{{< figure src="/media/docs/grafana/panels-visualizations/business-charts/variables.png" class="border" alt="Three layers of variables in Grafana." >}}

## Your video guide to variables

Want to fast-track your understanding? This video sorts out Dashboard, Global, and Environment variables with a clear, step-by-step rundown—perfect for Grafana fans eager to learn.

{{< youtube id="sczRq2lI3e4" >}}

## Dashboard variables

Dashboard variables live within a single dashboard, powering filters and dynamic controls. They’re your go-to for tailoring what users see.

{{< figure src="/media/docs/grafana/panels-visualizations/business-charts/variables-edit.png" class="border" alt="Different types of dashboard variables." >}}

## Global variables

Global variables tap into Grafana-wide settings, ready to use across your dashboards. Here’s a quick look at some handy ones:

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

For the full lineup, check out [Grafana’s global variables docs](https://grafana.com/docs/grafana/latest/dashboards/variables/add-template-variables/#global-variables).

## Environment variables

Environment variables pull from the system where Grafana runs—think operating system or device settings. Normally out of reach, they’re unlocked with the Environment data source. Learn how in this post.

## Variables at a glance

Need more examples? This blog post dives deeper into all three variable types and spotlights the Environment data source—your cheat sheet to mastering variables.
