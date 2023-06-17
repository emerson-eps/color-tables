import{M as s}from"./chunk-PCJTTTQV-3b0c17f7.js";import{j as e,a as t,F as c}from"./jsx-runtime-095bf462.js";import{u as i}from"./index-1d576ef5.js";import"./iframe-efc04ea4.js";import"../sb-preview/runtime.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";import"./doctrine-13919a5e.js";import"./_getPrototype-e5e53c34.js";import"./index-d475d2ea.js";import"./cloneDeep-edd22294.js";import"./index-d37d4223.js";import"./index-356e4a49.js";function d(r={}){const{wrapper:a}=Object.assign({},i(),r.components);return a?e(a,{...r,children:e(l,{})}):l();function l(){const o=Object.assign({h1:"h1",h3:"h3",p:"p",a:"a"},i(),r.components);return t(c,{children:[e(s,{title:"Overview"}),`
`,e(o.h1,{id:"color-legend",children:"Color Legend"}),`
`,e(o.h3,{id:""}),`
`,e(o.h3,{id:"-1"}),`
`,e(o.h3,{id:"introduction",children:"Introduction"}),`
`,e(o.p,{children:"Legends are visible representations of the mapping between colors and data values. The legend in this repo has been build using D3 and can be displayed horizontally or vertically. Currently there are three main component namely continuous, discrete and the color selector component."}),`
`,e(o.h3,{id:"continuous-legend-component",children:"Continuous Legend component"}),`
`,e(o.p,{children:"The continuous legend consists of a color ramp and a numeric scale indicating color values. The main props for this legend are value range(min and max), colortables(contains point and color) and few other optional paramater."}),`
`,e(o.h3,{id:"discrete-legend-component",children:"Discrete Legend component"}),`
`,e(o.p,{children:"The discrete legends display a discrete list of elements in the given hierarchy. The main props for this legend are data(discreteData), colortables(contains point and color) and few other optional paramater."}),`
`,e(o.h3,{id:"color-selector-component",children:"Color Selector Component"}),`
`,e(o.p,{children:"The Color Selector Component(color picker) is a component that allows the user to select the color scale from the pre-defined palette. Clicking on the legend opens the color selector and the user can choose the color scale from the list. Clicking back on the legend, closes the color selector."}),`
`,e(o.h3,{id:"color-table-format",children:"Color Table Format"}),`
`,e(o.p,{children:`The JSON file used as a supplement to component and describe color tables for visualizing purpose. The json file is array of objects and consist of fields like name(name of the color), discrete and colors(where first value in the array is point and rest 3 values are rgb values).
For example: [0.0, 255, 0, 0] , here for point 0.0, it maps red color(255, 0, 0)`}),`
`,t(o.p,{children:["Reference: (",e(o.a,{href:"https://github.com/emerson-eps/color-tables/blob/main/react-app/src/component/color-tables.json",target:"_blank",rel:"nofollow noopener noreferrer",children:"https://github.com/emerson-eps/color-tables/blob/main/react-app/src/component/color-tables.json"}),")."]}),`
`,e(o.h3,{id:"d3-color-table-format",children:"D3 Color Table Format"}),`
`,e(o.p,{children:"The legends are also build using d3 colors along with user defined color table."}),`
`,t(o.p,{children:["Reference: ",e(o.a,{href:"https://github.com/emerson-eps/color-tables/blob/main/react-app/src/component/Utils/d3ColorScale.ts",target:"_blank",rel:"nofollow noopener noreferrer",children:"https://github.com/emerson-eps/color-tables/blob/main/react-app/src/component/Utils/d3ColorScale.ts"})]}),`
`,e(o.h3,{id:"legend-common-function",children:"Legend Common Function"}),`
`,e(o.p,{children:"The legendCommonFunction file consist of all the common function used by the legends and it has function for color sampling, interpolation, color mapping and so on."})]})}}const p=()=>{throw new Error("Docs-only story")};p.parameters={docsOnly:!0};const n={title:"Overview",tags:["stories-mdx"],includeStories:["__page"]};n.parameters=n.parameters||{};n.parameters.docs={...n.parameters.docs||{},page:d};const x=["__page"];export{x as __namedExportsOrder,p as __page,n as default};
//# sourceMappingURL=Intro.stories-8ada978b.js.map
