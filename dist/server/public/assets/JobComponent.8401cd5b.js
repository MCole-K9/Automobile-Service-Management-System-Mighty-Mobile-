import{d as u,o as t,c,a as o,t as s,A as n,m as f}from"./index.09770567.js";const j={class:"card flex-none bg-ourYellow shadow-xl w-full relative rounded"},v={class:"card-body p-5"},x={class:"card-title"},y={class:"flex justify-between"},w=o("span",{class:"text-md font-semibold"},"Service Type: ",-1),g={class:"flex justify-between"},k=o("span",{class:"text-md font-semibold"},"Customer: ",-1),N={class:"flex justify-between"},C=o("span",{class:"text-md font-semibold"},"Vehicle: ",-1),V={class:"card-actions justify-center mt-3"},B={key:0,class:"badge absolute top-4 right-4 px-4 bg-ourRed"},T={key:1,class:"badge absolute top-4 right-4 text-black px-4 bg-success"},$={name:"JobComponent"},A=u({...$,props:{job:null},setup(_){const e=_;return(h,a)=>{var l,d,i,r,b,m,p;return t(),c("div",j,[o("div",v,[o("h2",x,"Job #: "+s(e.job.jobNumber),1),o("p",y,[w,n(" "+s(e.job.serviceType),1)]),o("p",g,[k,n(" "+s((d=(l=e.job.vehicle)==null?void 0:l.owner)==null?void 0:d.firstName)+" "+s((r=(i=e.job.vehicle)==null?void 0:i.owner)==null?void 0:r.lastName),1)]),o("p",N,[C,n(s((b=e.job.vehicle)==null?void 0:b.year)+" "+s((m=e.job.vehicle)==null?void 0:m.make)+" "+s((p=e.job.vehicle)==null?void 0:p.model),1)]),o("div",V,[o("button",{class:"btn btn-sm",onClick:a[0]||(a[0]=J=>h.$router.push(`/dashboard/viewjob/${e.job.jobNumber}`))},"View")])]),e.job.completed?e.job.completed?(t(),c("span",T,"completed")):f("",!0):(t(),c("span",B,s(e.job.confirmed?"Confirmed":"Pending"),1))])}}});export{A as _};
