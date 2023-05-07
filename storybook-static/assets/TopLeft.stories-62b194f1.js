import{j as x}from"./jsx-runtime-ad672792.js";import{R as m}from"./index-f1f749bf.js";import{b as z}from"./legendCommonFunction-691e4b35.js";import{C as j}from"./ColorLegend-0b4e9c55.js";import"./_commonjsHelpers-042e6b4d.js";import"./DiscreteLegend-ccff36a2.js";import"./ContinuousLegend-86beba0f.js";import"./cloneDeep-49f16cf0.js";import"./_baseForOwn-b1f18c7b.js";import"./throttle-d3433170.js";import"./isPlainObject-7bb67be1.js";const J={component:j,title:"Legends/cssLegendStyles"},O={Above_BCU:[[],0],ABOVE:[[],1],H12:[[],2],H11:[[],3],H10:[[],4],H9:[[],5],H8:[[],6],H7:[[],7],H6:[[],8],H5:[[],9],H4:[[],10],H3:[[],11],H2:[[],12],H1:[[],13],BELOW:[[],14]},e=B=>{const[y,T]=m.useState("Rainbow"),D=m.useCallback(o=>{T((o==null?void 0:o.name)||(o==null?void 0:o.legendColorName))},[]);return x(j,{...B,colorName:y,getScale:D})},a={cssLegendStyles:{left:"0vw",top:"0vh"},horizontal:!0,isOpenProp:!0,min:0,max:.35,colorName:"Rainbow",dataObjectName:"Legend with Selector",colorTables:z,discreteData:O,isModal:!0,isRangeShown:!0,legendFontSize:16,tickFontSize:13,numberOfTicks:3,legendScaleSize:300},r=e.bind({});r.args={...a};const t=e.bind({});t.args={...a,cssLegendStyles:{right:"0vw",top:"0vh"}};const s=e.bind({});s.args={...a,cssLegendStyles:{right:"0vw",top:"0vh"},horizontal:!1};const l=e.bind({});l.args={...a,cssLegendStyles:{right:"0vw",bottom:"0vh"}};const n=e.bind({});n.args={...a,cssLegendStyles:{left:"0vw",bottom:"0vh"}};const c=e.bind({});c.args={...a,cssLegendStyles:{backgroundColor:"gray",borderRadius:"5px",padding:"5px"},horizontal:!1};var g,d,i;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`args => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(i=(d=r.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var C,p,u;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`args => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(u=(p=t.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var N,b,f;s.parameters={...s.parameters,docs:{...(N=s.parameters)==null?void 0:N.docs,source:{originalSource:`args => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(f=(b=s.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var S,R,L;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`args => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(L=(R=l.parameters)==null?void 0:R.docs)==null?void 0:L.source}}};var h,w,k;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`args => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(k=(w=n.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var H,P,v;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`args => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(v=(P=c.parameters)==null?void 0:P.docs)==null?void 0:v.source}}};const K=["TopLeftPosition","TopRightPosition","VerticalPositioning","BottomRightPosition","BottomLeftPosition","BackgroundColor"];export{c as BackgroundColor,n as BottomLeftPosition,l as BottomRightPosition,r as TopLeftPosition,t as TopRightPosition,s as VerticalPositioning,K as __namedExportsOrder,J as default};
//# sourceMappingURL=TopLeft.stories-62b194f1.js.map
