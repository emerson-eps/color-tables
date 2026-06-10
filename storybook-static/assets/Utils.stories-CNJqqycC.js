import{R as r}from"./iframe-CUpWHKVn.js";import{a as c,d as s,b as l}from"./index-D8KWj6H2.js";import"./preload-helper-DOST-yEC.js";import"./index-jWxD0Qoo.js";import"./index-prsDHs_5.js";const M={title:"Utils/CommonFunctions",component:c,decorators:[a=>r.createElement(a,null)]},e=0,t=1,i="Physics color map function",u="Physics";function m(a){return l(u)(a)}const o={args:{min:e,max:t,dataObjectName:i,colorMapFunction:m,legendFontSize:13}},n={args:{min:e,max:t,dataObjectName:"Default color scale (Rainbow)",colorMapFunction:s(),legendFontSize:13}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    min,
    max,
    dataObjectName,
    colorMapFunction: colorMap,
    legendFontSize: 13
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    min,
    max,
    dataObjectName: "Default color scale (Rainbow)",
    colorMapFunction: createDefaultContinuousColorScale(),
    legendFontSize: 13
  }
}`,...n.parameters?.docs?.source}}};const S=["ColorMapFunction","DefaultColorMapFunction"];export{o as ColorMapFunction,n as DefaultColorMapFunction,S as __namedExportsOrder,M as default};
