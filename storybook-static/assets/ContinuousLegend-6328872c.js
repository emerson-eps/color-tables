import{j as ne}from"./jsx-runtime-ad672792.js";import{r as re}from"./index-f1f749bf.js";import{s as J,m as K,f as ae,e as Q,R as O,h as W,n as ie,o as se,b as ye}from"./legendCommonFunction-c6665de3.js";function ge(e,t,m){e=+e,t=+t,m=(r=arguments.length)<2?(t=e,e=0,1):r<3?1:+m;for(var c=-1,r=Math.max(0,Math.ceil((t-e)/m))|0,s=new Array(r);++c<r;)s[c]=e+c*m;return s}function he(e){return e}var Z=1,G=2,D=3,C=4,oe=1e-6;function xe(e){return"translate("+e+",0)"}function be(e){return"translate(0,"+e+")"}function ke(e){return t=>+e(t)}function we(e,t){return t=Math.max(0,e.bandwidth()-t*2)/2,e.round()&&(t=Math.round(t)),m=>+e(m)+t}function Ve(){return!this.__axis}function ue(e,t){var m=[],c=null,r=null,s=6,p=6,g=3,f=typeof window<"u"&&window.devicePixelRatio>1?0:.5,d=e===Z||e===C?-1:1,h=e===C||e===G?"x":"y",x=e===Z||e===D?xe:be;function i(n){var j=c??(t.ticks?t.ticks.apply(t,m):t.domain()),E=r??(t.tickFormat?t.tickFormat.apply(t,m):he),_=Math.max(s,0)+g,F=t.range(),l=+F[0]+f,I=+F[F.length-1]+f,N=(t.bandwidth?we:ke)(t.copy(),f),b=n.selection?n.selection():n,q=b.selectAll(".domain").data([null]),y=b.selectAll(".tick").data(j,t).order(),L=y.exit(),w=y.enter().append("g").attr("class","tick"),A=y.select("line"),v=y.select("text");q=q.merge(q.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),y=y.merge(w),A=A.merge(w.append("line").attr("stroke","currentColor").attr(h+"2",d*s)),v=v.merge(w.append("text").attr("fill","currentColor").attr(h,d*_).attr("dy",e===Z?"0em":e===D?"0.71em":"0.32em")),n!==b&&(q=q.transition(n),y=y.transition(n),A=A.transition(n),v=v.transition(n),L=L.transition(n).attr("opacity",oe).attr("transform",function(o){return isFinite(o=N(o))?x(o+f):this.getAttribute("transform")}),w.attr("opacity",oe).attr("transform",function(o){var V=this.parentNode.__axis;return x((V&&isFinite(V=V(o))?V:N(o))+f)})),L.remove(),q.attr("d",e===C||e===G?p?"M"+d*p+","+l+"H"+f+"V"+I+"H"+d*p:"M"+f+","+l+"V"+I:p?"M"+l+","+d*p+"V"+f+"H"+I+"V"+d*p:"M"+l+","+f+"H"+I),y.attr("opacity",1).attr("transform",function(o){return x(N(o)+f)}),A.attr(h+"2",d*s),v.attr(h,d*_).text(E),b.filter(Ve).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",e===G?"start":e===C?"end":"middle"),b.each(function(){this.__axis=N})}return i.scale=function(n){return arguments.length?(t=n,i):t},i.ticks=function(){return m=Array.from(arguments),i},i.tickArguments=function(n){return arguments.length?(m=n==null?[]:Array.from(n),i):m.slice()},i.tickValues=function(n){return arguments.length?(c=n==null?null:Array.from(n),i):c&&c.slice()},i.tickFormat=function(n){return arguments.length?(r=n,i):r},i.tickSize=function(n){return arguments.length?(s=p=+n,i):s},i.tickSizeInner=function(n){return arguments.length?(s=+n,i):s},i.tickSizeOuter=function(n){return arguments.length?(p=+n,i):p},i.tickPadding=function(n){return arguments.length?(g=+n,i):g},i.offset=function(n){return arguments.length?(f=+n,i):f},i}function qe(e){return ue(G,e)}function Ae(e){return ue(D,e)}const le=({min:e,max:t,dataObjectName:m,colorName:c="Rainbow",horizontal:r,getColorScaleData:s,id:p,colorTables:g=ye,colorMapFunction:f,reverseRange:d=!1,breakPoint:h,editedBreakPointValues:x,isLog:i,isNearest:n,isRangeShown:j=!1,legendFontSize:E=18,tickFontSize:_=12,numberOfTicks:F=3,legendScaleSize:l=200,cssLegendStyles:I={left:"0vw",top:"0vh"}})=>{const N=Math.ceil(Math.random()*9999).toString(),b=re.useRef(null);return re.useEffect(()=>{b.current&&(J(b.current).select("div").remove(),J(b.current).select("svg").remove(),q());async function q(){var A,v;let y=[],L;try{typeof g=="string"&&(L=await(await fetch(g)).json());let o=typeof g=="string"?K(c,L):K(c,g),V=[];s&&Object.keys(s).length>0&&(s.color?o=s.color:s.arrayData&&(o=s.arrayData));const P=ae.find(a=>(a==null?void 0:a.name)===c);if(P&&P.discrete===!1){const a=[],u=K(c,ae);ge(10).map(M=>({color:u(M/10)})).forEach((M,k)=>{var S,ee,te;a.push(["0."+k,(S=Q(M.color))==null?void 0:S.rgb().r,(ee=Q(M.color))==null?void 0:ee.rgb().g,(te=Q(M.color))==null?void 0:te.rgb().b])}),o=a}const U=(A=typeof g=="string"?L:g)==null?void 0:A.find(a=>s?a.name===(s==null?void 0:s.name):a.name===c),ce=o.length-1;if(n){const u=1/o.length;let R=0,M=0+u;o.forEach(k=>{V.push({breakPoint:Number(R.toFixed(2)),color:O([k[0],k[1],k[2],k[3]]).color},{breakPoint:Number(M.toFixed(2)),color:O([k[0],k[1],k[2],k[3]]).color}),R+=u,M+=u})}if(f){let a=[];for(var w=0;w<=1;w+=.05){const u=f(w);a.push([w.toFixed(2),u[0],u[1],u[2]])}o=a}const $=h==null?void 0:h.map(a=>Number(a)),B=$||[];if(o.forEach((a,u)=>{let R;B[u]?R=B[u]:R=a[0],y.push({breakPoint:(U==null?void 0:U.discrete)===!0?O(a,ce).offset:(h==null?void 0:h.length)>0?R*100:a[0]*100,color:O(a).color})}),o.length===0)return[0,0,0];((v=x==null?void 0:x.colorArray)==null?void 0:v.length)>0&&(x==null?void 0:x.customizeFlag)===!0&&(y=x.colorArray.map(function(u){return{breakPoint:u.position*100,color:u.color}})),y.sort((a,u)=>a.breakPoint-u.breakPoint);const T=J(b.current).style("margin-right","2px").style("margin-left","2px").append("svg").style("cursor",s?"pointer":"auto").style("background-color","#ffffffcc").style("border-radius","5px"),fe=T.append("defs");T.attr("width",r?l<200?200:l:"100").attr("height",r?"70":l<200?200:l-17);const z="linear-gradient-"+p+"0";let X=fe.append("linearGradient").attr("id",z);r&&!d||!r&&d?X.attr("x1","0%").attr("x2",r?"100%":"0%").attr("y1","0%").attr("y2",r?"0%":"100%"):(!r&&!d||r&&d)&&X.attr("x1",r?"100%":"0%").attr("x2","0%").attr("y1",r?"0%":"100%").attr("y2","0%");const de=W().domain([0,1]).range([0,400]);X.selectAll("stop").data(V.length>0?V:y).enter().append("stop").attr("offset",function(a){return V.length>0?de(a.breakPoint)/4+"%":a.breakPoint+"%"}).attr("stop-color",function(a){return a.color}),T.append("rect").attr("x",25).attr("y",r?30:18).attr("width",r?l<200?159:l-40:20).attr("height",r?20:l<200?159:l-40).style("fill","url(#"+z+")"),T.append("text").attr("x",r?25:-168).attr("y",r?20:15).style("text-anchor","left").style("transform",r?"none":"left").style("transform",r?"none":"rotate(270deg)").style("fill","grey").style("font-size",E&&E>0?`${E}px`:"16px").text(m);let H=(i?ie():W()).domain(d?[t,e]:[e,t]).range([10,l<200?168:l-32]),Y=(i?ie():W()).domain(d?[e,t]:[t,e]).range([10,l<200?168:l-32]);const me=Ae(H).tickValues(H.ticks(0).concat(H.domain(),se(H.domain(),F))),pe=qe(Y).tickValues(Y.ticks(0).concat(Y.domain(),se(H.domain(),F)));j&&T.attr("class","axis").append("g").attr("transform",r?"translate(16, 50)":"translate(45, 7.5)").style("font-size",_&&_>0?`${_}px`:"12px").style("font-weight","700").call(r?me:pe).style("height",15)}catch(o){console.error(o)}}},[e,t,c,g,r,s,f,m,p,d,i,n,j,E,_,F,l]),ne("div",{style:{position:"absolute",minHeight:"70px",zIndex:999,margin:"10px",...I},children:ne("div",{id:p||`cont-legend - ${N}`,ref:b})})};try{le.displayName="ContinuousLegend",le.__docgenInfo={description:"",displayName:"ContinuousLegend",props:{min:{defaultValue:null,description:"Min value",name:"min",required:!1,type:{name:"number"}},max:{defaultValue:null,description:"Max value",name:"max",required:!1,type:{name:"number"}},dataObjectName:{defaultValue:null,description:"Title for the legend",name:"dataObjectName",required:!1,type:{name:"string"}},colorName:{defaultValue:{value:"Rainbow"},description:"Name of the color(ex: Rainbow)",name:"colorName",required:!1,type:{name:"string"}},horizontal:{defaultValue:null,description:"Orientation for legend",name:"horizontal",required:!1,type:{name:"boolean"}},getColorScaleData:{defaultValue:null,description:`Used while using color selector component

Returns the object with name and array of colors`,name:"getColorScaleData",required:!1,type:{name:"any"}},id:{defaultValue:null,description:"ID",name:"id",required:!1,type:{name:"string"}},colorTables:{defaultValue:{value:"defaultColorTables as colorTablesArray"},description:`Prop containing color table data

Reference: https://github.com/emerson-eps/color-tables/blob/main/react-app/src/component/color-tables.json`,name:"colorTables",required:!1,type:{name:"colorTablesArray"}},colorMapFunction:{defaultValue:null,description:`Optional function property

Takes a value in the range [0,1] and returns a color

If a colorMapFunction is used, then the colorTable file is not needed`,name:"colorMapFunction",required:!1,type:{name:"any"}},reverseRange:{defaultValue:{value:"false"},description:"Reverse the range(min and max)",name:"reverseRange",required:!1,type:{name:"boolean"}},isAuto:{defaultValue:null,description:"",name:"isAuto",required:!1,type:{name:"boolean"}},breakPoint:{defaultValue:null,description:"",name:"breakPoint",required:!1,type:{name:"any"}},editedBreakPointValues:{defaultValue:null,description:"",name:"editedBreakPointValues",required:!1,type:{name:"any"}},isLog:{defaultValue:null,description:"",name:"isLog",required:!1,type:{name:"boolean"}},isNearest:{defaultValue:null,description:"",name:"isNearest",required:!1,type:{name:"boolean"}},isRangeShown:{defaultValue:{value:"false"},description:"Should the range be shown or not",name:"isRangeShown",required:!1,type:{name:"boolean"}},legendFontSize:{defaultValue:{value:"18"},description:"Font size of legend name (in px)",name:"legendFontSize",required:!1,type:{name:"number"}},tickFontSize:{defaultValue:{value:"12"},description:"Font size of legend ticks (in px)",name:"tickFontSize",required:!1,type:{name:"number"}},numberOfTicks:{defaultValue:{value:"3"},description:`Number of ticks in the main legend (only shown when isRangeShown prop is true)
This refers to the number between min and max range points`,name:"numberOfTicks",required:!1,type:{name:"number"}},legendScaleSize:{defaultValue:{value:"200"},description:"This prop controls the number of ticks shown on the scale of the color legend (in px)",name:"legendScaleSize",required:!1,type:{name:"number"}},cssLegendStyles:{defaultValue:{value:'{ left: "0vw", top: "0vh" }'},description:"apply css styles",name:"cssLegendStyles",required:!1,type:{name:"any"}}}}}catch{}export{le as C,ge as r};
//# sourceMappingURL=ContinuousLegend-6328872c.js.map
