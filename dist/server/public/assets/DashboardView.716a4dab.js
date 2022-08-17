import{_ as N}from"./DashboardLayout.3cc926e6.js";import{B as v}from"./BackendService.0920bf56.js";import{_ as C}from"./Request.c5f3037a.js";import{e as U,d as M,r as V,o,c as a,a as e,t as s,F as x,k as y,B as k,A as T,m as u,b as B,z as Y,j as g}from"./index.ae2c4fb3.js";import{_ as A}from"./plugin-vue_export-helper.21dcd24c.js";const $=U(),R=M({name:"UserDashboard",components:{Request:C},data(){return{UserAppointments:[],userVehicles:[],currentJobs:[]}},methods:{async getAllVehicles(){let t=await v.getUserVehicles($.User.id);console.log(t==null?void 0:t.data),this.userVehicles=t==null?void 0:t.data}},async created(){await this.getAllVehicles();let t=await v.getAppointments(),l=await v.getAllJobs(),c=l==null?void 0:l.data;this.currentJobs=c.filter(n=>{var f;return((f=n.vehicle)==null?void 0:f.ownerId)==$.User.id&&!n.completed}),this.UserAppointments=t==null?void 0:t.data,this.UserAppointments=this.UserAppointments.filter(n=>n.customerId==$.User.id&&!n.fulfilled)}}),q={class:"px-5"},I={class:"flex flex-col sm:flex-row justify-start"},H={class:"stats stats-vertical shadow min-w-fit rounded-lg bg-ourYellow"},E={class:"stat"},F=e("div",{class:"font-medium stat-title"},"Vehicle(s)",-1),S={class:"stat-value"},O=e("div",{class:"stat"},[e("div",{class:"font-medium stat-title"},"Date Joined"),e("div",{class:"stat-value"},"11/8/2022")],-1),z={class:"stat"},L=e("div",{class:"font-medium stat-title"},"Current Repairs/Maintenance",-1),G={class:"flex justify-between items-center"},K={class:"stat-value"},P=e("label",{for:"ongoingJobsModal",class:"btn modal-button btn-xs"},"view",-1),Q={class:"mt-10 sm:ml-10 sm:mt-0 w-full overflow-auto",style:{"max-height":"20rem"}},W=e("p",{class:"text-2xl text-center font-medium mb-3 sticky left-0 bg-ourYellow rounded-lg py-3"},"Outgoing Requests",-1),X={class:"table w-full"},Z=e("thead",null,[e("tr",null,[e("th"),e("th",null,"Name"),e("th",null,"For"),e("th",null,"Date")])],-1),j=e("input",{type:"checkbox",id:"ongoingJobsModal",class:"modal-toggle"},null,-1),ee={class:"modal"},te={class:"modal-box relative"},se=e("label",{for:"ongoingJobsModal",class:"btn btn-sm btn-circle absolute right-2 top-2"},"\u2715",-1),oe=e("h3",{class:"text-3xl font-bold text-center mb-5"},"Ongoing Jobs",-1),ne={class:"flex flex-col gap-y-3 overflow-y-scroll",style:{"max-height":"20rem"}};function le(t,l,c,n,f,D){const i=V("Request");return o(),a("div",q,[e("div",I,[e("div",H,[e("div",E,[F,e("div",S,s(t.userVehicles.length),1)]),O,e("div",z,[L,e("span",G,[e("div",K,s(t.currentJobs.length),1),P])])]),e("div",Q,[W,e("table",X,[Z,e("tbody",null,[(o(!0),a(x,null,y(t.UserAppointments,(r,d)=>(o(),k(i,{appointment:r,key:d},null,8,["appointment"]))),128))])])])]),j,e("div",ee,[e("div",te,[se,oe,e("span",ne,[(o(!0),a(x,null,y(t.currentJobs,(r,d)=>{var h,m,p,_,b;return o(),a("div",{class:"rounded w-1/1 bg-ourYellow p-3 h-fit",key:d},[e("p",null,s(r.serviceType)+" for "+s((h=r.vehicle)==null?void 0:h.year)+" "+s((m=r.vehicle)==null?void 0:m.make)+" "+s((p=r.vehicle)==null?void 0:p.model)+" being done by "+s((_=r.assignedMechanic)==null?void 0:_.firstName)+" "+s((b=r.assignedMechanic)==null?void 0:b.lastName),1)])}),128))])])])])}var ie=A(R,[["render",le]]);const J=U(),ae=M({name:"UserDashboard",components:{Request:C},data(){return{UserAppointments:[],test:{},currentJobsToggle:!1,upcomingJobs:[],completedJobs:[]}},async created(){let t=await v.getAppointments(),l=await v.getUpcomingJobs(),c=await v.getAllJobs();this.completedJobs=c==null?void 0:c.data,this.completedJobs=this.completedJobs.filter(n=>n.completed&&n.assignedMechanicId==J.User.id),this.upcomingJobs=l==null?void 0:l.data,this.upcomingJobs=this.upcomingJobs.filter(n=>n.assignedMechanicId==J.User.id),this.UserAppointments=t==null?void 0:t.data,this.UserAppointments=this.UserAppointments.filter(n=>n.customerId==J.User.id)}}),re={class:"px-5"},ce={class:"h-fit min-h- w-1/1 bg-ourYellow shadow rounded-lg p-2 gap-y-3 flex flex-col justify-start"},de={class:"flex flex-col font-bold text-2xl bg-white border border-slate-800 rounded"},ue={class:"flex justify-between p-3"},he=e("label",{class:""},"Current Jobs",-1),me={key:0,class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},pe=e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M16 17l-4 4m0 0l-4-4m4 4V3"},null,-1),_e=[pe],be={key:1,class:"w-6 h-6",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},fe=e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M8 7l4-4m0 0l4 4m-4-4v18"},null,-1),ge=[fe],ve={key:0,class:"w-1/1 h-64 p-2"},we={class:"font-bold text-base"},xe={class:"text-sm opacity-50"},ye={class:"badge rounded p-2 font-thin absolute top-0 right-0"},$e={key:0,class:"text-center font-medium"},Je=e("span",{class:"flex justify-between font-bold text-2xl p-3 border border-slate-800 bg-white rounded"},[e("label",{for:""},"Job History"),e("label",{for:"jobHistoryModal",class:"btn modal-button btn-sm"},"view")],-1),ke=e("input",{type:"checkbox",id:"jobHistoryModal",class:"modal-toggle"},null,-1),Ue={class:"modal ml-60"},Me={class:"modal-box relative"},Ce=e("label",{for:"jobHistoryModal",class:"btn btn-sm btn-circle absolute right-2 top-2"},"\u2715",-1),Ae=e("h3",{class:"text-lg font-bold mb-5"},"Jobs you've completed",-1),De={class:"font-bold text-base"},Ne={class:"text-sm opacity-50"},Ve={class:"badge rounded p-2 font-thin absolute top-0 right-0"},Te={key:0,class:"text-center font-medium"};function Be(t,l,c,n,f,D){return o(),a("div",re,[e("span",null,[e("div",ce,[e("span",de,[e("span",ue,[he,e("button",{class:"btn btn-sm",onClick:l[0]||(l[0]=i=>t.currentJobsToggle=!t.currentJobsToggle)},[T(s(t.currentJobsToggle?"hide":"show")+" ",1),t.currentJobsToggle?u("",!0):(o(),a("svg",me,_e)),t.currentJobsToggle?(o(),a("svg",be,ge)):u("",!0)])]),t.currentJobsToggle?(o(),a("div",ve,[(o(!0),a(x,null,y(t.upcomingJobs,(i,r)=>{var d,h,m,p,_,b,w;return o(),a("div",{class:"bg-ourYellow rounded w-1/1 h-fit flex items-start relative flex-col p-3",key:r},[e("div",we,s(i.serviceType)+" for "+s((d=i.vehicle)==null?void 0:d.make)+" "+s((h=i.vehicle)==null?void 0:h.model)+" "+s((m=i.vehicle)==null?void 0:m.year),1),e("div",xe,"Customer: "+s((_=(p=i.vehicle)==null?void 0:p.owner)==null?void 0:_.firstName)+" "+s((w=(b=i.vehicle)==null?void 0:b.owner)==null?void 0:w.lastName),1),e("span",ye,"End Date: "+s(i.endDate),1)])}),128)),t.upcomingJobs.length==0?(o(),a("p",$e,"No Current Jobs Yet")):u("",!0)])):u("",!0)]),Je])]),ke,e("div",Ue,[e("div",Me,[Ce,Ae,(o(!0),a(x,null,y(t.completedJobs,(i,r)=>{var d,h,m,p,_,b,w;return o(),a("div",{class:"bg-ourYellow rounded w-1/1 h-fit flex items-start relative flex-col p-3",key:r},[e("div",De,s(i.serviceType)+" for "+s((d=i.vehicle)==null?void 0:d.make)+" "+s((h=i.vehicle)==null?void 0:h.model)+" "+s((m=i.vehicle)==null?void 0:m.year),1),e("div",Ne,"Customer: "+s((_=(p=i.vehicle)==null?void 0:p.owner)==null?void 0:_.firstName)+" "+s((w=(b=i.vehicle)==null?void 0:b.owner)==null?void 0:w.lastName),1),e("span",Ve,"End Date: "+s(i.endDate),1)])}),128)),t.upcomingJobs.length==0?(o(),a("p",Te,"No Completed Jobs Yet")):u("",!0)])])])}var Ye=A(ae,[["render",Be]]);const Re={class:"flex flex-col sm5:flex-row justify-between m-5"},qe=e("p",{class:"text-gray-800 text-3xl sm5:text-left text-center sm:text-4xl lg:text-5xl font-bold"},"Dashboard",-1),Ie={class:"flex justify-center mt-5 sm5:mt-0 sm5:justify-end gap-x-3"},ze=M({__name:"DashboardView",setup(t){const l=U();return(c,n)=>(o(),a("main",null,[B(N,null,{content:Y(()=>[e("span",Re,[qe,e("span",Ie,[g(l).isMechanic||g(l).isManager?(o(),a("button",{key:0,class:"btn btn-sm lg:btn-md",onClick:n[0]||(n[0]=f=>c.$router.push("dashboard/jobboard"))},"view job board")):u("",!0),g(l).isCustomer?(o(),a("button",{key:1,class:"btn btn-sm lg:btn-md",onClick:n[1]||(n[1]=f=>c.$router.push("dashboard/vehicles"))},"view vehicles")):u("",!0)])]),g(l).isCustomer?(o(),k(ie,{key:0,class:"mb-5"})):u("",!0),g(l).isMechanic||g(l).isManager?(o(),k(Ye,{key:1})):u("",!0)]),_:1})]))}});export{ze as default};
