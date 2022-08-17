import{_ as u}from"./DashboardLayout.b9604c9d.js";import{B as h}from"./BackendService.8198c897.js";import{d as p,f as b,i as m,r as f,o as e,B as x,z as r,a as t,b as v,c as n,k as d,t as l,F as i,A as k}from"./index.09770567.js";const w={class:"flex justify-between p-4"},g=t("p",{class:"text-xl lg:text-4xl font-bold"},"Manage Users",-1),B=k(" Add User "),C=t("svg",{class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 6v6m0 0v6m0-6h6m-6 0H6"})],-1),y={class:"overflow-x-auto w-full"},M={class:"table w-full"},N=t("thead",null,[t("tr",null,[t("th",null,[t("label",null,[t("input",{type:"checkbox",class:"checkbox"})])]),t("th",null,"Name"),t("th",null,"Roles"),t("th",null,"Action")])],-1),A=t("th",null,[t("label",null,[t("input",{type:"checkbox",class:"checkbox"})])],-1),U={class:"flex items-center space-x-3"},V=t("div",{class:"avatar"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-10 w-10",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"})])],-1),$={class:"font-bold"},j={class:""},z={class:"flex space-x-2"},D={class:"badge badge-ghost badge-sm"},E=["onClick"],F=t("button",{class:"btn btn-ghost btn-xs"},"Delete",-1),S={name:"ManageUserView",components:{}},G=p({...S,setup(H){const a=b([]);return m(async()=>{const s=await h.getUsers();a.value=s==null?void 0:s.data}),(s,L)=>{const _=f("router-link");return e(),x(u,null,{content:r(()=>[t("div",w,[g,v(_,{to:"/dashboard/adduser",class:"btn"},{default:r(()=>[B,C]),_:1})]),t("div",y,[t("table",M,[N,t("tbody",null,[(e(!0),n(i,null,d(a.value,o=>(e(),n("tr",null,[A,t("td",null,[t("div",U,[V,t("div",null,[t("div",$,l(o.firstName)+" "+l(o.lastName),1)])])]),t("td",j,[t("div",z,[(e(!0),n(i,null,d(o.roles,c=>(e(),n("span",D,l(c.role),1))),256))])]),t("th",null,[t("button",{class:"btn btn-ghost btn-xs",onClick:c=>s.$router.push(`/dashboard/manageusers/edit/${o.id}`)},"Edit",8,E),F])]))),256))])])])]),_:1})}}});export{G as default};
