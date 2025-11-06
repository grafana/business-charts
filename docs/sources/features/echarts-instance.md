---
title: ECharts instance
description: Learn how to interact with the ECharts container instance to get dimensions, DOM elements, and handle chart operations.
weight: 40
---

# ECharts instance

The `context.panel.chart` ( early `echartsInstance` ) is a created instance (container) of the Apache ECharts library. It allows you to do the following:

- Get the width and height of the ECharts container.
- Get the DOM (Document Object Model) to include additional elements.
- Resize the chart size.
- Handle events.
- Update options, etc.

For more details, please review the documentation for [echartsInstance](https://echarts.apache.org/en/api.html#echartsInstance).

## Scale when resizing

To scale the content for fitting the resized panel, you need to use the instance methods to retrieve the width and height of the panel.

```js
  graphic: {
    type: "image",
    style: {
      image: `data:image/svg+xml;utf8,${SVG}`,
      width: context.panel.chart.getWidth(),
      height: context.panel.chart.getHeight(),
    },
  },
```

## Create DOM elements

You can add elements (buttons, checkboxes, dropdown boxes, etc.) to the DOM (Document Object Model) using the instance.

## Button

You can add a button with an on-click event handler on top of the Business Charts panel.

![Add a button to handle events in the Apache ECharts container.](/media/docs/grafana/panels-visualizations/business-charts/dom.png)

```js
const myFunction = () => {
  alert("myFunction() called!");
};

//Get the DOM for the panel
let dom = context.panel.chart.getDom();

//Get the child nodes
let nodeList = dom.childNodes;

//If we haven't added our controls to the DOM yet
if (nodeList.length < 2) {
  //Create a new button
  const btn = document.createElement("button");

  //Establish button name
  const textnode = document.createTextNode("My Button");
  btn.appendChild(textnode);

  //Add click event handler
  btn.addEventListener("click", myFunction);

  //Create a new <div>
  const div = document.createElement("div");

  //Add button to <div>
  div.appendChild(btn);

  //Insert new <div> ahead of existing chart div
  dom.insertBefore(div, dom.firstChild);
}
```

## Select

Add a select box with an on-change event handler.

![Add a select box with options and update the Apache ECharts options based on the user's selection.](/media/docs/grafana/panels-visualizations/business-charts/select.png)

```js
//Get the DOM for the panel
let dom = context.panel.chart.getDom();

//Get the child nodes
let nodeList = dom.childNodes;

//If we haven't added our controls to the DOM yet
if (nodeList.length < 2) {
  //Create a select list
  const selectList = document.createElement("select");
  selectList.id = "mySelect";
  selectList.style.borderStyle = "solid";

  //Add options
  const array = ["value1", "value2", "value3", "value4"];
  array.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.text = value;
    selectList.appendChild(option);
  });

  //Add click event handler
  selectList.addEventListener("change", () => {
    alert("Selected value: " + selectList.value);
  });

  //Create a new <div>
  const div = document.createElement("div");
  div.innerHTML += "Select ";
  div.style.marginLeft = "10px";

  //Add select to <div>
  div.appendChild(selectList);

  //Insert new <div> ahead of existing chart div
  dom.insertBefore(div, dom.firstChild);
}
```
