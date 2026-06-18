import{i as e}from"./preload-helper-DwwAbzm0.js";import{a as t,h as n,o as r,v as i}from"./blocks-B1DLeTkC.js";import{t as a}from"./jsx-runtime-Bj4z9X_L.js";var o=e((()=>{n()}));function s(e){let n={h1:`h1`,h3:`h3`,p:`p`,...i(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t,{title:`Overview`}),`
`,(0,l.jsx)(n.h1,{id:`color-legend`,children:`Color Legend`}),`
`,(0,l.jsx)(n.h3,{id:``}),`
`,(0,l.jsx)(n.h3,{id:`-1`}),`
`,(0,l.jsx)(n.h3,{id:`introduction`,children:`Introduction`}),`
`,(0,l.jsx)(n.p,{children:`Legends are visible representations of the mapping between colors and data values. The legend in this repo has been build using D3 and can be displayed horizontally or vertically. Currently there are three main component namely continuous, discrete and the color selector component.`}),`
`,(0,l.jsx)(n.h3,{id:`continuous-legend-component`,children:`Continuous Legend component`}),`
`,(0,l.jsx)(n.p,{children:`The continuous legend consists of a color ramp and a numeric scale indicating color values. The main props for this legend are value range(min and max), colortables(contains point and color) and few other optional parameter.`}),`
`,(0,l.jsx)(n.h3,{id:`discrete-legend-component`,children:`Discrete Legend component`}),`
`,(0,l.jsx)(n.p,{children:`The discrete legends display a discrete list of elements in the given hierarchy. The main props for this legend are data(discreteData), colortables(contains point and color) and few other optional parameter.`}),`
`,(0,l.jsx)(n.h3,{id:`color-selector-component`,children:`Color Selector Component`}),`
`,(0,l.jsx)(n.p,{children:`The Color Selector Component(color picker) is a component that allows the user to select the color scale from the pre-defined palette. Clicking on the legend opens the color selector and the user can choose the color scale from the list. Clicking back on the legend, closes the color selector.`}),`
`,(0,l.jsx)(n.h3,{id:`color-table-format`,children:`Color Table Format`}),`
`,(0,l.jsx)(n.p,{children:`The JSON file used as a supplement to component and describe color tables for visualizing purpose. The json file is array of objects and consist of fields like name(name of the color), discrete and colors(where first value in the array is point and rest 3 values are rgb values).
For example: [0.0, 255, 0, 0] , here for point 0.0, it maps red color(255, 0, 0)`}),`
`,(0,l.jsx)(n.p,{children:`Reference: (https://github.com/emerson-eps/color-tables/blob/main/react-app/src/component/color-tables.json).`}),`
`,(0,l.jsx)(n.h3,{id:`d3-color-table-format`,children:`D3 Color Table Format`}),`
`,(0,l.jsx)(n.p,{children:`The legends are also build using d3 colors along with user defined color table.`}),`
`,(0,l.jsx)(n.p,{children:`Reference: https://github.com/emerson-eps/color-tables/blob/main/react-app/src/component/Utils/d3ColorScale.ts`}),`
`,(0,l.jsx)(n.h3,{id:`legend-common-function`,children:`Legend Common Function`}),`
`,(0,l.jsx)(n.p,{children:`The legendCommonFunction file consist of all the common function used by the legends and it has function for color sampling, interpolation, color mapping and so on.`})]})}function c(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(s,{...e})}):s(e)}var l;e((()=>{l=a(),o(),r()}))();export{c as default};