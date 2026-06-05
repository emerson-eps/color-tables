import{R as u}from"./iframe-D2y6vVni.js";import{c as n,a as p}from"./index-BGhICA7P.js";import"./preload-helper-DOST-yEC.js";import"./index-X12Up7a1.js";import"./index-B1r1lEzJ.js";const h={title:"Legends/ContinousLegend",component:p,decorators:[a=>u.createElement(a,null)]},g={min:0,max:1,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300},e={top:"0%",left:"0%"},o={args:{...g,dataObjectName:"Physics color map",colorName:"Physics",cssLegendStyles:e}},r={args:{...g,dataObjectName:"Default color table (Rainbow)"}},t={args:{...g,dataObjectName:"Physics color map",cssLegendStyles:{backgroundColor:"red"}}},s={args:{min:2917,max:4723,dataObjectName:"Wells / MD",colorName:"Time/Depth",colorTables:n,horizontal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300,cssLegendStyles:e}},c={args:{min:0,max:1,dataObjectName:"Wells / NTG",colorName:"Rainbow",colorTables:n,horizontal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300,cssLegendStyles:e}},l={args:{min:2782,max:3513,dataObjectName:"Wells / PERM",colorName:"Permeability",colorTables:n,horizontal:!0,colorMapFunction:a=>[255-a*100,255-a*100,255*a],isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300,cssLegendStyles:e}},i={args:{min:-999,max:14023,dataObjectName:"Wells / PERMTOT",colorName:"Porosity",colorTables:n,horizontal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300,cssLegendStyles:e}},m={args:{min:0,max:.35,dataObjectName:"Wells / PORO",colorName:"Porosity",colorTables:n,horizontal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300,cssLegendStyles:e}},d={args:{min:0,max:.35,dataObjectName:"Wells / POROTOT",colorName:"Porosity",colorTables:n,horizontal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300,cssLegendStyles:e}},S={args:{min:0,max:1,dataObjectName:"Wells / SW",colorName:"Rainbow",colorTables:n,horizontal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300,cssLegendStyles:e}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    dataObjectName: "Physics color map",
    colorName: "Physics",
    cssLegendStyles
  }
}`,...o.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    dataObjectName: "Default color table (Rainbow)"
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    dataObjectName: "Physics color map",
    cssLegendStyles: {
      backgroundColor: "red"
    }
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    min: 2917,
    max: 4723,
    dataObjectName: "Wells / MD",
    colorName: "Time/Depth",
    colorTables,
    horizontal: true,
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
    cssLegendStyles
  }
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    min: 0,
    max: 1,
    dataObjectName: "Wells / NTG",
    colorName: "Rainbow",
    colorTables,
    horizontal: true,
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
    cssLegendStyles
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    min: 2782,
    max: 3513,
    dataObjectName: "Wells / PERM",
    colorName: "Permeability",
    colorTables,
    horizontal: true,
    colorMapFunction: (x: number) => [255 - x * 100, 255 - x * 100, 255 * x],
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
    cssLegendStyles
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    min: -999,
    max: 14023,
    dataObjectName: "Wells / PERMTOT",
    colorName: "Porosity",
    colorTables,
    horizontal: true,
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
    cssLegendStyles
  }
}`,...i.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    min: 0,
    max: 0.35,
    dataObjectName: "Wells / PORO",
    colorName: "Porosity",
    colorTables,
    horizontal: true,
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
    cssLegendStyles
  }
}`,...m.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    min: 0,
    max: 0.35,
    dataObjectName: "Wells / POROTOT",
    colorName: "Porosity",
    colorTables,
    horizontal: true,
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
    cssLegendStyles
  }
}`,...d.parameters?.docs?.source}}};S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    min: 0,
    max: 1,
    dataObjectName: "Wells / SW",
    colorName: "Rainbow",
    colorTables,
    horizontal: true,
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300,
    cssLegendStyles
  }
}`,...S.parameters?.docs?.source}}};const F=["StandardColorTableLibrary","DefaultColorTable","BackgroundColor","MDTemplate","NTGTemplate","PermeabilityTemplate","PermTotTemplate","PorosityTemplate","PoroTotTemplate","SWTemplate"];export{t as BackgroundColor,r as DefaultColorTable,s as MDTemplate,c as NTGTemplate,i as PermTotTemplate,l as PermeabilityTemplate,d as PoroTotTemplate,m as PorosityTemplate,S as SWTemplate,o as StandardColorTableLibrary,F as __namedExportsOrder,h as default};
