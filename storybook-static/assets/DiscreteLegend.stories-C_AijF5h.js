import{R as i}from"./index-DQDNmYQF.js";import{D as o}from"./DiscreteLegend-CCYiBXx0.js";import"./constants-BOtX_NPb.js";const T={component:o,title:"Legends/DiscreteColorLegend"},u={OS:[[],0],LSF:[[],1],USF:[[],2],MB:[[],3],TB:[[],4],TC:[[],5],TFS:[[],6],TFM:[[],7],MSH:[[],8],CAL:[[],9]},l="Wells / FACIES",p=!0,S="Facies",m={discreteData:u,dataObjectName:l,colorName:S,horizontal:p,legendScaleSize:300,legendFontSize:13,tickFontSize:13,numberOfTicks:3},L=g=>i.createElement(o,{...g}),e=L.bind({});e.args={...m};const r=()=>i.createElement(o,{...m,dataObjectName:l,cssLegendStyles:{backgroundColor:"red"}});var t,s,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`(args: DiscreteColorLegendProps) => {
  return <DiscreteColorLegend {...args} />;
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var c,n,d;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`() => {
  return <DiscreteColorLegend {...DEFAULT_ARGS} dataObjectName={dataObjectName} cssLegendStyles={{
    backgroundColor: "red"
  }} />;
}`,...(d=(n=r.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};const b=["Facies","BackgroundColor"];export{r as BackgroundColor,e as Facies,b as __namedExportsOrder,T as default};
