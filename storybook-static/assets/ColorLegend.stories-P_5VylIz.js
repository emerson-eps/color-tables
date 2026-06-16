import{R as r}from"./iframe-BpJZv9bo.js";import{c as h,C as m}from"./index-JAGeDc11.js";import"./preload-helper-DOST-yEC.js";import"./index-BDUL9VId.js";import"./index-V6B8nwsB.js";const y={title:"Legends/ColorLegend",component:m,decorators:[o=>r.createElement(o,null)]},e={horizontal:!0,isOpenProp:!0,min:0,max:.35,colorName:"Rainbow",dataObjectName:"Legend with Selector",isModal:!0,isRangeShown:!0,legendFontSize:16,tickFontSize:13,numberOfTicks:3,legendScaleSize:300},t={args:{...e}},s={args:{...e,cssLegendStyles:{left:"0vw",top:"0vh"}}},n={args:{...e,cssLegendStyles:{right:"2vw",top:"0vh"}}},a={args:{...e,cssLegendStyles:{right:"0vw",top:"0vh"},horizontal:!1}},c={args:{...e,cssLegendStyles:{right:"2vw",bottom:"0vh"}}},l={args:{...e,cssLegendStyles:{left:"0vw",bottom:"0vh"}}},i={args:{...e,cssLegendStyles:{backgroundColor:"red",borderRadius:"5px",padding:"5px"},horizontal:!1}},f=o=>{const[p,u]=r.useState("Rainbow"),S=r.useCallback(g=>{u(g?.name||g?.legendColorName)},[]);return r.createElement(m,{...o,colorName:p,getScale:S})},d={args:{min:0,max:.35,cssLegendStyles:{left:"0vw",top:"0vh"},horizontal:!0,colorName:"Rainbow",dataObjectName:"Legend with Selector",colorTables:h,isModal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300},render:o=>r.createElement(f,{...o})};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    cssLegendStyles: {
      left: "0vw",
      top: "0vh"
    }
  }
}`,...s.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    cssLegendStyles: {
      right: "2vw",
      top: "0vh"
    }
  }
}`,...n.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    cssLegendStyles: {
      right: "0vw",
      top: "0vh"
    },
    horizontal: false
  }
}`,...a.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    cssLegendStyles: {
      right: "2vw",
      bottom: "0vh"
    }
  }
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    cssLegendStyles: {
      left: "0vw",
      bottom: "0vh"
    }
  }
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    cssLegendStyles: {
      backgroundColor: "red",
      borderRadius: "5px",
      padding: "5px"
    },
    horizontal: false
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    min: 0,
    max: 0.35,
    cssLegendStyles: {
      left: "0vw",
      top: "0vh"
    },
    horizontal: true,
    colorName: "Rainbow",
    dataObjectName: "Legend with Selector",
    colorTables,
    isModal: true,
    isRangeShown: true,
    legendFontSize: 13,
    tickFontSize: 13,
    numberOfTicks: 3,
    legendScaleSize: 300
  },
  render: args => <ColorSelector {...args} />
}`,...d.parameters?.docs?.source}}};const z=["DefaultStyle","TopLeftPosition","TopRightPosition","VerticalPositioning","BottomRightPosition","BottomLeftPosition","BackgroundColor","LegendWithColorSelector"];export{i as BackgroundColor,l as BottomLeftPosition,c as BottomRightPosition,t as DefaultStyle,d as LegendWithColorSelector,s as TopLeftPosition,n as TopRightPosition,a as VerticalPositioning,z as __namedExportsOrder,y as default};
