import{R as m}from"./index-DQDNmYQF.js";import{C}from"./ColorLegend-DlKNyUU5.js";import"./DiscreteLegend-CCYiBXx0.js";import"./constants-BOtX_NPb.js";import"./ContinuousLegend-BqZ98Gq4.js";import"./index-Dm2lSUxJ.js";import"./index-BuA_lF3S.js";const I={component:C,title:"Legends/ColorLegend"},o=d=>{const[i,O]=m.useState("Rainbow"),E=m.useCallback(e=>{O((e==null?void 0:e.name)||(e==null?void 0:e.legendColorName))},[]);return m.createElement(C,{...d,colorName:i,getScale:E})},a={horizontal:!0,isOpenProp:!0,min:0,max:.35,colorName:"Rainbow",dataObjectName:"Legend with Selector",isModal:!0,isRangeShown:!0,legendFontSize:16,tickFontSize:13,numberOfTicks:3,legendScaleSize:300},r=o.bind({});r.args={...a};const t=o.bind({});t.args={...a,cssLegendStyles:{left:"0vw",top:"0vh"}};const l=o.bind({});l.args={...a,cssLegendStyles:{right:"0vw",top:"0vh"}};const n=o.bind({});n.args={...a,cssLegendStyles:{right:"0vw",top:"0vh"},horizontal:!1};const g=d=>{const i={right:"0vw",bottom:"0vh"};return m.createElement(C,{...d,cssLegendStyles:i})},s=o.bind({});s.args={...a,cssLegendStyles:{left:"0vw",bottom:"0vh"}};const c=o.bind({});c.args={...a,cssLegendStyles:{backgroundColor:"red",borderRadius:"5px",padding:"5px"},horizontal:!1};var p,u,N;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`(args: ColorLegendProps) => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName: ScaleHandler = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(N=(u=r.parameters)==null?void 0:u.docs)==null?void 0:N.source}}};var S,b,f;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`(args: ColorLegendProps) => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName: ScaleHandler = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(f=(b=t.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var L,R,h;l.parameters={...l.parameters,docs:{...(L=l.parameters)==null?void 0:L.docs,source:{originalSource:`(args: ColorLegendProps) => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName: ScaleHandler = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(h=(R=l.parameters)==null?void 0:R.docs)==null?void 0:h.source}}};var P,w,k;n.parameters={...n.parameters,docs:{...(P=n.parameters)==null?void 0:P.docs,source:{originalSource:`(args: ColorLegendProps) => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName: ScaleHandler = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(k=(w=n.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var v,y,D;g.parameters={...g.parameters,docs:{...(v=g.parameters)==null?void 0:v.docs,source:{originalSource:`(args: ColorLegendProps) => {
  const style = {
    right: "0vw",
    bottom: "0vh"
  };
  return <ColorLegend {...args} cssLegendStyles={style} />;
}`,...(D=(y=g.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};var j,z,B;s.parameters={...s.parameters,docs:{...(j=s.parameters)==null?void 0:j.docs,source:{originalSource:`(args: ColorLegendProps) => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName: ScaleHandler = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(B=(z=s.parameters)==null?void 0:z.docs)==null?void 0:B.source}}};var H,T,x;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`(args: ColorLegendProps) => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName: ScaleHandler = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(x=(T=c.parameters)==null?void 0:T.docs)==null?void 0:x.source}}};const J=["DefaultStyle","TopLeftPosition","TopRightPosition","VerticalPositioning","BottomRightPosition","BottomLeftPosition","BackgroundColor"];export{c as BackgroundColor,s as BottomLeftPosition,g as BottomRightPosition,r as DefaultStyle,t as TopLeftPosition,l as TopRightPosition,n as VerticalPositioning,J as __namedExportsOrder,I as default};
