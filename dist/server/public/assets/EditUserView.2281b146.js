import{_ as h}from"./DashboardLayout.b9604c9d.js";import{_ as v}from"./User.7c983e4f.js";import{d as x,e as U,L as b,u as k,f as w,h as y,i as B,o as r,B as R,z as n,b as c,j as N,c as l,a as s}from"./index.09770567.js";import{B as i}from"./BackendService.8198c897.js";import{r as S,_ as u}from"./SelectRoles.6ef76bff.js";import"./LoadingAnimation.4769c467.js";import"./plugin-vue_export-helper.21dcd24c.js";const g=s("p",{class:"text-2xl my-3 text-center font-bold"},"Edit Profile",-1),C={key:0},E=s("label",{for:""},"Roles:",-1),j={key:1},V=s("div",{class:"flex justify-center"},[s("button",{class:"btn"},"Change Password")],-1),$={name:"EditUserView",components:{SelectRoles:u}},D=x({...$,setup(I){const d=U(),m=b(),_=k(),t=w({id:0,firstName:"",lastName:"",email:"",phoneNumber:"",password:"",roles:[]}),o=S();y(()=>o.roles.length>0);async function f(){o.stripRoleName();const e=await i.updateUser(t.value);(e==null?void 0:e.status)&&(e==null?void 0:e.status)<300&&_.push({name:"manageusers"})}function p(){t.value.roles=o.roles}return B(async()=>{const e=parseInt(m.params.id),a=await i.getOneUser(e);t.value=a==null?void 0:a.data,o.roles=t.value.roles,o.setUserRoles()}),(e,a)=>(r(),R(h,null,{content:n(()=>[g,c(v,{User:t.value},{Extra:n(()=>[N(d).isAdmin?(r(),l("div",C,[E,c(u,{onSelected:p})])):(r(),l("div",j)),V,s("div",{class:"flex justify-center col-span-2"},[s("button",{onClick:f,class:"btn w-1/2"},"Save")])]),_:1},8,["User"])]),_:1}))}});export{D as default};
