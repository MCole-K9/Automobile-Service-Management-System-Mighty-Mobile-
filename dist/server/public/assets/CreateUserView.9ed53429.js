import{d as v,u as w,f as b,o as h,B as x,z as n,b as l,a as s,w as U,p as N}from"./index.8442f19d.js";import{_ as g}from"./DashboardLayout.8c5994ed.js";import{r as R,_ as r}from"./SelectRoles.adcf47bc.js";import{B as t}from"./BackendService.cf86a9fe.js";import{_ as c}from"./User.b1dd3df2.js";const k=s("label",{for:""},"Roles:",-1),y={class:"flex flex-col space-y-3"},B=s("label",{for:""},"Password:",-1),C={name:"UserProfileView",components:{SelectRoles:r,UserComponent:c}},D=v({...C,setup(S){const u=w(),i=R(),a=b({id:0,firstName:"",lastName:"",email:"",phoneNumber:"",password:"",roles:[]});async function d(){const e=await t.createUser(a.value);(e==null?void 0:e.status)&&(e==null?void 0:e.status)<300&&u.push({name:"manageusers"})}function m(){a.value.roles=i.roles,console.log(a.value)}async function p(){const e=await t.getRandomPassword(8);a.value.password=e==null?void 0:e.data}async function f(){const e=await t.getRandUser();console.log(e==null?void 0:e.data),a.value.firstName=e==null?void 0:e.data.results[0].name.first,a.value.lastName=e==null?void 0:e.data.results[0].name.last,a.value.email=e==null?void 0:e.data.results[0].email,a.value.phoneNumber=e==null?void 0:e.data.results[0].phone,a.value.password=e==null?void 0:e.data.results[0].login.password}return(e,o)=>(h(),x(g,null,{content:n(()=>[l(c,{User:a.value},{Extra:n(()=>[s("div",null,[k,l(r,{onSelected:m})]),s("div",y,[s("div",null,[B,U(s("input",{"onUpdate:modelValue":o[0]||(o[0]=_=>a.value.password=_),class:"input input-bordered w-full",type:"text",name:"",id:""},null,512),[[N,a.value.password]])]),s("button",{onClick:p,class:"btn"},"Generate"),s("button",{onClick:f,class:"btn"},"Random User")]),s("div",{class:"flex justify-center col-span-2"},[s("button",{onClick:d,class:"btn w-1/2"},"Save")])]),_:1},8,["User"])]),_:1}))}});export{D as default};
