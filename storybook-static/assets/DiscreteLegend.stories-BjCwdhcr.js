import{i as e,s as t}from"./preload-helper-DwwAbzm0.js";import{it as n}from"./iframe-BloqMQIM.js";import{c as r,n as i,r as a,t as o}from"./component-CKIfoXif.js";var s,c,l,u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,D;e((()=>{s=t(n()),i(),a(),c={title:`Legends/DiscreteColorLegend`,component:r,decorators:[e=>s.createElement(e,null)]},l={discreteData:{OS:[[],0],LSF:[[],1],USF:[[],2],MB:[[],3],TB:[[],4],TC:[[],5],TFS:[[],6],TFM:[[],7],MSH:[[],8],CAL:[[],9]},dataObjectName:`Wells / FACIES`,colorName:`Facies`,horizontal:!0,legendScaleSize:300,legendFontSize:13,tickFontSize:13,numberOfTicks:3},u={args:{...l}},d={args:{...l,cssLegendStyles:{backgroundColor:`red`}}},f={F_OFFSHORE:[[],0],F_LOWER_SHOREFACE:[[],1],F_UPPER_SHOREFACE:[[],2],F_MOUTH_BAR:[[],3],F_TIDAL_BAR:[[],4],F_TIDAL_CHANNEL:[[],5],F_TIDAL_FLAT_SANDY:[[],6],F_TIDAL_FLAT_MUDDY:[[],7],F_MARSH:[[],8],F_CALCITE:[[],9]},p={top:`0%`,left:`0%`},m={args:{discreteData:f,dataObjectName:`Wells / FACIES_NoCalcite`,colorName:`Facies`,colorTables:o,horizontal:!0,legendFontSize:13,legendScaleSize:300,cssLegendStyles:p}},h={no:[[],0],yes:[[],1]},g={args:{discreteData:h,dataObjectName:`Wells / FaultDistance_HUM`,colorName:`GasOilWater`,colorTables:o,horizontal:!0,legendFontSize:13,legendScaleSize:300,cssLegendStyles:p}},_={no:[[],0],yes:[[],1]},v={args:{discreteData:_,dataObjectName:`Wells / FAULT_PROXIMITY_FLAG`,colorName:`Time/Depth`,colorTables:o,horizontal:!0,legendFontSize:13,legendScaleSize:300,cssLegendStyles:p}},y={OFFSHORE:[[],1],LSF:[[],2],USF:[[],3],TIDAL:[[],4],ONSHORE:[[],5]},b={args:{discreteData:y,dataObjectName:`Wells / RDE`,colorName:`Accent`,colorTables:o,horizontal:!0,legendFontSize:13,legendScaleSize:300,cssLegendStyles:p}},x={F_OFFSHORE:[[],0],F_LOWER_SHOREFACE:[[],1],F_UPPER_SHOREFACE:[[],2],F_MOUTH_BAR:[[],3],F_TIDAL_BAR:[[],4],F_TIDAL_CHANNEL:[[],5],F_TIDAL_FLAT_SANDY:[[],6],F_TIDAL_FLAT_MUDDY:[[],7],F_MARSH:[[],8],F_CALCITE:[[],9],R_OFFSHORE:[[],10],R_SHOREFACE:[[],11],R_TIDAL:[[],12],R_ONSHORE:[[],13],R_USF:[[],14],R_LSF:[[],15]},S={args:{discreteData:x,dataObjectName:`Wells / RDE_ORIG`,colorName:`Stratigraphy`,colorTables:o,horizontal:!0,legendFontSize:13,legendScaleSize:300,cssLegendStyles:p}},C={Above_BCU:[[],0],ABOVE:[[],1],H12:[[],2],H11:[[],3],H10:[[],4],H9:[[],5],H8:[[],6],H7:[[],7],H6:[[],8],H5:[[],9],H4:[[],10],H3:[[],11],H2:[[],12],H1:[[],13],BELOW:[[],14]},w={args:{discreteData:C,dataObjectName:`Wells / ZONELOG`,colorName:`Stratigraphy`,colorTables:o,horizontal:!0,legendFontSize:13,legendScaleSize:300,cssLegendStyles:p}},T={0:[[],0],4:[[],4],UPPER:[[],1],MID:[[],2],LOWER:[[],3]},E={args:{discreteData:T,dataObjectName:`Wells / ZONE_MAIN`,colorName:`Stratigraphy`,colorTables:o,horizontal:!0,legendFontSize:13,legendScaleSize:300,cssLegendStyles:p}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    cssLegendStyles: {
      backgroundColor: "red"
    }
  }
}`,...d.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    discreteData: faciesNoCalciteData,
    dataObjectName: "Wells / FACIES_NoCalcite",
    colorName: "Facies",
    colorTables,
    horizontal: true,
    legendFontSize: 13,
    legendScaleSize: 300,
    cssLegendStyles
  }
}`,...m.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    discreteData: faultDistanceHumData,
    dataObjectName: "Wells / FaultDistance_HUM",
    colorName: "GasOilWater",
    colorTables,
    horizontal: true,
    legendFontSize: 13,
    legendScaleSize: 300,
    cssLegendStyles
  }
}`,...g.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    discreteData: faultProximityFlagData,
    dataObjectName: "Wells / FAULT_PROXIMITY_FLAG",
    colorName: "Time/Depth",
    colorTables,
    horizontal: true,
    legendFontSize: 13,
    legendScaleSize: 300,
    cssLegendStyles
  }
}`,...v.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    discreteData: rdeData,
    dataObjectName: "Wells / RDE",
    colorName: "Accent",
    colorTables,
    horizontal: true,
    legendFontSize: 13,
    legendScaleSize: 300,
    cssLegendStyles
  }
}`,...b.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  args: {
    discreteData: rdeOrigData,
    dataObjectName: "Wells / RDE_ORIG",
    colorName: "Stratigraphy",
    colorTables,
    horizontal: true,
    legendFontSize: 13,
    legendScaleSize: 300,
    cssLegendStyles
  }
}`,...S.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  args: {
    discreteData: zoneLogData,
    dataObjectName: "Wells / ZONELOG",
    colorName: "Stratigraphy",
    colorTables,
    horizontal: true,
    legendFontSize: 13,
    legendScaleSize: 300,
    cssLegendStyles
  }
}`,...w.parameters?.docs?.source}}},E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    discreteData: zoneMainData,
    dataObjectName: "Wells / ZONE_MAIN",
    colorName: "Stratigraphy",
    colorTables,
    horizontal: true,
    legendFontSize: 13,
    legendScaleSize: 300,
    cssLegendStyles
  }
}`,...E.parameters?.docs?.source}}},D=[`Facies`,`BackgroundColor`,`FaciesNoCalciteTemplate`,`FaultDistanceHumTemplate`,`FaultProximityFlagTemplate`,`RDETemplate`,`RDEOrigTemplate`,`ZonelogTemplate`,`ZoneMainTemplate`]}))();export{d as BackgroundColor,u as Facies,m as FaciesNoCalciteTemplate,g as FaultDistanceHumTemplate,v as FaultProximityFlagTemplate,S as RDEOrigTemplate,b as RDETemplate,E as ZoneMainTemplate,w as ZonelogTemplate,D as __namedExportsOrder,c as default};