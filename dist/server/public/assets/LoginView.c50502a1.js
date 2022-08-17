import{d,u as k,_ as c,f as i,e as b,r as V,o as m,c as u,b as p,a as e,y as B,j as l,t as C,m as S,w as x,p as w,q as _,z as N,A as g}from"./index.ae2c4fb3.js";import{B as M}from"./BackendService.0920bf56.js";const U={class:"max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8"},j={class:"max-w-lg mx-auto"},z=e("h1",{class:"text-2xl font-bold text-center sm:text-3xl"},"Get started today",-1),E=e("p",{class:"max-w-md mx-auto mt-4 text-center text-gray-500"}," Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt dolores deleniti inventore quaerat mollitia? ",-1),L=e("p",{class:"text-lg text-center font-medium"},"Sign in to your account",-1),R={key:0,class:"font-medium text-center text-ourRed"},q=e("label",{for:"email",class:"text-sm font-medium"},"Email",-1),D={class:"relative mt-1"},T=e("span",{class:"absolute inset-y-0 inline-flex items-center right-4"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-5 h-5 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"})])],-1),A=e("label",{for:"password",class:"text-sm font-medium"},"Password",-1),G={class:"relative mt-1"},O=e("span",{class:"absolute inset-y-0 inline-flex items-center right-4"},[e("svg",{xmlns:"http://www.w3.org/2000/svg",class:"w-5 h-5 text-gray-400",fill:"none",viewBox:"0 0 24 24",stroke:"currentColor"},[e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M15 12a3 3 0 11-6 0 3 3 0 016 0z"}),e("path",{"stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"})])],-1),P={class:"text-sm text-center text-gray-500"},Y=g(" No account? "),F=g("Sign up"),K=d({__name:"LoginView",setup(H){const h=k();d({name:"LoginView",components:{NavBar:c}});let o=i(""),a=i(""),r=i("");const f=b();async function v(){const t=await M.login(o.value,a.value);t!=null&&t.data.login?(f.setUser(t.data.user),h.push({path:"/dashboard"})):r.value=t==null?void 0:t.data.message}return(t,s)=>{const y=V("router-link");return m(),u("main",null,[p(c),e("div",U,[e("div",j,[z,E,e("form",{onSubmit:s[2]||(s[2]=B(()=>{},["prevent"])),class:"p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl"},[L,l(r)?(m(),u("p",R,C(l(r)),1)):S("",!0),e("div",null,[q,e("div",D,[x(e("input",{type:"email",id:"email","onUpdate:modelValue":s[0]||(s[0]=n=>_(o)?o.value=n:o=n),class:"w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm",placeholder:"Enter email"},null,512),[[w,l(o)]]),T])]),e("div",null,[A,e("div",G,[x(e("input",{type:"password",id:"password","onUpdate:modelValue":s[1]||(s[1]=n=>_(a)?a.value=n:a=n),class:"w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm",placeholder:"Enter password"},null,512),[[w,l(a)]]),O])]),e("button",{onClick:v,type:"submit",class:"block w-full px-5 py-3 text-sm font-medium text-white bg-ourYellow rounded-lg"}," Sign in "),e("p",P,[Y,p(y,{to:"/register",class:"underline"},{default:N(()=>[F]),_:1})])],32)])])])}}});export{K as default};
