import{S,Q as z,R as G,T as y,U as Q,d as w,V as p,W as T,g as b,X as F,Y as W,Z as X,C as J,v as k,_ as q,w as C,y as K,o as L,q as ee,E as re,$ as ne,a0 as ie,a1 as te,a2 as Y,x as ae,a3 as se,a4 as fe,a5 as V,a6 as ue,a7 as B,a8 as D,a9 as le,aa as de,ab as U,ac as ce,ad as oe,ae as _e,u as ve,K as M,h as pe,af as he,ag as be,ah as ye,F as we,ai as ge}from"./runtime.CUNFE6o5.js";function I(e,r=null,s){if(typeof e!="object"||e===null||S in e)return e;const f=X(e);if(f!==z&&f!==G)return e;var u=new Map,c=J(e),h=y(0);c&&u.set("length",y(e.length));var v;return new Proxy(e,{defineProperty(t,n,i){(!("value"in i)||i.configurable===!1||i.enumerable===!1||i.writable===!1)&&Q();var a=u.get(n);return a===void 0?(a=y(i.value),u.set(n,a)):w(a,I(i.value,v)),!0},deleteProperty(t,n){var i=u.get(n);if(i===void 0)n in t&&u.set(n,y(p));else{if(c&&typeof n=="string"){var a=u.get("length"),l=Number(n);Number.isInteger(l)&&l<a.v&&w(a,l)}w(i,p),Z(h)}return!0},get(t,n,i){var o;if(n===S)return e;var a=u.get(n),l=n in t;if(a===void 0&&(!l||(o=T(t,n))!=null&&o.writable)&&(a=y(I(l?t[n]:p,v)),u.set(n,a)),a!==void 0){var d=b(a);return d===p?void 0:d}return Reflect.get(t,n,i)},getOwnPropertyDescriptor(t,n){var i=Reflect.getOwnPropertyDescriptor(t,n);if(i&&"value"in i){var a=u.get(n);a&&(i.value=b(a))}else if(i===void 0){var l=u.get(n),d=l==null?void 0:l.v;if(l!==void 0&&d!==p)return{enumerable:!0,configurable:!0,value:d,writable:!0}}return i},has(t,n){var d;if(n===S)return!0;var i=u.get(n),a=i!==void 0&&i.v!==p||Reflect.has(t,n);if(i!==void 0||F!==null&&(!a||(d=T(t,n))!=null&&d.writable)){i===void 0&&(i=y(a?I(t[n],v):p),u.set(n,i));var l=b(i);if(l===p)return!1}return a},set(t,n,i,a){var E;var l=u.get(n),d=n in t;if(c&&n==="length")for(var o=i;o<l.v;o+=1){var g=u.get(o+"");g!==void 0?w(g,p):o in t&&(g=y(p),u.set(o+"",g))}l===void 0?(!d||(E=T(t,n))!=null&&E.writable)&&(l=y(void 0),w(l,I(i,v)),u.set(n,l)):(d=l.v!==p,w(l,I(i,v)));var m=Reflect.getOwnPropertyDescriptor(t,n);if(m!=null&&m.set&&m.set.call(a,i),!d){if(c&&typeof n=="string"){var P=u.get("length"),R=Number(n);Number.isInteger(R)&&R>=P.v&&w(P,R+1)}Z(h)}return!0},ownKeys(t){b(h);var n=Reflect.ownKeys(t).filter(l=>{var d=u.get(l);return d===void 0||d.v!==p});for(var[i,a]of u)a.v!==p&&!(i in t)&&n.push(i);return n},setPrototypeOf(){W()}})}function Z(e,r=1){w(e,e.v+r)}function $(e){return e!==null&&typeof e=="object"&&S in e?e[S]:e}function xe(e,r){return Object.is($(e),$(r))}function Ie(e,r,s,f=null,u=!1){L&&ee();var c=e,h=null,v=null,t=null,n=u?re:0;k(()=>{if(t===(t=!!r()))return;let i=!1;if(L){const a=c.data===ne;t===a&&(c=ie(),te(c),Y(!1),i=!0)}t?(h?q(h):h=C(()=>s(c)),v&&K(v,()=>{v=null})):(v?q(v):f&&(v=C(()=>f(c))),h&&K(h,()=>{h=null})),i&&Y(!0)},n),L&&(c=ae)}const Pe={get(e,r){if(!e.exclude.includes(r))return b(e.version),r in e.special?e.special[r]():e.props[r]},set(e,r,s){return r in e.special||(e.special[r]=Ee({get[r](){return e.props[r]}},r,V)),e.special[r](s),B(e.version),!0},getOwnPropertyDescriptor(e,r){if(!e.exclude.includes(r)&&r in e.props)return{enumerable:!0,configurable:!0,value:e.props[r]}},deleteProperty(e,r){return e.exclude.includes(r)||(e.exclude.push(r),B(e.version)),!0},has(e,r){return e.exclude.includes(r)?!1:r in e.props},ownKeys(e){return Reflect.ownKeys(e.props).filter(r=>!e.exclude.includes(r))}};function Oe(e,r){return new Proxy({props:e,exclude:r,special:{},version:y(0)},Pe)}const Re={get(e,r){let s=e.props.length;for(;s--;){let f=e.props[s];if(D(f)&&(f=f()),typeof f=="object"&&f!==null&&r in f)return f[r]}},getOwnPropertyDescriptor(e,r){let s=e.props.length;for(;s--;){let f=e.props[s];if(D(f)&&(f=f()),typeof f=="object"&&f!==null&&r in f){const u=T(f,r);return u&&!u.configurable&&(u.configurable=!0),u}}},has(e,r){for(let s of e.props)if(D(s)&&(s=s()),s!=null&&r in s)return!0;return!1},ownKeys(e){const r=[];for(let s of e.props){D(s)&&(s=s());for(const f in s)r.includes(f)||r.push(f)}return r}};function Se(...e){return new Proxy({props:e},Re)}function H(e){for(var r=F,s=F;r!==null&&!(r.f&(le|de));)r=r.parent;try{return U(r),e()}finally{U(s)}}function Ee(e,r,s,f){var j;var u=(s&ce)!==0,c=(s&oe)!==0,h=(s&_e)!==0,v=(s&ye)!==0,t=e[r],n=(j=T(e,r))==null?void 0:j.set,i=f,a=!0,l=!1,d=()=>(l=!0,a&&(a=!1,v?i=ve(f):i=f),i);t===void 0&&f!==void 0&&(n&&c&&se(),t=d(),n&&n(t));var o;if(c)o=()=>{var _=e[r];return _===void 0?d():(a=!0,l=!1,_)};else{var g=H(()=>(u?M:pe)(()=>e[r]));g.f|=fe,o=()=>{var _=b(g);return _!==void 0&&(i=void 0),_===void 0?i:_}}if(!(s&V))return o;if(n){var m=e.$$legacy;return function(_,x){return arguments.length>0?((!c||!x||m)&&n(x?o():_),_):o()}}var P=!1,R=!1,E=we(t),O=H(()=>M(()=>{var _=o(),x=b(E),A=he;return P||_===void 0&&A.f&be?(P=!1,R=!0,x):(R=!1,E.v=_)}));return u||(O.equals=ue),function(_,x){var A=b(O);if(ge&&(P=R,o(),b(E)),arguments.length>0){const N=x?b(O):c&&h?I(_):_;return O.equals(N)||(P=!0,w(E,N),l&&i!==void 0&&(i=N),b(O)),_}return A}}export{xe as a,I as b,$ as g,Ie as i,Oe as l,Ee as p,Se as s};
