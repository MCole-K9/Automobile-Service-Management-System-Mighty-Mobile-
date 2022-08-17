import{R as h,U as l,d as p,x as _,o as m,c as b,a as e,w as c,T as i,j as o}from"./index.2f7aee93.js";const f=h("roles",{state:()=>({roles:[],userRoles:{Customer:!1,Mechanic:!1,Manager:!1,Admin:!1}}),actions:{setUserRoles(){this.roles.forEach(r=>{switch(r.id){case l.Customer:this.userRoles.Customer=!0;break;case l.Mechanic:this.userRoles.Mechanic=!0;break;case l.Manager:this.userRoles.Manager=!0;break;case l.ADMIN:this.userRoles.Admin=!0;break}})},stripRoleName(){this.roles.forEach(r=>{r.role=void 0})}}}),x={class:"sm:w-1/2"},R={class:"form-control"},k={class:"cursor-pointer label justify-start space-x-2"},M=["value"],v=e("span",{class:"label-text"},"Customer",-1),C={class:"cursor-pointer label justify-start space-x-2"},g=["value"],y=e("span",{class:"label-text"},"Mechanic",-1),U={class:"cursor-pointer label justify-start space-x-2"},A=["value"],j=e("span",{class:"label-text"},"Manager",-1),V={class:"cursor-pointer label justify-start space-x-2"},w=["value"],I=e("span",{class:"label-text"},"Admin",-1),N={name:"SelectRoles",components:{}},D=p({...N,emits:["selected"],setup(r,{emit:d}){const s=f();function n(u){let t=u.target;t.checked?s.roles.push({id:parseInt(t.value)}):s.roles=s.roles.filter(a=>a.id!=parseInt(t.value)),d("selected")}return _(()=>{s.$reset()}),(u,t)=>(m(),b("div",x,[e("div",R,[e("label",k,[c(e("input",{onChange:n,type:"checkbox","onUpdate:modelValue":t[0]||(t[0]=a=>o(s).userRoles.Customer=a),class:"checkbox",value:o(l).Customer},null,40,M),[[i,o(s).userRoles.Customer]]),v]),e("label",C,[c(e("input",{onChange:n,type:"checkbox",class:"checkbox","onUpdate:modelValue":t[1]||(t[1]=a=>o(s).userRoles.Mechanic=a),value:o(l).Mechanic},null,40,g),[[i,o(s).userRoles.Mechanic]]),y]),e("label",U,[c(e("input",{onChange:n,type:"checkbox",class:"checkbox","onUpdate:modelValue":t[2]||(t[2]=a=>o(s).userRoles.Manager=a),value:o(l).Manager},null,40,A),[[i,o(s).userRoles.Manager]]),j]),e("label",V,[c(e("input",{onChange:n,type:"checkbox",class:"checkbox","onUpdate:modelValue":t[3]||(t[3]=a=>o(s).userRoles.Admin=a),value:o(l).ADMIN},null,40,w),[[i,o(s).userRoles.Admin]]),I])])]))}});export{D as _,f as r};
