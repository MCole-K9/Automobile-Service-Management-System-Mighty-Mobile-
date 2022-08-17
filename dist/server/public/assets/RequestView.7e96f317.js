import{_ as b}from"./DashboardLayout.3cc926e6.js";import{B as m}from"./BackendService.0920bf56.js";import{_}from"./Request.c5f3037a.js";import{d as x,e as y,f as d,i as g,r as w,o,B as l,z as h,a as s,t as C,j as e,m as u,l as B,c as i,k as p,F as f,A as v}from"./index.ae2c4fb3.js";const A={class:"text-xl lg:text-4xl font-bold"},M=v("Book Appointment"),q={class:"overflow-x-auto w-full"},N={class:"table w-full"},j=s("th",null,[s("label",null,[s("input",{type:"checkbox",class:"checkbox"})])],-1),F=s("th",null,"From",-1),V=s("th",null,"For",-1),R=s("th",null,"Date",-1),S=s("th",null,null,-1),U={key:0},$={key:0,class:"text-lg font-medium text-center my-5 w-1/1 opacity-75"},z={name:"RequestView",components:{Request:_}},G=x({...z,setup(D){const t=y();let r=d([]),c=d([]);return g(async()=>{if(t.isCustomer){const n=await m.getJobRequests(t.User.id);c.value=[...n==null?void 0:n.data]}else{const n=await m.getAppointments();r.value=[...n==null?void 0:n.data]}}),(n,J)=>{const k=w("router-link");return o(),l(b,null,{content:h(()=>[s("div",{class:B(`flex my-4 items-center ${e(t).isAdmin||e(t).isMechanic||e(t).isManager?"justify-center":"justify-between"}`)},[s("p",A,C(e(t).isAdmin||e(t).isMechanic||e(t).isManager?"Appointment":"Job")+" Requests",1),e(t).isCustomer?(o(),l(k,{key:0,to:"/dashboard/appointmentbooking",class:"btn"},{default:h(()=>[M]),_:1})):u("",!0)],2),s("div",q,[s("table",N,[s("thead",null,[s("tr",null,[j,F,V,R,S,e(t).isAdmin||e(t).isMechanic||e(t).isManager?(o(),i("th",U)):u("",!0)])]),s("tbody",null,[(o(!0),i(f,null,p(e(c),a=>(o(),l(_,{job:a,key:a.jobNumber},null,8,["job"]))),128)),(o(!0),i(f,null,p(e(r),a=>(o(),l(_,{appointment:a,key:a.id},null,8,["appointment"]))),128))])]),e(c).length==0&&e(t).isCustomer||e(r).length==0&&!e(t).isCustomer?(o(),i("p",$,"No Requests Yet")):u("",!0)])]),_:1})}}});export{G as default};
