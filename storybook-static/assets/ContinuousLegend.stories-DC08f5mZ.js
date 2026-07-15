import{i as e,s as t}from"./preload-helper-DwwAbzm0.js";import{it as n}from"./iframe-DPdbVYAq.js";import{n as r,o as i,r as a,t as o}from"./component-CJ-6S3hc.js";var s,c,l,u,d,f,p,m,h,g,_,v,y,b,x;e((()=>{s=t(n()),r(),a(),c={title:`Legends/ContinousLegend`,component:i,decorators:[e=>s.createElement(e,null)]},l={min:0,max:1,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300},u={top:`0%`,left:`0%`},d={args:{...l,dataObjectName:`Physics color map`,colorName:`Physics`,cssLegendStyles:u}},f={args:{...l,dataObjectName:`Default color table (Rainbow)`}},p={args:{...l,dataObjectName:`Physics color map`,cssLegendStyles:{backgroundColor:`red`}}},m={args:{min:2917,max:4723,dataObjectName:`Wells / MD`,colorName:`Time/Depth`,colorTables:o,horizontal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300,cssLegendStyles:u}},h={args:{min:0,max:1,dataObjectName:`Wells / NTG`,colorName:`Rainbow`,colorTables:o,horizontal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300,cssLegendStyles:u}},g={args:{min:2782,max:3513,dataObjectName:`Wells / PERM`,colorName:`Permeability`,colorTables:o,horizontal:!0,colorMapFunction:e=>[255-e*100,255-e*100,255*e],isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300,cssLegendStyles:u}},_={args:{min:-999,max:14023,dataObjectName:`Wells / PERMTOT`,colorName:`Porosity`,colorTables:o,horizontal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300,cssLegendStyles:u}},v={args:{min:0,max:.35,dataObjectName:`Wells / PORO`,colorName:`Porosity`,colorTables:o,horizontal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300,cssLegendStyles:u}},y={args:{min:0,max:.35,dataObjectName:`Wells / POROTOT`,colorName:`Porosity`,colorTables:o,horizontal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300,cssLegendStyles:u}},b={args:{min:0,max:1,dataObjectName:`Wells / SW`,colorName:`Rainbow`,colorTables:o,horizontal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300,cssLegendStyles:u}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    dataObjectName: "Physics color map",
    colorName: "Physics",
    cssLegendStyles
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    dataObjectName: "Default color table (Rainbow)"
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    dataObjectName: "Physics color map",
    cssLegendStyles: {
      backgroundColor: "red"
    }
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x=[`StandardColorTableLibrary`,`DefaultColorTable`,`BackgroundColor`,`MDTemplate`,`NTGTemplate`,`PermeabilityTemplate`,`PermTotTemplate`,`PorosityTemplate`,`PoroTotTemplate`,`SWTemplate`]}))();export{p as BackgroundColor,f as DefaultColorTable,m as MDTemplate,h as NTGTemplate,_ as PermTotTemplate,g as PermeabilityTemplate,y as PoroTotTemplate,v as PorosityTemplate,b as SWTemplate,d as StandardColorTableLibrary,x as __namedExportsOrder,c as default};