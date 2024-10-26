import{a as h,t as w}from"../chunks/disclose-version.CJFPsRL-.js";import{p as $,l as T,b as J,t as B,a as z,c as t,s as a,n as H,r as e,g as s,m as F,d as M,j as q,h as X}from"../chunks/runtime.CUNFE6o5.js";import{p as E,i as K}from"../chunks/props.D6-fppJ3.js";import{s as Y,a as Z}from"../chunks/store.BcJSs_Hw.js";import{i as ee}from"../chunks/demoMode.ClaLBl7d.js";import{s as y,e as te}from"../chunks/render.YXdxLiCJ.js";import{e as N,i as O}from"../chunks/Icon.Bvhz2f0e.js";import{i as P}from"../chunks/lifecycle.CDJD4jvc.js";import{B as se}from"../chunks/battery.CBqZfLjW.js";import{P as ae}from"../chunks/power.CL2wjaEd.js";import{D as ie}from"../chunks/droplet.lEL7--kX.js";import{c as re}from"../chunks/index-client.Cowl8BPV.js";import{c as U}from"../chunks/svelte-component.CIsdkGy0.js";import{B as ve}from"../chunks/bell.2awtJ6Ul.js";import{I as oe}from"../chunks/info.2roawCq9.js";import{C as de}from"../chunks/circle-alert.BCT1uT6i.js";import{s as ne}from"../chunks/class.Cz7S4UMx.js";import{L as le}from"../chunks/lightbulb.Dzk891xp.js";import{T as ce}from"../chunks/thermometer.DXyoWYjY.js";import{F as me}from"../chunks/fan.CT-BsUfV.js";var pe=w('<div class="flex items-center justify-between"><div class="flex items-center space-x-3"><!> <span class="capitalize"> </span></div> <span class="font-medium"> </span></div>'),fe=w('<div class="bg-white rounded-lg shadow"><div class="p-4 border-b"><h2 class="text-lg font-medium">System Status</h2></div> <div class="p-4 space-y-4"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><!> <span>Battery</span></div> <span class="font-medium"> </span></div> <!> <div class="flex items-center justify-between"><div class="flex items-center space-x-3"><!> <span>Generator</span></div> <span class="font-medium capitalize"> </span></div></div></div>');function ge(L,f){$(f,!1);const d=F(),k=F();let v=E(f,"systemStatus",8);T(()=>q(v()),()=>{M(d,v().tanks)}),T(()=>q(v()),()=>{M(k,v().power)}),J(),P();var n=fe(),g=a(t(n),2),l=t(g),i=t(l),r=t(i);se(r,{class:"text-blue-500"}),H(2),e(i);var c=a(i,2),o=t(c);e(c),e(l);var _=a(l,2);N(_,1,()=>Object.entries(s(d)),O,(x,j)=>{let b=()=>s(j)[0],C=()=>s(j)[1];var I=pe(),A=t(I),Q=t(A);ie(Q,{class:"text-blue-500"});var G=a(Q,2),V=t(G);e(G),e(A);var R=a(A,2),W=t(R);e(R),e(I),B(()=>{y(V,b()),y(W,`${C().level??""}%`)}),h(x,I)});var u=a(_,2),S=t(u),D=t(S);ae(D,{class:"text-blue-500"}),H(2),e(S);var m=a(S,2),p=t(m);e(m),e(u),e(g),e(n),B(()=>{y(o,`${s(k).inverter.batteryLevel??""}%`),y(p,s(k).generator.state)}),h(L,n),z()}var _e=w('<button class="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-colors"><div class="text-2xl mb-2"> </div> <div class="font-medium"> </div> <div class="text-sm text-gray-500"> </div></button>'),ue=w('<div class="bg-white rounded-lg shadow"><div class="p-4 border-b"><h2 class="text-lg font-medium">Quick Actions</h2></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4"></div></div>');function xe(L,f){$(f,!1);let d=E(f,"deviceStatus",8);const k=re();function v(i){k("toggleDevice",{id:i.id,type:i.type,newState:i.state==="on"?"off":"on"})}const n=[{title:"All Interior Lights",devices:d().interior.lights,icon:"💡"},{title:"Climate Control",devices:[d().climate.thermostats[0]],icon:"🌡️"},{title:"Exterior Lights",devices:d().exterior.lights,icon:"🏠"}];P();var g=ue(),l=a(t(g),2);N(l,5,()=>n,O,(i,r)=>{var c=_e(),o=t(c),_=t(o);e(o);var u=a(o,2),S=t(u);e(u);var D=a(u,2),m=t(D);B(()=>y(m,`${s(r).devices.filter(p=>p.state==="on").length??""} of ${s(r).devices.length??""} on`)),e(D),e(c),B(()=>{y(_,s(r).icon),y(S,s(r).title)}),te("click",c,()=>{s(r).devices.forEach(p=>v(p))}),h(i,c)}),e(l),e(g),h(L,g),z()}var be=w('<div class="p-4 flex items-start space-x-3"><!> <div><p class="text-sm"> </p> <p class="text-xs text-gray-500 mt-1"> </p></div></div>'),he=w('<div class="divide-y"></div>'),ye=w('<div class="p-4 text-center text-gray-500">No new notifications</div>'),we=w('<div class="bg-white rounded-lg shadow"><div class="p-4 border-b flex items-center justify-between"><h2 class="text-lg font-medium">Recent Notifications</h2> <!></div> <!></div>');function Se(L,f){$(f,!1);let d=E(f,"notifications",8);function k(i){switch(i){case"warning":return de;default:return oe}}P();var v=we(),n=t(v),g=a(t(n),2);ve(g,{class:"text-gray-400"}),e(n);var l=a(n,2);K(l,()=>d().length>0,i=>{var r=he();N(r,5,d,O,(c,o)=>{var _=be(),u=t(_),S=X(()=>`text-${(s(o).type==="warning"?"yellow":"blue")??""}-500 flex-shrink-0`);U(u,()=>k(s(o).type),(b,C)=>{C(b,{get class(){return s(S)}})});var D=a(u,2),m=t(D),p=t(m);e(m);var x=a(m,2),j=t(x);B(()=>y(j,new Date(s(o).timestamp).toLocaleString())),e(x),e(D),e(_),B(()=>y(p,s(o).message)),h(c,_)}),e(r),h(i,r)},i=>{var r=ye();h(i,r)}),e(v),h(L,v),z()}var De=w('<div class="flex items-center justify-between p-3 rounded-lg bg-gray-50"><span class="text-sm"> </span> <span> </span></div>'),ke=w('<div class="p-4"><div class="flex items-center justify-between mb-4"><div class="flex items-center space-x-3"><!> <span class="font-medium"> </span></div> <span class="text-sm text-gray-500"> </span></div> <div class="grid grid-cols-2 md:grid-cols-3 gap-4"></div></div>'),je=w('<div class="bg-white rounded-lg shadow"><div class="p-4 border-b"><h2 class="text-lg font-medium">Device Overview</h2></div> <div class="divide-y"></div></div>');function Le(L,f){$(f,!1);let d=E(f,"deviceStatus",8);const k=[{title:"Interior Lights",devices:d().interior.lights,icon:le},{title:"Climate",devices:d().climate.thermostats,icon:ce},{title:"Fans",devices:[...d().interior.fans,...d().climate.ventFans],icon:me}];P();var v=je(),n=a(t(v),2);N(n,5,()=>k,O,(g,l)=>{var i=ke(),r=t(i),c=t(r),o=t(c);U(o,()=>s(l).icon,(p,x)=>{x(p,{class:"text-blue-500"})});var _=a(o,2),u=t(_);e(_),e(c);var S=a(c,2),D=t(S);B(()=>y(D,`${s(l).devices.filter(p=>p.state==="on").length??""} active`)),e(S),e(r);var m=a(r,2);N(m,5,()=>s(l).devices,O,(p,x)=>{var j=De(),b=t(j),C=t(b);e(b);var I=a(b,2),A=t(I);e(I),e(j),B(()=>{y(C,s(x).name),ne(I,`px-2 py-1 rounded-full text-xs capitalize
                ${(s(x).state==="on"?"bg-green-100 text-green-800":"bg-gray-100 text-gray-800")??""}`),y(A,s(x).state)}),h(p,j)}),e(m),e(i),B(()=>y(u,s(l).title)),h(g,i)}),e(n),e(v),h(L,v),z()}var Be=w('<span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Demo Mode</span>'),Ce=w('<div class="space-y-6"><div class="flex justify-between items-center"><h1 class="text-2xl font-bold text-gray-900">Dashboard</h1> <!></div> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!> <div class="lg:col-span-2"><!></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2"><!></div> <div><!></div></div></div>');function We(L,f){$(f,!1);const d=Y(),k=()=>Z(ee,"$isDemoMode",d),v=F(),n=F(),g=F();let l=E(f,"data",8);T(()=>(s(v),s(n),s(g),q(l())),()=>{(b=>(M(v,b.deviceStatus),M(n,b.systemStatus),M(g,b.notifications)))(l())}),J();var i=Ce(),r=t(i),c=a(t(r),2);K(c,k,b=>{var C=Be();h(b,C)}),e(r);var o=a(r,2),_=t(o);ge(_,{get systemStatus(){return s(n)}});var u=a(_,2),S=t(u);xe(S,{get deviceStatus(){return s(v)}}),e(u),e(o);var D=a(o,2),m=t(D),p=t(m);Le(p,{get deviceStatus(){return s(v)}}),e(m);var x=a(m,2),j=t(x);Se(j,{get notifications(){return s(g)}}),e(x),e(D),e(i),h(L,i),z()}export{We as component};
