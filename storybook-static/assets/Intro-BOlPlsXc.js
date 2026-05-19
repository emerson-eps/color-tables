import{j as e}from"./index-Dm2lSUxJ.js";import{useMDXComponents as r}from"./index-DmqVK_gK.js";import{a as l}from"./index-BixEzei4.js";import"./index-DQDNmYQF.js";import"./index-BuA_lF3S.js";import"./iframe-Uxg4pnue.js";import"./index-B3ijS-tw.js";import"./index-DrFu-skq.js";function t(n){const o={h1:"h1",h3:"h3",p:"p",...r(),...n.components};return e.jsxs(e.Fragment,{children:[e.jsx(l,{title:"Overview"}),`
`,e.jsx(o.h1,{id:"color-legend",children:"Color Legend"}),`
`,e.jsx(o.h3,{id:""}),`
`,e.jsx(o.h3,{id:"-1"}),`
`,e.jsx(o.h3,{id:"introduction",children:"Introduction"}),`
`,e.jsx(o.p,{children:"Legends are visible representations of the mapping between colors and data values. The legend in this repo has been build using D3 and can be displayed horizontally or vertically. Currently there are three main component namely continuous, discrete and the color selector component."}),`
`,e.jsx(o.h3,{id:"continuous-legend-component",children:"Continuous Legend component"}),`
`,e.jsx(o.p,{children:"The continuous legend consists of a color ramp and a numeric scale indicating color values. The main props for this legend are value range(min and max), colortables(contains point and color) and few other optional paramater."}),`
`,e.jsx(o.h3,{id:"discrete-legend-component",children:"Discrete Legend component"}),`
`,e.jsx(o.p,{children:"The discrete legends display a discrete list of elements in the given hierarchy. The main props for this legend are data(discreteData), colortables(contains point and color) and few other optional paramater."}),`
`,e.jsx(o.h3,{id:"color-selector-component",children:"Color Selector Component"}),`
`,e.jsx(o.p,{children:"The Color Selector Component(color picker) is a component that allows the user to select the color scale from the pre-defined palette. Clicking on the legend opens the color selector and the user can choose the color scale from the list. Clicking back on the legend, closes the color selector."}),`
`,e.jsx(o.h3,{id:"color-table-format",children:"Color Table Format"}),`
`,e.jsx(o.p,{children:`The JSON file used as a supplement to component and describe color tables for visualizing purpose. The json file is array of objects and consist of fields like name(name of the color), discrete and colors(where first value in the array is point and rest 3 values are rgb values).
For example: [0.0, 255, 0, 0] , here for point 0.0, it maps red color(255, 0, 0)`}),`
`,e.jsx(o.p,{children:"Reference: (https://github.com/emerson-eps/color-tables/blob/main/react-app/src/component/color-tables.json)."}),`
`,e.jsx(o.h3,{id:"d3-color-table-format",children:"D3 Color Table Format"}),`
`,e.jsx(o.p,{children:"The legends are also build using d3 colors along with user defined color table."}),`
`,e.jsx(o.p,{children:"Reference: https://github.com/emerson-eps/color-tables/blob/main/react-app/src/component/Utils/d3ColorScale.ts"}),`
`,e.jsx(o.h3,{id:"legend-common-function",children:"Legend Common Function"}),`
`,e.jsx(o.p,{children:"The legendCommonFunction file consist of all the common function used by the legends and it has function for color sampling, interpolation, color mapping and so on."})]})}function u(n={}){const{wrapper:o}={...r(),...n.components};return o?e.jsx(o,{...n,children:e.jsx(t,{...n})}):t(n)}export{u as default};
