import{M as n,N as y,o as g,D as A,O as k}from"./runtime.CUNFE6o5.js";import{d as D}from"./index.CnPSb7tb.js";import{g as m,a as O}from"./props.D6-fppJ3.js";function u(e,f,a,l=a){e.addEventListener(f,a);const r=e.__on_r;r?e.__on_r=()=>{r(),l()}:e.__on_r=l,D()}function B(e,f,a=f){var l=y();u(e,"input",()=>{var r=i(e)?b(e.value):e.value;a(r),l&&r!==(r=f())&&(e.value=r??"")}),n(()=>{var r=f();if(g&&e.defaultValue!==e.value){a(e.value);return}i(e)&&r===b(e.value)||e.type==="date"&&!r&&!e.value||r!==e.value&&(e.value=r??"")})}const d=new Set;function C(e,f,a,l,r=l){var o=a.getAttribute("type")==="checkbox",v=e;let h=!1;if(f!==null)for(var s of f)v=v[s]??(v[s]=[]);v.push(a),u(a,"change",()=>{var c=a.__value;o&&(c=t(v,c,a.checked)),r(c)},()=>r(o?[]:null)),n(()=>{var c=l();if(g&&a.defaultChecked!==a.checked){h=!0;return}o?(c=c||[],a.checked=m(c).includes(m(a.__value))):a.checked=O(a.__value,c)}),A(()=>{var c=v.indexOf(a);c!==-1&&v.splice(c,1)}),d.has(v)||(d.add(v),k(()=>{v.sort((c,_)=>c.compareDocumentPosition(_)===4?-1:1),d.delete(v)})),k(()=>{if(h){var c;if(o)c=t(v,c,a.checked);else{var _=v.find(w=>w.checked);c=_==null?void 0:_.__value}r(c)}})}function E(e,f,a=f){u(e,"change",()=>{var l=e.checked;a(l)}),f()==null&&a(!1),n(()=>{var l=f();e.checked=!!l})}function t(e,f,a){for(var l=new Set,r=0;r<e.length;r+=1)e[r].checked&&l.add(e[r].__value);return a||l.delete(f),Array.from(l)}function i(e){var f=e.type;return f==="number"||f==="range"}function b(e){return e===""?null:+e}export{E as a,B as b,C as c,u as l};
