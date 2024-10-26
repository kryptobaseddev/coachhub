import{a as u,t as _}from"./disclose-version.CJFPsRL-.js";import{C as L,p as $,l as A,b as M,t as k,a as S,c as B,r as C,d as T,j as b,g as F,m as D,h as N,f as O,s as I}from"./runtime.CUNFE6o5.js";import{e as Q,s as P}from"./render.YXdxLiCJ.js";import{g as R,b as U,e as E,s as V,r as W}from"./index.CnPSb7tb.js";import{i as G}from"./lifecycle.CDJD4jvc.js";import{l as w,p as r,i as j}from"./props.D6-fppJ3.js";import{b as X}from"./input.BTYOOzm3.js";function Y(o,e){var i;var t=(i=o.$$events)==null?void 0:i[e.type],d=L(t)?t.slice():t==null?[]:[t];for(var l of d)l.call(this,e)}var Z=_("<button><!></button>");function ue(o,e){const t=w(e,["children","$$slots","$$events","$$legacy"]),d=w(t,["variant","size","type","disabled"]);$(e,!1);const l=D();let i=r(e,"variant",8,"primary"),f=r(e,"size",8,"md"),z=r(e,"type",8,"button"),p=r(e,"disabled",8,!1);const n={primary:"bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",secondary:"bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500",ghost:"bg-transparent text-gray-600 hover:bg-gray-100",danger:"bg-red-600 text-white hover:bg-red-700 focus:ring-red-500"},g={sm:"px-2 py-1 text-sm",md:"px-4 py-2",lg:"px-6 py-3 text-lg"},v=R(),[q,m]=v;A(()=>(b(i()),b(f()),b(t)),()=>{T(l,`
        ${n[i()]}
        ${g[f()]}
        rounded-md
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        inline-flex items-center justify-center
        transition-colors duration-200
        ${t.class||""}
    `)}),M(),G();var a=Z();const y=N(()=>m({type:z(),disabled:p(),class:F(l),...d},[{attribute_name:"formaction"}]));let h;var c=B(a);U(c,e,"default",{}),C(a),k(()=>h=E(a,h,{...F(y)})),Q("click",a,function(s){Y.call(this,e,s)}),u(o,a),S()}var ee=_('<span class="text-red-500">*</span>'),te=_('<label class="block text-sm font-medium text-gray-700 mb-1"> <!></label>'),ae=_('<p class="mt-1 text-sm text-red-600"> </p>'),se=_("<!> <input> <!>",1);function be(o,e){const t=w(e,["children","$$slots","$$events","$$legacy"]),d=w(t,["type","value","placeholder","label","error","required"]);$(e,!1);const l=D();let i=r(e,"type",8,"text"),f=r(e,"value",12,""),z=r(e,"placeholder",8,""),p=r(e,"label",8,""),n=r(e,"error",8,""),g=r(e,"required",8,!1),v=`input-${Math.random().toString(36).substr(2,9)}`;A(()=>(b(n()),b(t)),()=>{T(l,`
        w-full
        px-3 py-2
        border rounded-md
        focus:outline-none focus:ring-2 focus:ring-blue-500
        disabled:bg-gray-100 disabled:cursor-not-allowed
        ${n()?"border-red-500":"border-gray-300"}
        ${t.class||""}
    `)}),M(),G();var q=se(),m=O(q);j(m,p,c=>{var s=te();V(s,"for",v);var x=B(s),H=I(x);j(H,g,J=>{var K=ee();u(J,K)}),C(s),k(()=>P(x,`${p()??""} `)),u(c,s)});var a=I(m,2);W(a);let y;var h=I(a,2);j(h,n,c=>{var s=ae(),x=B(s);C(s),k(()=>P(x,n())),u(c,s)}),k(()=>y=E(a,y,{id:v,type:i(),placeholder:z(),required:g(),class:F(l),...d})),X(a,f),u(o,q),S()}export{ue as B,be as I};
