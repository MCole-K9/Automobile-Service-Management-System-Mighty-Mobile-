import{B as i}from"./BackendService.8198c897.js";import{_ as d}from"./DashboardLayout.b9604c9d.js";import{_ as m}from"./JobComponent.8401cd5b.js";import{_}from"./plugin-vue_export-helper.21dcd24c.js";import{d as l,r as s,o as t,c as n,b as u,z as f,a as r,F as b,k as h,B as g,G as y,H as v}from"./index.09770567.js";const x=l({components:{DashboardLayout:d,JobComponent:m},props:{},data(){return{upcomingJobs:[]}},async mounted(){const o=await i.getAllJobs();this.upcomingJobs=o==null?void 0:o.data,console.log(o==null?void 0:o.data),this.upcomingJobs=this.upcomingJobs.filter(e=>e.completed==!0)},methods:{}}),k=o=>(y("data-v-6b97f470"),o=o(),v(),o),J=k(()=>r("p",{class:"text-4xl font-bold text-center my-5"},"Work history",-1)),B={class:"flex flex-col justify-start md:grid md:grid-cols-3 gap-5 overflow-y-auto"};function w(o,e,C,$,I,L){const c=s("JobComponent"),p=s("DashboardLayout");return t(),n("span",null,[u(p,null,{content:f(()=>[J,r("div",B,[(t(!0),n(b,null,h(o.upcomingJobs,a=>(t(),g(c,{completed:!0,job:a,key:a.jobNumber},null,8,["job"]))),128))])]),_:1})])}var W=_(x,[["render",w],["__scopeId","data-v-6b97f470"]]);export{W as default};
