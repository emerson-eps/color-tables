import{i as e,s as t}from"./preload-helper-DwwAbzm0.js";import{z as n}from"./iframe-BtjM2Cgb.js";import{i as r,n as i,r as a,t as o}from"./component-CSd2_0J8.js";var s,c,l,u,d,f,p,m,h,g,_,v,y;e((()=>{s=t(n()),i(),a(),c={title:`Legends/ColorLegend`,component:r,decorators:[e=>s.createElement(e,null)]},l={horizontal:!0,isOpenProp:!0,min:0,max:.35,colorName:`Rainbow`,dataObjectName:`Legend with Selector`,isModal:!0,isRangeShown:!0,legendFontSize:16,tickFontSize:13,numberOfTicks:3,legendScaleSize:300},u={args:{...l}},d={args:{...l,cssLegendStyles:{left:`0vw`,top:`0vh`}}},f={args:{...l,cssLegendStyles:{right:`2vw`,top:`0vh`}}},p={args:{...l,cssLegendStyles:{right:`0vw`,top:`0vh`},horizontal:!1}},m={args:{...l,cssLegendStyles:{right:`2vw`,bottom:`0vh`}}},h={args:{...l,cssLegendStyles:{left:`0vw`,bottom:`0vh`}}},g={args:{...l,cssLegendStyles:{backgroundColor:`red`,borderRadius:`5px`,padding:`5px`},horizontal:!1}},_=e=>{let[t,n]=s.useState(`Rainbow`),i=s.useCallback(e=>{n(e?.name||e?.legendColorName)},[]);return s.createElement(r,{...e,colorName:t,getScale:i})},v={args:{min:0,max:.35,cssLegendStyles:{left:`0vw`,top:`0vh`},horizontal:!0,colorName:`Rainbow`,dataObjectName:`Legend with Selector`,colorTables:o,isModal:!0,isRangeShown:!0,legendFontSize:13,tickFontSize:13,numberOfTicks:3,legendScaleSize:300},render:e=>s.createElement(_,e)},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    cssLegendStyles: {
      left: "0vw",
      top: "0vh"
    }
  }
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    cssLegendStyles: {
      right: "2vw",
      top: "0vh"
    }
  }
}`,...f.parameters?.docs?.source}}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    cssLegendStyles: {
      right: "0vw",
      top: "0vh"
    },
    horizontal: false
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    cssLegendStyles: {
      right: "2vw",
      bottom: "0vh"
    }
  }
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    cssLegendStyles: {
      left: "0vw",
      bottom: "0vh"
    }
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    ...defaultProps,
    cssLegendStyles: {
      backgroundColor: "red",
      borderRadius: "5px",
      padding: "5px"
    },
    horizontal: false
  }
}`,...g.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y=[`DefaultStyle`,`TopLeftPosition`,`TopRightPosition`,`VerticalPositioning`,`BottomRightPosition`,`BottomLeftPosition`,`BackgroundColor`,`LegendWithColorSelector`]}))();export{g as BackgroundColor,h as BottomLeftPosition,m as BottomRightPosition,u as DefaultStyle,v as LegendWithColorSelector,d as TopLeftPosition,f as TopRightPosition,p as VerticalPositioning,y as __namedExportsOrder,c as default};