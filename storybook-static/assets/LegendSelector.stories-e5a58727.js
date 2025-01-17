import{j as g}from"./jsx-runtime-337a763f.js";import{R as r}from"./index-8b3efc3f.js";import{b as d}from"./constants-5003fa8a.js";import{C as n}from"./ColorLegend-4dbacc0b.js";import"./_commonjsHelpers-de833af9.js";import"./DiscreteLegend-55b3d701.js";import"./ContinuousLegend-a46a0ecc.js";import"./cloneDeep-1bbeca19.js";import"./_baseForOwn-c41f9b39.js";import"./isPlainObject-efaaf9de.js";import"./throttle-ca070fc5.js";const k={component:n,title:"Legends/LegendWithColorSelector"},p=s=>{const[c,m]=r.useState("Rainbow"),i=r.useCallback(e=>{m((e==null?void 0:e.name)||(e==null?void 0:e.legendColorName))},[]);return g(n,{...s,colorName:c,getScale:i})},o=p.bind({});o.args={min:0,max:.35,cssLegendStyles:{left:"0vw",top:"0vh"},horizontal:!0,colorName:"Rainbow",dataObjectName:"Legend with Selector",colorTables:d,isModal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300};var t,a,l;o.parameters={...o.parameters,docs:{...(t=o.parameters)==null?void 0:t.docs,source:{originalSource:`args => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(l=(a=o.parameters)==null?void 0:a.docs)==null?void 0:l.source}}};const x=["LegendWithColorSelector"];export{o as LegendWithColorSelector,x as __namedExportsOrder,k as default};
//# sourceMappingURL=LegendSelector.stories-e5a58727.js.map
