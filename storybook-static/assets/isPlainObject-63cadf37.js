import{g as o}from"./_commonjsHelpers-de833af9.js";import{_ as n,i as b,a as s,b as g}from"./_baseForOwn-7e3d0e73.js";var i={exports:{}},u="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",T=u,l=T;function p(){}function c(){}c.resetWarningCache=p;var m=function(){function t($,I,N,A,D,f){if(f!==l){var a=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw a.name="Invariant Violation",a}}t.isRequired=t;function r(){return t}var e={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:r,element:t,elementType:t,instanceOf:r,node:t,objectOf:r,oneOf:r,oneOfType:r,shape:r,exact:r,checkPropTypes:c,resetWarningCache:p};return e.PropTypes=e,e};i.exports=m();var P=i.exports;const q=o(P);var O=n,h=b,j=s,v="[object String]";function _(t){return typeof t=="string"||!h(t)&&j(t)&&O(t)==v}var S=_;const B=o(S);var R=n,k=g,x=s,C="[object Object]",E=Function.prototype,d=Object.prototype,y=E.toString,F=d.hasOwnProperty,w=y.call(Object);function L(t){if(!x(t)||R(t)!=C)return!1;var r=k(t);if(r===null)return!0;var e=F.call(r,"constructor")&&r.constructor;return typeof e=="function"&&e instanceof e&&y.call(e)==w}var W=L;const H=o(W);export{q as P,B as a,S as b,W as c,H as i};
//# sourceMappingURL=isPlainObject-63cadf37.js.map