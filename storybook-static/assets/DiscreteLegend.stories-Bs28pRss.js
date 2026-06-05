import{R as g}from"./iframe-D2y6vVni.js";import{c as e,D as F}from"./index-BGhICA7P.js";import"./preload-helper-DOST-yEC.js";import"./index-X12Up7a1.js";import"./index-B1r1lEzJ.js";const C={title:"Legends/DiscreteColorLegend",component:F,decorators:[S=>g.createElement(S,null)]},D={OS:[[],0],LSF:[[],1],USF:[[],2],MB:[[],3],TB:[[],4],TC:[[],5],TFS:[[],6],TFM:[[],7],MSH:[[],8],CAL:[[],9]},m={discreteData:D,dataObjectName:"Wells / FACIES",colorName:"Facies",horizontal:!0,legendScaleSize:300,legendFontSize:13,tickFontSize:13,numberOfTicks:3},t={args:{...m}},r={args:{...m,cssLegendStyles:{backgroundColor:"red"}}},p={F_OFFSHORE:[[],0],F_LOWER_SHOREFACE:[[],1],F_UPPER_SHOREFACE:[[],2],F_MOUTH_BAR:[[],3],F_TIDAL_BAR:[[],4],F_TIDAL_CHANNEL:[[],5],F_TIDAL_FLAT_SANDY:[[],6],F_TIDAL_FLAT_MUDDY:[[],7],F_MARSH:[[],8],F_CALCITE:[[],9]},a={top:"0%",left:"0%"},o={args:{discreteData:p,dataObjectName:"Wells / FACIES_NoCalcite",colorName:"Facies",colorTables:e,horizontal:!0,legendFontSize:13,legendScaleSize:300,cssLegendStyles:a}},u={no:[[],0],yes:[[],1]},n={args:{discreteData:u,dataObjectName:"Wells / FaultDistance_HUM",colorName:"GasOilWater",colorTables:e,horizontal:!0,legendFontSize:13,legendScaleSize:300,cssLegendStyles:a}},_={no:[[],0],yes:[[],1]},s={args:{discreteData:_,dataObjectName:"Wells / FAULT_PROXIMITY_FLAG",colorName:"Time/Depth",colorTables:e,horizontal:!0,legendFontSize:13,legendScaleSize:300,cssLegendStyles:a}},O={OFFSHORE:[[],1],LSF:[[],2],USF:[[],3],TIDAL:[[],4],ONSHORE:[[],5]},c={args:{discreteData:O,dataObjectName:"Wells / RDE",colorName:"Accent",colorTables:e,horizontal:!0,legendFontSize:13,legendScaleSize:300,cssLegendStyles:a}},T={F_OFFSHORE:[[],0],F_LOWER_SHOREFACE:[[],1],F_UPPER_SHOREFACE:[[],2],F_MOUTH_BAR:[[],3],F_TIDAL_BAR:[[],4],F_TIDAL_CHANNEL:[[],5],F_TIDAL_FLAT_SANDY:[[],6],F_TIDAL_FLAT_MUDDY:[[],7],F_MARSH:[[],8],F_CALCITE:[[],9],R_OFFSHORE:[[],10],R_SHOREFACE:[[],11],R_TIDAL:[[],12],R_ONSHORE:[[],13],R_USF:[[],14],R_LSF:[[],15]},l={args:{discreteData:T,dataObjectName:"Wells / RDE_ORIG",colorName:"Stratigraphy",colorTables:e,horizontal:!0,legendFontSize:13,legendScaleSize:300,cssLegendStyles:a}},A={Above_BCU:[[],0],ABOVE:[[],1],H12:[[],2],H11:[[],3],H10:[[],4],H9:[[],5],H8:[[],6],H7:[[],7],H6:[[],8],H5:[[],9],H4:[[],10],H3:[[],11],H2:[[],12],H1:[[],13],BELOW:[[],14]},i={args:{discreteData:A,dataObjectName:"Wells / ZONELOG",colorName:"Stratigraphy",colorTables:e,horizontal:!0,legendFontSize:13,legendScaleSize:300,cssLegendStyles:a}},z={0:[[],0],4:[[],4],UPPER:[[],1],MID:[[],2],LOWER:[[],3]},d={args:{discreteData:z,dataObjectName:"Wells / ZONE_MAIN",colorName:"Stratigraphy",colorTables:e,horizontal:!0,legendFontSize:13,legendScaleSize:300,cssLegendStyles:a}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS
  }
}`,...t.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    ...DEFAULT_ARGS,
    cssLegendStyles: {
      backgroundColor: "red"
    }
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
}`,...s.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
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
}`,...c.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...l.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
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
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
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
}`,...d.parameters?.docs?.source}}};const b=["Facies","BackgroundColor","FaciesNoCalciteTemplate","FaultDistanceHumTemplate","FaultProximityFlagTemplate","RDETemplate","RDEOrigTemplate","ZonelogTemplate","ZoneMainTemplate"];export{r as BackgroundColor,t as Facies,o as FaciesNoCalciteTemplate,n as FaultDistanceHumTemplate,s as FaultProximityFlagTemplate,l as RDEOrigTemplate,c as RDETemplate,d as ZoneMainTemplate,i as ZonelogTemplate,b as __namedExportsOrder,C as default};
