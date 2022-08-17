import{d as y,e as $,o as r,c as d,a as t,t as s,A as x,j as l,m as c,F as M}from"./index.5034234a.js";const C={key:0},N={class:"flex items-center space-x-3"},A=t("div",{class:"avatar"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-10 w-10",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"})])],-1),B={class:"font-bold"},D=t("div",{class:"text-sm opacity-50"},"Customer",-1),z=t("br",null,null,-1),V=t("span",{class:"badge badge-ghost badge-sm"},"Appointment",-1),Y={key:0},q={key:1},F={key:1},R={class:"flex items-center space-x-3"},S=t("div",{class:"avatar"},[t("svg",{xmlns:"http://www.w3.org/2000/svg",class:"h-10 w-10",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor","stroke-width":"2"},[t("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"})])],-1),T={class:"font-bold"},U=t("div",{class:"text-sm opacity-50"},"Mighty Mobile",-1),E=t("br",null,null,-1),J=t("span",{class:"badge badge-ghost badge-sm"},"Job Request",-1),G={name:"Request",components:{}},I=y({...G,props:{job:null,appointment:null,index:null},setup(u){const e=u,n=$();return(i,a)=>{var p,m,b,h,v,g,_,k,w,j;return r(),d(M,null,[e.appointment?(r(),d("tr",C,[t("th",null,s(e.index),1),t("td",null,[t("div",N,[A,t("div",null,[t("div",B,s((p=e.appointment.customer)==null?void 0:p.firstName)+" "+s((m=e.appointment.customer)==null?void 0:m.lastName),1),D])])]),t("td",null,[x(" Assessment of "+s((b=e.appointment.vehicle)==null?void 0:b.year)+" "+s((h=e.appointment.vehicle)==null?void 0:h.make)+" "+s((v=e.appointment.vehicle)==null?void 0:v.model)+" ",1),z,V]),t("td",null,s(i.$parseDate(e.appointment.suggestedDate)),1),l(n).isAdmin||l(n).isManager||l(n).isMechanic?(r(),d("th",Y,[t("button",{onClick:a[0]||(a[0]=f=>{var o;return i.$router.push({path:`/dashboard/appointment/${(o=u.appointment)==null?void 0:o.id}`})}),class:"btn btn-ghost bg-ourYellow btn-xs"},"Details")])):c("",!0),l(n).isAdmin||l(n).isManager||l(n).isMechanic?(r(),d("th",q,[t("button",{class:"btn btn-ghost bg-ourYellow btn-xs",onClick:a[1]||(a[1]=f=>{var o;return i.$router.push(`/dashboard/createjob/${(o=u.appointment)==null?void 0:o.id}`)})},"create job")])):c("",!0)])):c("",!0),e.job?(r(),d("tr",F,[t("td",null,[t("div",R,[S,t("div",null,[t("div",T,s((g=e.job.createdBy)==null?void 0:g.firstName)+" "+s((_=e.job.createdBy)==null?void 0:_.lastName),1),U])])]),t("td",null,[x(s(e.job.serviceType)+" of "+s((k=e.job.vehicle)==null?void 0:k.year)+" "+s((w=e.job.vehicle)==null?void 0:w.make)+" "+s((j=e.job.vehicle)==null?void 0:j.model)+" ",1),E,J]),t("td",null,s(i.$parseDate(e.job.startDate)),1),t("th",null,[t("button",{class:"btn btn-ghost bg-ourYellow btn-xs",onClick:a[2]||(a[2]=f=>{var o;return i.$router.push(`/dashboard/viewjob/${(o=e.job)==null?void 0:o.jobNumber}`)})},"Details")])])):c("",!0)],64)}}});export{I as _};
