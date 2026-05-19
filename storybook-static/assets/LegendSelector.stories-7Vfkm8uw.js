import{R as r}from"./index-DQDNmYQF.js";import{a as i}from"./constants-BOtX_NPb.js";import{C as n}from"./ColorLegend-DlKNyUU5.js";import"./DiscreteLegend-CCYiBXx0.js";import"./ContinuousLegend-BqZ98Gq4.js";import"./index-Dm2lSUxJ.js";import"./index-BuA_lF3S.js";const L={component:n,title:"Legends/LegendWithColorSelector"},d=s=>{const[c,m]=r.useState("Rainbow"),g=r.useCallback(e=>{m((e==null?void 0:e.name)||(e==null?void 0:e.legendColorName))},[]);return r.createElement(n,{...s,colorName:c,getScale:g})},o=d.bind({});o.args={min:0,max:.35,cssLegendStyles:{left:"0vw",top:"0vh"},horizontal:!0,colorName:"Rainbow",dataObjectName:"Legend with Selector",colorTables:i,isModal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300};var t,a,l;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`args => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(l=(a=o.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const R=["LegendWithColorSelector"];export{o as LegendWithColorSelector,R as __namedExportsOrder,L as default};
