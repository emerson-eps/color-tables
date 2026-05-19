import{R as p}from"./index-DQDNmYQF.js";import{C as a}from"./ContinuousLegend-BqZ98Gq4.js";import"./constants-BOtX_NPb.js";const R={component:a,title:"Legends  / ContinuousLegend"},S=0,f=1,b="Physics color map",y="Physics",n={min:S,max:f,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300},C=L=>p.createElement(a,{...L}),e=C.bind({});e.args={...n,dataObjectName:b,colorName:y};const r=C.bind({});r.args={...n,dataObjectName:"Default color table (Rainbow)"};const o=()=>p.createElement(a,{...n,dataObjectName:b,cssLegendStyles:{backgroundColor:"red"}});var s,t,c;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`(args: ContinuousLegendProps) => {
  return <ContinuousLegend {...args} />;
}`,...(c=(t=e.parameters)==null?void 0:t.docs)==null?void 0:c.source}}};var d,u,i;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`(args: ContinuousLegendProps) => {
  return <ContinuousLegend {...args} />;
}`,...(i=(u=r.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var l,m,g;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`() => {
  return <ContinuousLegend {...DEFAULT_ARGS} dataObjectName={dataObjectName} cssLegendStyles={{
    backgroundColor: "red"
  }} />;
}`,...(g=(m=o.parameters)==null?void 0:m.docs)==null?void 0:g.source}}};const D=["StandardColorTableLibrary","DefaultColorTable","BackgroundColor"];export{o as BackgroundColor,r as DefaultColorTable,e as StandardColorTableLibrary,D as __namedExportsOrder,R as default};
