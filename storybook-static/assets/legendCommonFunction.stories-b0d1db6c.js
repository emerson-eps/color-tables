import{j as d}from"./jsx-runtime-ad672792.js";import{C as u}from"./ContinuousLegend-26c437dd.js";import{c as g,a as C}from"./legendCommonFunction-de117f1b.js";import"./index-f1f749bf.js";import"./_commonjsHelpers-042e6b4d.js";const O={component:u,title:"Utils / Common Functions"},m=0,l=1,b="Physics color map function",f="Physics";function F(r){return C(f)(r)}const p=r=>d(u,{...r}),n=p.bind({});n.args={min:m,max:l,dataObjectName:b,colorMapFunction:F,legendFontSize:13};const o=p.bind({});o.args={min:m,max:l,dataObjectName:"Default color scale (Rainbow)",colorMapFunction:g(),legendFontSize:13};var t,e,a;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:`(args: JSX.IntrinsicAttributes & {
  min?: number;
  max?: number;
  dataObjectName?: string;
  colorName?: string;
}) => {
  return <ContinuousLegend {...args} />;
}`,...(a=(e=n.parameters)==null?void 0:e.docs)==null?void 0:a.source}}};var s,c,i;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`(args: JSX.IntrinsicAttributes & {
  min?: number;
  max?: number;
  dataObjectName?: string;
  colorName?: string;
}) => {
  return <ContinuousLegend {...args} />;
}`,...(i=(c=o.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};const D=["ColorMapFunction","DefaultColorMapFunction"];export{n as ColorMapFunction,o as DefaultColorMapFunction,D as __namedExportsOrder,O as default};
//# sourceMappingURL=legendCommonFunction.stories-b0d1db6c.js.map
