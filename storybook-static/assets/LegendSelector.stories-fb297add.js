import{j as g}from"./jsx-runtime-095bf462.js";import{R as r}from"./index-8db94870.js";import{b as d}from"./legendCommonFunction-03fb4e75.js";import{C as n}from"./ColorLegend-fe6e5a73.js";import"./_commonjsHelpers-042e6b4d.js";import"./DiscreteLegend-674580c5.js";import"./ContinuousLegend-ee804cb3.js";import"./cloneDeep-edd22294.js";import"./_getPrototype-e5e53c34.js";import"./throttle-c25624b0.js";import"./isPlainObject-bd23e8eb.js";const k={component:n,title:"Legends/LegendWithColorSelector"},p=s=>{const[c,m]=r.useState("Rainbow"),i=r.useCallback(e=>{m((e==null?void 0:e.name)||(e==null?void 0:e.legendColorName))},[]);return g(n,{...s,colorName:c,getScale:i})},o=p.bind({});o.args={min:0,max:.35,cssLegendStyles:{left:"0vw",top:"0vh"},horizontal:!0,colorName:"Rainbow",dataObjectName:"Legend with Selector",colorTables:d,isModal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300};var t,a,l;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`args => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(l=(a=o.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const x=["LegendWithColorSelector"];export{o as LegendWithColorSelector,x as __namedExportsOrder,k as default};
//# sourceMappingURL=LegendSelector.stories-fb297add.js.map
