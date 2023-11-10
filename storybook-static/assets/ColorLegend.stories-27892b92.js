import{j as O}from"./jsx-runtime-095bf462.js";import{R as C}from"./index-8db94870.js";import{C as d}from"./ColorLegend-b7dc047e.js";import"./_commonjsHelpers-042e6b4d.js";import"./DiscreteLegend-092bed90.js";import"./constants-64c611c0.js";import"./ContinuousLegend-8e126df0.js";import"./cloneDeep-f507f63f.js";import"./_baseForOwn-6870d2b8.js";import"./isPlainObject-52e608ca.js";import"./throttle-c019c41f.js";const W={component:d,title:"Legends/ColorLegend"},o=m=>{const[i,_]=C.useState("Rainbow"),F=C.useCallback(e=>{_((e==null?void 0:e.name)||(e==null?void 0:e.legendColorName))},[]);return O(d,{...m,colorName:i,getScale:F})},a={horizontal:!0,isOpenProp:!0,min:0,max:.35,colorName:"Rainbow",dataObjectName:"Legend with Selector",isModal:!0,isRangeShown:!0,legendFontSize:16,tickFontSize:13,numberOfTicks:3,legendScaleSize:300},r=o.bind({});r.args={...a};const t=o.bind({});t.args={...a,cssLegendStyles:{left:"0vw",top:"0vh"}};const l=o.bind({});l.args={...a,cssLegendStyles:{right:"0vw",top:"0vh"}};const s=o.bind({});s.args={...a,cssLegendStyles:{right:"0vw",top:"0vh"},horizontal:!1};const g=m=>O(d,{...m,cssLegendStyles:{right:"0vw",bottom:"0vh"}}),n=o.bind({});n.args={...a,cssLegendStyles:{left:"0vw",bottom:"0vh"}};const c=o.bind({});c.args={...a,cssLegendStyles:{backgroundColor:"red",borderRadius:"5px",padding:"5px"},horizontal:!1};var p,u,N;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`(args: ColorLegendProps) => {
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
}`,...(h=(R=l.parameters)==null?void 0:R.docs)==null?void 0:h.source}}};var P,w,y;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`(args: ColorLegendProps) => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName: ScaleHandler = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(y=(w=s.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var k,v,j;g.parameters={...g.parameters,docs:{...(k=g.parameters)==null?void 0:k.docs,source:{originalSource:`(args: ColorLegendProps) => {
  const style = {
    right: "0vw",
    bottom: "0vh"
  };
  return <ColorLegend {...args} cssLegendStyles={style} />;
}`,...(j=(v=g.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var D,x,z;n.parameters={...n.parameters,docs:{...(D=n.parameters)==null?void 0:D.docs,source:{originalSource:`(args: ColorLegendProps) => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName: ScaleHandler = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(z=(x=n.parameters)==null?void 0:x.docs)==null?void 0:z.source}}};var B,H,T;c.parameters={...c.parameters,docs:{...(B=c.parameters)==null?void 0:B.docs,source:{originalSource:`(args: ColorLegendProps) => {
  const [getColor, setColorName] = React.useState("Rainbow");
  const getColorName: ScaleHandler = React.useCallback(data => {
    // for geological color scale data (from color-table.json) => data.name
    // for D3 color scale => data.legendColorName

    setColorName(data?.name || data?.legendColorName);
  }, []);
  return <ColorLegend {...args} colorName={getColor} getScale={getColorName} />;
}`,...(T=(H=c.parameters)==null?void 0:H.docs)==null?void 0:T.source}}};const X=["DefaultStyle","TopLeftPosition","TopRightPosition","VerticalPositioning","BottomRightPosition","BottomLeftPosition","BackgroundColor"];export{c as BackgroundColor,n as BottomLeftPosition,g as BottomRightPosition,r as DefaultStyle,t as TopLeftPosition,l as TopRightPosition,s as VerticalPositioning,X as __namedExportsOrder,W as default};
//# sourceMappingURL=ColorLegend.stories-27892b92.js.map
