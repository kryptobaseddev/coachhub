import{o as h,q as R,O as P,aM as q,Z as N,aN as B,aO as M,aP as x}from"./runtime.CUNFE6o5.js";import{i as D,c as E,d as G,n as K,f as S}from"./render.YXdxLiCJ.js";function j(r,t,s,i,e){var f;h&&R();var n=(f=t.$$slots)==null?void 0:f[s],_=!1;n===!0&&(n=t.children,_=!0),n===void 0||n(r,_?()=>i:i)}function Y(r,t){if(t){const s=document.body;r.autofocus=!0,P(()=>{document.activeElement===s&&r.focus()})}}let O=!1;function z(){O||(O=!0,document.addEventListener("reset",r=>{Promise.resolve().then(()=>{var t;if(!r.defaultPrevented)for(const s of r.target.elements)(t=s.__on_r)==null||t.call(s)})},{capture:!0}))}function J(r){if(h){var t=!1,s=()=>{if(!t){if(t=!0,r.hasAttribute("value")){var i=r.value;g(r,"value",null),r.value=i}if(r.hasAttribute("checked")){var e=r.checked;g(r,"checked",null),r.checked=e}}};r.__on_r=s,q(s),z()}}function Q(r,t){var s=r.__attributes??(r.__attributes={});s.value===(s.value=t)||r.value===t||(r.value=t)}function V(r,t){var s=r.__attributes??(r.__attributes={});s.checked!==(s.checked=t)&&(r.checked=t)}function g(r,t,s,i){var e=r.__attributes??(r.__attributes={});h&&(e[t]=r.getAttribute(t),t==="src"||t==="srcset"||t==="href"&&r.nodeName==="LINK")||e[t]!==(e[t]=s)&&(t==="loading"&&(r[B]=s),s==null?r.removeAttribute(t):typeof s!="string"&&I(r).includes(t)?r[t]=s:r.setAttribute(t,s))}function W(r,t,s,i,e=!1,n=!1,_=!1){var f=t||{},l=r.tagName==="OPTION";for(var y in t)y in s||(s[y]=null);var $=I(r),w=r.__attributes??(r.__attributes={}),A=[];for(const a in s){let o=s[a];if(l&&a==="value"&&o==null){r.value=r.__value="",f[a]=o;continue}var b=f[a];if(o!==b){f[a]=o;var k=a[0]+a[1];if(k!=="$$")if(k==="on"){const d={},v="$$"+a;let u=a.slice(2);var T=S(u);if(D(u)&&(u=u.slice(0,-7),d.capture=!0),!T&&b){if(o!=null)continue;r.removeEventListener(u,f[v],d),f[v]=null}if(o!=null)if(T)r[`__${u}`]=o,G([u]);else{let p=function(C){f[a].call(this,C)};t?f[v]=E(u,r,p,d):A.push([a,o,()=>f[v]=E(u,r,p,d)])}}else if(a==="style"&&o!=null)r.style.cssText=o+"";else if(a==="autofocus")Y(r,!!o);else if(a==="__value"||a==="value"&&o!=null)r.value=r[a]=r.__value=o;else{var c=a;e||(c=K(c)),o==null&&!n?(w[a]=null,r.removeAttribute(a)):$.includes(c)&&(n||typeof o!="string")?r[c]=o:typeof o!="function"&&(h&&(c==="src"||c==="href"||c==="srcset")||g(r,c,o))}}}return t||P(()=>{if(r.isConnected)for(const[a,o,d]of A)f[a]===o&&d()}),f}var L=new Map;function I(r){var t=L.get(r.nodeName);if(t)return t;L.set(r.nodeName,t=[]);for(var s,i=N(r),e=Element.prototype;e!==i;){s=M(i);for(var n in s)s[n].set&&t.push(n);i=N(i)}return t}const F="data-no-translate",H={},U=()=>x(H);function m(){const r=U();function t(i,e){return typeof i!="string"||!r?i:r.translateHref(i,e)}function s(i,e){if(i[F])return i;for(const{attribute_name:n,lang_attribute_name:_}of e)if(n in i){const f=i[n],l=_?i[_]:void 0;i[n]=t(f,typeof l=="string"?l:void 0)}return i}return[t,s]}export{Q as a,j as b,V as c,z as d,W as e,m as g,J as r,g as s};
